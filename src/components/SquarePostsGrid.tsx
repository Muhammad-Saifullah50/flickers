import { Flick, Post, User } from '@prisma/client'
import { use } from 'react'
import FlickCard from './FlickCard';
import PostCard from './PostCard';

type Item = (Post & { author: User })

type SquareGridProps = {
    items: Item[]
}
const SquarePostsGrid = ({ items }: SquareGridProps) => {

    return (

        <section className='flex flex-wrap gap-5'>
            {items?.map((item) => {

                return (
                    <PostCard post={item} key={item.id} extraImageClasses='!w-[330px] !h-[315px]' />
                )
            })}
        </section>
    )
}

export default SquarePostsGrid