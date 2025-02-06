import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SquarePostsGridSkeleton = () => {
    return (
        <div className='flex flex-wrap gap-5'>
            <Skeleton className='rounded-3xl w-[250px] h-[250px]' />
            <Skeleton className='rounded-3xl w-[250px] h-[250px]' />
            <Skeleton className='rounded-3xl w-[250px] h-[250px]' />
            <Skeleton className='rounded-3xl w-[250px] h-[250px]' />
        </div>
    )
}

export default SquarePostsGridSkeleton