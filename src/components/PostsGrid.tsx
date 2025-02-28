import { Flick, Post, User } from '@prisma/client'
import { use } from 'react'
import FlickCard from './FlickCard';
import PostCard from './PostCard';

type Item = (Post & { author: User }) | (Flick & { author: User })

type PostsGridParams = {
  itemsPromise: Promise<Item[]>
  query: string | undefined
}
const PostsGrid = ({ itemsPromise, query }: PostsGridParams) => {

  const items = use(itemsPromise);

  return (

    <section className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-auto p-5 space-y-5 relative'>
      {items.length > 0 ? items?.map((item) => {

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
      }) :
        <div className='flex items-center justify-center w-full  absolute'>

          <p >No posts or flicks found for '{query}'</p>
        </ div>
      }
    </section>
  )
}

export default PostsGrid