'use client'
import { getFlickById, getPrevAndNextFlicks } from "@/actions/flick.actions";
import FlickCard from "@/components/FlickCard"
import ShareButton from "@/components/ShareButton";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Flick, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


interface FlickCarouselProps {
    flick: Flick
    flickId: string
}

const FlickCarousel = ({ flick, flickId }: FlickCarouselProps) => {

    const [currFlick, setCurrFlick] = useState<Flick & { author: User } | null>(null);
    const [loading, setLoading] = useState(false);
    const [flickList, setFlickList] = useState<Flick & { author: User }[] | null>(null);
    const [api, setApi] = useState<CarouselApi>();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currIndex, setCurrIndex] = useState(0);


    useEffect(() => {

        const fetchData = async () => {

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

                const fetchedPrevFlick = prevAndNextFlicks[0];
                const fetchedNextFlick = prevAndNextFlicks[1];

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

        fetchData();
    }, [flickId]);

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

    const handleScrollNext = () => {
        if (currIndex < flickList?.length - 1) {
            const nextIndex = currIndex + 1;
            setCurrIndex(nextIndex);
            setCurrFlick(flickList?.[nextIndex]);
        }
    };

    const handleScrollPrev = () => {
        if (currIndex > 0) {
            const prevIndex = currIndex - 1;
            setCurrIndex(prevIndex);
            setCurrFlick(flickList?.[prevIndex]);
        }
    };
    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/flicks/${currFlick?.id}`

    const filteredFlickList = flickList?.filter(flick => flick !== null || undefined);

    // have toi hanklde the implementation iof the behavoiur that whenever tyhe currflick changes i have to make sure that its prev and next flicks are loaded when available 
    // have to see clausde sol
    return (
        <Carousel
            ref={carouselRef}
            setApi={setApi}

            orientation="vertical"
            className="w-full"
        >
            <CarouselContent className="-mt-1 h-[700px]">
                {filteredFlickList?.map((flick, index) =>
                (
                    <CarouselItem key={index} className="pt-1 flex gap-4
                    ">
                        <div className="p-1 flex gap-4 items-center justify-center">
                            <video src={flick?.videoUrl}
                                controls
                                autoPlay={index === currIndex}
                                loop
                                className="object-cover h-[660px] w-[490px]"
                            />

                            <div className="flex flex-col gap-8 self-end">
                                <div className="bg-gray-800 rounded-full p-2">
                                    {/* <SavePostBtn
                                isHomeCard={false}
                                userId={userId}
                                postId={post.id}
                                isSaved={isSaved}
                                saveId={saveId}
                            /> */}
                                </div>
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
