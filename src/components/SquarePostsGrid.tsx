import { Flick, Like, Post, User } from '@prisma/client'
import { use } from 'react'
import PostCard from './PostCard'
import FlickCard from './FlickCard'

type Item = (Post & { author: User }) | (Flick & { author: User, likes: Like[] })

type SquareGridProps = {
    itemsPromise: Promise<Item[]>
    isFlicks?: boolean
}

const SquarePostsGrid = ({ itemsPromise, isFlicks }: SquareGridProps) => {

    const items = use(itemsPromise)


    return (
        <section className='flex flex-wrap gap-5 relative'>
            {items && items?.length > 0 ? items?.map((item) => {
                const isFlick = item.videoUrl

                if (isFlick) {
                    return (
                        <FlickCard
                            flick={item}
                            key={item.id}
                            classNames='h-[400px] w-[240px] '
                        />
                    )
                }
                return (
                    <PostCard
                        post={item}
                        key={item.id}
                        extraImageClasses='!w-[250px] !h-[250px]'
                    />

                )
            }) : (
                <div className='flex items-center justify-center w-full  absolute'>

                    {isFlicks ? (
                            <p >You have not created any flicks</p>
                    ) : (
                        <p >You have not created any posts</p>
                    )}
                </ div>
            )}
        </section>
    )
}

export default SquarePostsGrid
