import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SquarePostsGridSkeleton = () => {
    return (
        <div className='flex flex-wrap gap-5'>
            <Skeleton className='rounded-3xl w-[330px] h-[315px]' />
            <Skeleton className='rounded-3xl w-[330px] h-[315px]' />
            <Skeleton className='rounded-3xl w-[330px] h-[315px]' />
            <Skeleton className='rounded-3xl w-[330px] h-[315px]' />
        </div>
    )
}

export default SquarePostsGridSkeleton