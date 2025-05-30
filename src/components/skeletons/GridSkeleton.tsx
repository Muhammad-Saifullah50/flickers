import React from 'react'
import { Skeleton } from '../ui/skeleton'

const GridSkeleton = () => {
  return (
    <section className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-auto p-5 space-y-5 h-screen overflow-y-auto'>
      <Skeleton className='h-72' />
      <Skeleton className='h-80' />
      <Skeleton className='h-96' />
      <Skeleton className='h-40' />
      <Skeleton className='h-52' />
      <Skeleton className='h-60' />
    </section>
  )
}

export default GridSkeleton