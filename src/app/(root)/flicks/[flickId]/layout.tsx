import { getAllFlickIds, getFlickById } from '@/actions/flick.actions';
import Heading from '@/components/Heading'

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const flick = await getFlickById(id);

  const title = `${flick?.caption.split(" ").slice(0, 10).join(" ") + "..."} - ${flick?.author?.name}`
  const ogImage = `${process.env.NEXT_PUBLIC_APP_URL}/api/og?flickId=${id}`

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

export const generateStaticParams = async () => {
  const postIds = await getAllFlickIds()

  return postIds?.map(id => ({
      id,
  }))
};


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