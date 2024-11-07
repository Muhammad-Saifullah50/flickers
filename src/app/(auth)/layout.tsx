import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='flex w-full bg-dark-1 h-[100vh]'>
            <div className='flex w-full lg:w-1/2 h-full items-center justify-center'>
                {children}
            </div>
            <div className='hidden lg:flex w-1/2 h-full bg-dark-2'>
                <Image
                    src={'/images/auth-hero.png'}
                    height={1000}
                    width={1000}
                    alt='auth hero'
                    className='w-full h-full object-cover' />
            </div>
        </main>
    )
}

export default AuthLayout
