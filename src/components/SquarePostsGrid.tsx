import { Post, User } from '@prisma/client'
import { use } from 'react'
import PostCard from './PostCard'

type Item = Post & { author: User }

type SquareGridProps = {
    itemsPromise: Promise<Item[]>
}

const SquarePostsGrid = ({ itemsPromise }: SquareGridProps) => {

    const items = use(itemsPromise)

    return (
        <section className='flex flex-wrap gap-5'>
            {items?.map((item) => (

                <PostCard
                    post={item}
                    key={item.id}
                    extraImageClasses='!w-[330px] !h-[315px]'
                />

            ))}
        </section>
    )
}

export default SquarePostsGrid
