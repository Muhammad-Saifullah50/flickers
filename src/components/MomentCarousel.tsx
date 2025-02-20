'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Moment, MomentAsset, User } from "@prisma/client"
import MomentCard from "./MomentCard"
import { type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useRef, useState } from "react"

type MomentCarouselProps = {
  allMoments: (Moment & { author: User, assets: MomentAsset[] })[],
  currMoment: Moment & { author: User, assets: MomentAsset[] }
}
const MomentCarousel = ({ allMoments, currMoment }: MomentCarouselProps) => {

  const [api, setApi] = useState<CarouselApi>();
  const [currentMomentId, setCurrentMomentId] = useState<string>(currMoment.id);
  const [currentMoment, setCurrentMoment] = useState<Moment & { author: User, assets: MomentAsset[] }>(currMoment);

  const momentIdList = allMoments.map(moment => moment.id)

  let initialIndex = momentIdList.findIndex(id => id === currMoment.id)
  const [currentIndex, setCurrentIndex] = useState(initialIndex);


  useEffect(() => {
    if (!api) {
      return
    }


    api.scrollTo(currentIndex);

  }, [api, currentIndex])

  const handleNext = () => {

    const isLastMoment = currentIndex === momentIdList.length - 1

    if (isLastMoment) {
      setCurrentIndex(0)
      setCurrentMomentId(momentIdList[0])
      setCurrentMoment(allMoments[0])
    } else {

      setCurrentIndex(currentIndex + 1)
      setCurrentMomentId(momentIdList[currentIndex + 1])
      setCurrentMoment(allMoments[currentIndex + 1])
    }

  }

  const handlePrevious = () => {

    const isFirstMoment = currentIndex === 0
    if (isFirstMoment) {
      setCurrentIndex(momentIdList.length - 1)
      setCurrentMomentId(momentIdList[momentIdList.length - 1])
      setCurrentMoment(allMoments[momentIdList.length - 1])
    } else {

      setCurrentIndex(currentIndex - 1)
      setCurrentMomentId(momentIdList[currentIndex - 1])
      setCurrentMoment(allMoments[currentIndex - 1])
    }
  }

  return (
    <Carousel className="w-full " setApi={setApi}
      opts={{
        align: 'center',
        loop: true
      }}
    >
      <CarouselContent className="flex items-center  sm:gap-8 xl:gap-0">
        {allMoments.map((moment, index) => (
          <CarouselItem key={index}
            className="md:basis-1/2 lg:basis-1/3 flex justify-center  relative -z-50  "
          >
            <MomentCard
              moment={moment}
              currMoment={currentMoment}
              momentIdList={momentIdList}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

    </Carousel>
  )
}

export default MomentCarousel
