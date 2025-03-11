'use client'
import { getAllFlickIds, getFlickById } from "@/actions/flick.actions";
import FlickCard from "@/components/FlickCard"
import ShareButton from "@/components/ShareButton";
import {
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Flick, User } from "@prisma/client";
import { useEffect, useState } from "react";

const FlickIdPage = ({ params }: { params: { flickId: string } }) => {

    const [currFlick, setCurrFlick] = useState<Flick & { author: User } | null>();
    const [loading, setLoading] = useState(false);
    const [flickIdList, setFlickIdList] = useState<string[]>([])

    useEffect(() => {

        const fetchData = async () => {

            try {
                setLoading(true);

                const { flickId } = await params;
                const currentFlick = await getFlickById(flickId);
                const flickIdsList = await getAllFlickIds();

                setCurrFlick(currentFlick);
                setFlickIdList(flickIdsList!)

            } catch (error) {
                console.error('errror fetching flicks', error)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [params]);

    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/flicks/${currFlick?.id}`
    return (
        <CarouselContent className="border">
            {flickIdList.map((flickId, index) => {

                return (
                    <CarouselItem key={index} className="pt-1 md:basis-1/2">
                        <div className="p-1">
                            <FlickCard
                                flick={currFlick!}
                                classNames="w-[450px] h-[calc(100vh-200px)] border"
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
            })}
        </CarouselContent>
    )
}

export default FlickIdPage
// have to correct tghis carousel