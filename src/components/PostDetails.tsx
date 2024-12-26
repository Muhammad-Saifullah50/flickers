import React from 'react'
import PostCarousel from './PostCarousel'
import PostInfoCard from './PostInfoCard'
import { Post, User, Comment } from '@prisma/client'
import { cn } from '@/lib/utils'

interface PostDetailsProps {
  post: Post & { author: User, comments: Comment[] },
  isHomeCard?: boolean
  userId:string
}

const PostDetails = ({ post, isHomeCard,userId }: PostDetailsProps) => {
  return (
    <section className="flex w-full h-full">
      <div className={cn("flex flex-1 w-1/2", {
        'hidden': isHomeCard
      })}>
        <PostCarousel items={post.assets} />
      </div>

      <div className="flex flex-1 w-1/2">
        <PostInfoCard
          post={post}
          isHomeCard={isHomeCard}
          userId={ userId} />
      </div>
    </section>
  )
}

export default PostDetails