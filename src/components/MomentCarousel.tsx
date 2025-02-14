'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Moment, User } from "@prisma/client"
import MomentCard from "./MomentCard"
import { LoadingBarContainer } from "react-top-loading-bar"

const MomentCarousel = ({ allMoments }: { allMoments: (Moment & { author: User })[] }) => {

    return (
        <Carousel>
            <CarouselContent className=" h-screen flex items-center justify-center">
                {allMoments.map((moment) => (
                    <CarouselItem key={moment.id} className="basis-1/5 ">
                        <div className="p-1">
                                <MomentCard moment={moment} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default MomentCarousel
