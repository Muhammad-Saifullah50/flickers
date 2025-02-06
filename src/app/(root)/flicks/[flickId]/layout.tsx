import React from 'react'

const FlickIdLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className='flex h-screen pb-10 items-center justify-center '>
        {children}
    </main>
  )
}

export default FlickIdLayout