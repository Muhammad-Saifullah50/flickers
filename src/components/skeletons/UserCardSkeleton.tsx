import React from 'react'
import { Skeleton } from '../ui/skeleton'

const UserCardSkeleton = () => {
    return (
        <aside className="flex flex-col gap-4  border-[3px] border-dark-3 p-4 rounded-xl h-[320px] w-[320px] items-center justify-center">
            <Skeleton className='h-[90px] w-[90px] rounded-full' />

            <Skeleton className='h-5 w-20' />
            <Skeleton className='h-5 w-24' />
            
            <Skeleton className='h-10 w-28 rounded-lg' />
        </aside>
    )
}

export default UserCardSkeleton