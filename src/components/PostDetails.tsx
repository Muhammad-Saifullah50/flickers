import React from 'react'
import PostCarousel from './PostCarousel'
import PostInfoCard from './PostInfoCard'
import { Post, User,Comment } from '@prisma/client'

const PostDetails = ({post}: {post: Post & { author: User, comments: Comment[] }}) => {
  return (
    <section className="flex w-full">
    <div className="flex flex-1 w-1/2">
        <PostCarousel items={post.assets} />
    </div>

    <div className="flex flex-1 w-1/2">
        <PostInfoCard post={post} />
    </div>
</section>
  )
}

export default PostDetails