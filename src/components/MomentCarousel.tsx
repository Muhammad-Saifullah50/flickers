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

const MomentCarousel = ({ allMoments, currMomentId }: { allMoments: (Moment & { author: User })[], currMomentId: string }) => {

    return (
        <Carousel className=" max-w-screen-lg w-full">
        <CarouselContent className="-ml-1">
          {allMoments.map((moment) => (
            <CarouselItem key={moment.id} className="pl-1 md:basis-1/2 lg:basis-1/3 flex items-center justify-center">
              <div className="p-1">
              <MomentCard moment={moment} currMomentId={currMomentId}/>
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

