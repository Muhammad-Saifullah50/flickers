import Heading from '@/components/Heading'
import React from 'react'

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