import { getFlickById } from '@/actions/flick.actions';
import Heading from '@/components/Heading'

export const generateMetadata = async ({ params }: { params: { flickId: string } }) => {
  const { flickId } = await params

  const flick = await getFlickById(flickId);

  const title = `${flick?.caption.split(" ").slice(0, 10).join(" ") + "..."} - ${flick?.author?.name}`
  const ogImage = `${process.env.NEXT_PUBLIC_APP_URL}/api/og?flickId=${flickId}`

  return {
      title: title || 'Flick',
      description: flick?.caption,
      openGraph: {
          title: `${title} - Flickers` || 'Flick - Flickers',
          description: flick?.caption,
          images: ogImage,
      }
  }
}



const FlickIdLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className='flex flex-col h-[95vh] pb-10 items-center my-auto  justify-center overflow-hidden'>
          <section className='flex justify-start w-full'>
                <Heading text="Flicks" icon="/icons/flicks-white.svg" />
            </section>
        {children}
    </main>
  )
}

export default FlickIdLayout