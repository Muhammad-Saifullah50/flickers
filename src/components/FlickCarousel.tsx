'use client'
import { getFlickById, getPrevAndNextFlicks } from "@/actions/flick.actions";
import ShareButton from "@/components/ShareButton";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Flick, Save, User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { getCurrentUserFromDb } from "@/actions/user.actions";


interface FlickCarouselProps {
    flick: Flick
    flickId: string
    isModal?: boolean
}

const FlickCarousel = ({ flick, flickId, isModal }: FlickCarouselProps) => {

    const [currFlick, setCurrFlick] = useState<Flick & { author: User, saves: Save[] } | null>(flick);
    const [loading, setLoading] = useState(false);
    const [flickList, setFlickList] = useState<Flick & { author: User, saves: Save[] }[] | null>(null);
    const [api, setApi] = useState<CarouselApi>();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currIndex, setCurrIndex] = useState(0);
    const [currUser, setCurrUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser = await getCurrentUserFromDb();

            setCurrUser(currentUser);
        }

        fetchUserData()
    }, [])


    useEffect(() => {

        const fetchInitialData = async () => {

            try {
                setLoading(true);

                const currentFlick = await getFlickById(flickId);

                if (!currentFlick) {
                    console.error('current flick not found');
                }
                setCurrFlick(currentFlick);

                const prevAndNextFlicks = await getPrevAndNextFlicks(flickId);

                const newFlickList = [];
                let newIndex = 0;

                const fetchedPrevFlick = prevAndNextFlicks?.[0];
                const fetchedNextFlick = prevAndNextFlicks?.[1];

                if (fetchedPrevFlick) {
                    newFlickList.push(fetchedPrevFlick);
                    newIndex = 1;
                }

                newFlickList.push(currentFlick);

                if (fetchedNextFlick) {
                    newFlickList.push(fetchedNextFlick);
                }

                setFlickList(newFlickList);
                setCurrIndex(newIndex);


            } catch (error) {
                console.error('errror fetching flicks', error)
            } finally {
                setLoading(false)
            }
        };

        fetchInitialData();
    }, []);

    const fetchAdjacentFlicks = async (flickId: string) => {
        try {

            const prevAndNextFlicks = await getPrevAndNextFlicks(flickId);
            const fetchedPrevFlick = prevAndNextFlicks?.[0];
            const fetchedNextFlick = prevAndNextFlicks?.[1];

            let newFlickList = [...flickList];
            let needsUpdate = false;
            let newIndex = currIndex;

            // checking if we need to add a prev flick
            if (fetchedPrevFlick && !newFlickList?.some(flick => flick.id === fetchedPrevFlick?.id)) {
                newFlickList.unshift(fetchedPrevFlick);
                newIndex += 1;
                needsUpdate = true;
            }

            // checking if we neeed to add  a next flick

            if (fetchedNextFlick && !newFlickList.some(flick => flick?.id === fetchedNextFlick?.id)) {

                newFlickList.push(fetchedNextFlick);
                needsUpdate = true;

            }

            if (needsUpdate) {
                setFlickList(newFlickList);
                setCurrIndex(newIndex);
            }


        } catch (error) {
            console.error('error fetching adjacent flicks', error)
        }

    }

    useEffect(() => {
        if (!api || flickList?.length === 0) return;

        api.scrollTo(currIndex);

        const handleWheel = (e: WheelEvent) => {

            e.preventDefault();
            if (e.deltaY > 0 && api?.canScrollNext()) {
                api?.scrollNext();
                handleScrollNext();
            }
            if (e.deltaY < 0 && api?.canScrollPrev()) {
                api?.scrollPrev()
                handleScrollPrev();
            }
        };

        const carousel = carouselRef.current;

        if (carousel) {
            carousel.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (carousel) {
                carousel.removeEventListener('wheel', handleWheel);
            }
        };
    }, [api, flickList, currIndex]);

    const handleScrollNext = async () => {
        if (currIndex < flickList?.length - 1) {
            const nextIndex = currIndex + 1;
            const nextFlick = flickList?.[nextIndex];
            setCurrIndex(nextIndex);
            setCurrFlick(flickList?.[nextIndex]);

            await fetchAdjacentFlicks(nextFlick?.id);

        }
    };

    const handleScrollPrev = async () => {
        if (currIndex > 0) {
            const prevIndex = currIndex - 1;
            const prevFlick = flickList?.[prevIndex];
            setCurrIndex(prevIndex);
            setCurrFlick(flickList?.[prevIndex]);

            await fetchAdjacentFlicks(prevFlick?.id);
        }
    };
    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/flicks/${currFlick?.id}`

    const filteredFlickList = flickList?.filter(flick => flick !== null || undefined);

    if (loading || !currFlick) {
        return <Loader variant="purple" />
    }

    const isSaved = currFlick.saves?.some((save) => save.flickId === currFlick.id);
    const saveId = currFlick.saves?.find((save) => save.flickId === currFlick.id)?.id;
    
    console.log(currFlick)

    return (
        <Carousel
            ref={carouselRef}
            setApi={setApi}

            orientation="vertical"
            className="w-full"
        >
            <CarouselContent className="-mt-1 h-[500px] sm:h-[700px]">
                {filteredFlickList?.map((flick, index) =>
                (
                    <CarouselItem key={index} className="pt-1 items-center justify-center flex gap-4
                    ">
                        <div className="p-1 flex gap-4 items-center justify-center">
                            <video src={flick?.videoUrl}
                                controls
                                autoPlay={index === currIndex}
                                loop
                                className={` object-cover h-[460px] sm:h-[660px]  ${isModal ? 'w-[270px]' : 'w-[290px]'} md:w-[390px] lg:w-[490px] xl:w-[450px]`}
                            />

                            <div className="flex flex-col gap-8 self-end">
                                
                                <div className="bg-gray-800 rounded-full p-2">
                                    <ShareButton
                                        itemId={currFlick.id}
                                        link={shareLink}
                                        modalOpen={false}
                                        authorName={currFlick.author.name}
                                        caption={currFlick.caption}
                                    />
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                )
                )}
            </CarouselContent>

        </Carousel>


    )
}

export default FlickCarousel
