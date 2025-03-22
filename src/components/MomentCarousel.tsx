'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Moment, MomentAsset, User } from "@prisma/client"
import MomentCard from "./MomentCard"
import { type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

type MomentCarouselProps = {
  allMoments: (Moment & { author: User, assets: MomentAsset[] })[],
  currMoment: Moment & { author: User, assets: MomentAsset[] },
  setModalOpen: (open: boolean) => void,
  open: boolean
}
const MomentCarousel = ({ allMoments, currMoment, setModalOpen, open }: MomentCarouselProps) => {
  const calculateDuration = (moment: Moment & { author: User, assets: MomentAsset[] }) => {
    const hasAssets = moment?.assets?.length > 0;

    if (hasAssets) {
      const totalAssetsDurationArray = moment.assets.map(asset => asset.duration)
      const totalAssetsDuration = totalAssetsDurationArray.reduce((a, b) => a + b, 0) * 1000;
      return totalAssetsDuration;
    } else {
      return 5000;
    }
  }

  const [api, setApi] = useState<CarouselApi>();
  const [currentMomentId, setCurrentMomentId] = useState<string>(currMoment.id);
  const [currentMoment, setCurrentMoment] = useState<Moment & { author: User, assets: MomentAsset[] }>(currMoment);

  const momentIdList = allMoments.map(moment => moment.id)

  let initialIndex = momentIdList.findIndex(id => id === currMoment.id)
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const [duration, setDuration] = useState(() => calculateDuration(currMoment));
  const [lastMomentPlayed, setLastMomentPlayed] = useState(false);


  const plugin = useRef(
    Autoplay({ delay: duration, stopOnInteraction: true })
  );

  useEffect(() => {
    const lastMomentId = momentIdList[momentIdList.length - 1]
    if (currentMomentId === lastMomentId && !lastMomentPlayed) {
      const closeTimer = setTimeout(() => {
        setLastMomentPlayed(true)
        setModalOpen(false)
      }, duration);
      return () => clearTimeout(closeTimer)
    };
  }, [open, currentMomentId, setModalOpen, momentIdList, lastMomentPlayed])

  useEffect(() => {

    setDuration(calculateDuration(currMoment));
    plugin.current = Autoplay({ delay: duration, stopOnInteraction: true })

    const timeout = setTimeout(() => {
      handleNext()
    }, duration);

    return () => clearTimeout(timeout)

  }, [duration, currentMoment])

  useEffect(() => {
    if (!api) {
      return
    }
    api.scrollTo(currentIndex);
    setCurrentIndex(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap() )
      setCurrentMomentId(momentIdList[api.selectedScrollSnap() ])
      setCurrentMoment(allMoments[api.selectedScrollSnap()])
      

    })

  }, [api, currentIndex]);


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
    <Carousel className="w-full"
      setApi={setApi}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}


      opts={{
        align: 'center',
        loop: true
      }}
    >
      <CarouselContent className="flex items-center  sm:gap-8 xl:gap-0">
        {allMoments.map((moment, index) => (
          <CarouselItem key={index}
            className={cn(" flex justify-center  relative -z-50", {
              'md:basis-1/2 lg:basis-1/3': allMoments.length > 3
            })}
          >
            <MomentCard
              moment={moment}
              currMoment={currentMoment}
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
