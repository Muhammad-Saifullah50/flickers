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
import { type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useState } from "react"


const MomentCarousel = ({ allMoments, currMomentId }: { allMoments: (Moment & { author: User })[], currMomentId: string }) => {

  const [api, setApi] = useState<CarouselApi>();
  const [currentMomentId, setCurrentMomentId] = useState<string>(currMomentId);

  const momentIdList = allMoments.map(moment => moment.id)

  let initialIndex = momentIdList.findIndex(id => id === currMomentId)
  const [currentIndex, setCurrentIndex] = useState(initialIndex);


  useEffect(() => {
    if (!api) {
      return
    }


    api.scrollTo(currentIndex);

  }, [api, currentIndex])

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1)
    api?.scrollTo(currentIndex + 1)
    setCurrentMomentId(momentIdList[currentIndex + 1])

  }

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1)
    api?.scrollTo(currentIndex - 1)
    setCurrentMomentId(momentIdList[currentIndex - 1])
  }

  return (
    <Carousel className="w-full max-w-lg " setApi={setApi}>
      <CarouselContent className="-ml-1">
        {allMoments.map((moment, index) => (
          <CarouselItem key={index} className="pl-1  flex items-center justify-center">
            <div className="p-1">
              <MomentCard
                moment={moment} 
                currMomentId={currentMomentId}
                momentIdList={momentIdList}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious onClick={handlePrevious} className="relative"/>
      <CarouselNext onClick={handleNext} className="relative"/> */}
    </Carousel>
  )
}

export default MomentCarousel
