import Image from 'next/image'
import React from 'react'

const Loader = ({ variant, fullScreen }: { variant: 'white' | 'purple', fullScreen?: boolean }) => {

    if (variant === 'purple') {
        return (
            <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : 'h-full'} w-full`}>
                <Image
                    src={'/icons/loading-purple.svg'}
                    width={fullScreen ? 50 : 25}
                    height={fullScreen ? 50 : 25}
                    alt='loader'
                />
            </div>
        )
    }

    if (variant === 'white') {
        return (
            <div className='flex items-center justify-center h-full w-full'>
                <Image
                    src={'/icons/loading-white.svg'}
                    width={25}
                    height={25}
                    alt='loader'
                />
            </div>
        )
    }
    return null
}

export default Loader
