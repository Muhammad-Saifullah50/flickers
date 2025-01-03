import React from 'react'

const FlickIdLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className='flex h-full items-center justify-center'>
        {children}
    </main>
  )
}

export default FlickIdLayout