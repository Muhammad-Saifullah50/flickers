import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='flex w-full bg-dark-1 min-h-screen '>
            <div className='flex min-h-screen w-full lg:w-1/2 items-center justify-center overflow-y-auto !py-10 relative'>
                {children}
            </div>
            <div className='hidden lg:flex w-1/2 h-screen bg-dark-2 fixed right-0'>
                <Image
                    src={'/images/auth-hero.png'}
                    height={250}
                    width={500}
                    alt='auth hero'
                    className=' object-cover w-full' 
                    priority
                    />
            </div>
        </main>
    )
}

export default AuthLayout
