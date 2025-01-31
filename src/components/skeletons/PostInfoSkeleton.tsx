import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PostInfoSkeleton = () => {
    return (
        <div className="flex gap-6 p-4 border border-dark-3 rounded-llg">
            <Skeleton className="h-[35rem] w-full " />

            <div className="flex flex-col justify-between gap-4 w-full">

                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-4">
                        <Skeleton className="w-[40px] h-[40px] rounded-full" />
                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-40 h-4 rounded-sm" />
                            <Skeleton className="w-40 h-4 rounded-sm" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="w-4 h-4 rounded-sm" />
                        <Skeleton className="w-4 h-4 rounded-sm" />
                    </div>
                </div>

                <div>
                    <div className='flex flex-col gap-6'>
                        <Skeleton className="w-full h-6 rounded-sm" />
                        <Skeleton className="w-full h-6 rounded-sm" />
                    </div>

                    <div className="flex flex-col gap-4 pt-10">
                        <Skeleton className="w-full h-14 rounded-sm" />
                        <Skeleton className="w-full h-14 rounded-sm" />
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                   <Skeleton className="w-full h-6 rounded-sm" />
                   <Skeleton className="w-full h-6 rounded-sm" />
                </div>
            </div>
        </div>
    )
}

export default PostInfoSkeleton

