import React from 'react'
import { Skeleton } from '../ui/skeleton'

const FlickSkeleton = () => {
    return (
        <div className='flex flex-col gap-14'>
            <div className='flex items-center justify-center'>
                <Skeleton className='rounded-full h-10 w-80' />
            </div>
            <div className='flex gap-10 flex-wrap '>
                <Skeleton className='rounded-lg h-[400px] sm:w-[240px] w-full' />
                <Skeleton className='rounded-lg h-[400px] sm:w-[240px] w-full' />
                <Skeleton className='rounded-lg h-[400px] sm:w-[240px] w-full' />
            </div>
        </div>
    )
}

export default FlickSkeleton