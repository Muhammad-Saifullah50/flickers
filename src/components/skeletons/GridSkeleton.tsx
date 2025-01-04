import React from 'react'
import { Skeleton } from '../ui/skeleton'

const GridSkeleton = () => {
  return (
    <section className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-auto p-5 space-y-5'>
      <Skeleton className='h-20' />
      <Skeleton className='h-50' />
      <Skeleton className='h-40' />
    </section>
  )
}

export default GridSkeleton