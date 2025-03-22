import { getFlickById } from "@/actions/flick.actions"
import FlickCarousel from "@/components/FlickCarousel"
import Heading from "@/components/Heading"

const FlickIdPage = async ({ params }: { params: { id: string } }) => {

    const usableParams =  await params
    const flick = await getFlickById(usableParams.id)
  return (
    <section className="w-full h-[calc(100vh-165px)] sm:h-screen flex flex-col sm:gap-16 overflow-hidden">
                        <Heading text="Flicks" icon="/icons/flicks-white.svg" />
        <FlickCarousel flick={flick} flickId={flick?.id} />
    </section >

  )

}

export default FlickIdPage