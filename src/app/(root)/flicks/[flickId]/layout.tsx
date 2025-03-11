'use client'
import { getFlickById } from '@/actions/flick.actions';
import Heading from '@/components/Heading'
import { Carousel, CarouselApi } from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';

// export const generateMetadata = async ({ params }: { params: { flickId: string } }) => {
//   const { flickId } = await params

//   const flick = await getFlickById(flickId);

//   const title = `${flick?.caption.split(" ").slice(0, 10).join(" ") + "..."} - ${flick?.author?.name}`
//   return {
//     title: title || 'Flick',
//     description: flick?.caption,
//     openGraph: {
//       title: `${title} - Flickers` || 'Flick - Flickers',
//       description: flick?.caption,
//     }
//   }
// }



const FlickIdLayout = ({ children }: { children: React.ReactNode }) => {
  const [api, setApi] = useState<CarouselApi>();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0 && api?.canScrollNext()) {
        api.scrollNext()
      }
      if (e.deltaY < 0 && api?.canScrollPrev()) {
        api.scrollPrev()
      }
    };

    const carousel = carouselRef.current;

    if (carousel) {
      carousel.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('wheel', handleWheel);
      }
    };
  }, [api]);
  return (
    <main className='flex flex-col h-[95vh] py-10 items-center my-auto  justify-center overflow-hidden'>
      <section className='flex justify-start w-full'>
        <Heading text="Flicks" icon="/icons/flicks-white.svg" />
      </section>

      <section>
        <Carousel
          ref={carouselRef}
          setApi={setApi}
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full"
        >
          {children}


        </Carousel>
      </section>
    </main>
  )
}

export default FlickIdLayout