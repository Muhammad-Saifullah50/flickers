import { Flick, Post, User } from '@prisma/client'
import React, { Suspense, use } from 'react'
import FlickCard from './FlickCard';
import PostCard from './PostCard';
import { getPostsandFlicksByHashtags } from '@/actions/post.actions';
import FlickCardSkeleton from './skeletons/GridSkeleton';

type Item = (Post & { author: User }) | (Flick & { author: User })

type PostsGridParams = {
  items?: Item[] | undefined
  query?: string
}
const PostsGrid =  ({ items: data, query }: PostsGridParams) => {

  const items = query ? use(getPostsandFlicksByHashtags(query)) : data

  return (

    <section className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-auto p-5 space-y-5'>
      {items && items.map((item) => {

        if ('videoUrl' in item) {
          return (

            <FlickCard
              flick={item}
              key={item.id}
              classNames='!rounded-3xl'
              flickIcon={true} />
          )
        }
        return (
          <PostCard post={item} key={item.id} />
        )
      })}
    </section>
  )
}

export default PostsGrid