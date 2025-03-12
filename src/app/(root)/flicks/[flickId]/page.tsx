'use client'
import { getAllFlickIds, getFlickById, getPrevAndNextFlicks } from "@/actions/flick.actions";
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

const FlickIdPage = ({ params }: { params: { flickId: string } }) => {

    const [currFlick, setCurrFlick] = useState<Flick & { author: User } | null>(null);
    const [loading, setLoading] = useState(false);
    const [flickList, setFlickList] = useState<Flick & { author: User }[] | null>(null);
    const [api, setApi] = useState<CarouselApi>();
    const carouselRef = useRef<HTMLDivElement>(null);
const router = useRouter();
const [nextFlick, setNextFlick] = useState<Flick & { author: User } | null>(null);
const [prevFlick, setPrevFlick] = useState<Flick & { author: User } | null>(null);


    useEffect(() => {

        const fetchData = async () => {

            try {
                setLoading(true);

                const { flickId } = await (params);
                const currentFlick = await getFlickById(flickId);
                setCurrFlick(currentFlick);

                const prevAndNextFlicks = await getPrevAndNextFlicks(flickId);


                const fetchedPrevFlick = prevAndNextFlicks[0];
                setPrevFlick(fetchedPrevFlick);
                const fetchedNextFlick = prevAndNextFlicks[1];
                setNextFlick(fetchedNextFlick);

                if (fetchedNextFlick && fetchedPrevFlick) {
                    setFlickList([fetchedPrevFlick, currentFlick, fetchedNextFlick])
                } else if (fetchedPrevFlick && !fetchedNextFlick) {
                    setFlickList([fetchedPrevFlick, currentFlick])
                } else if (!fetchedPrevFlick && fetchedNextFlick) {
                    setFlickList([currentFlick, fetchedNextFlick])
                } else {
                    setFlickList([currentFlick])
                }


            } catch (error) {
                console.error('errror fetching flicks', error)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [params]);

    useEffect(() => {
        if (!api) return;

        api.scrollTo(flickList?.findIndex(flick => flick.id === (params.flickId)) || 0)
        const handleWheel = (e: WheelEvent) => {

            e.preventDefault();
            if (e.deltaY > 0 && api?.canScrollNext()) {
                api?.scrollNext()
                router.push(`/flicks/${nextFlick?.id}`)
            }
            if (e.deltaY < 0 && api?.canScrollPrev()) {
                api?.scrollPrev()
                router.push(`/flicks/${prevFlick?.id}`)
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
    }, [api, prevFlick, nextFlick]);
    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/flicks/${currFlick?.id}`
    return (
        <Carousel
            ref={carouselRef}
            setApi={setApi}

            orientation="vertical"
            className="w-full"
        >
            <CarouselContent className="-mt-1 h-[850px]">
                {flickList?.map((flick, index) =>
                (
                    <CarouselItem key={index} className="pt-1">
                        <div className="p-1 flex">
                            <FlickCard
                                flick={flick!}
                                classNames="w-[450px] h-[calc(100vh-200px)]"
                                loading={loading}
                                flickIcon={false}
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

export default FlickIdPage
// have to correct tghis carousel