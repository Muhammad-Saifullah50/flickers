import { Comment, Like, Post, Save, User } from '@prisma/client'
import { use } from 'react'
import PostDetails from './PostDetails';


type FeedListProps = {
    postsPromise: Promise<(Post & { author: User, comments: Comment[], saves: Save[], likes: Like[] })[]>

    currentUser: User | undefined
}
const FeedList = ({ postsPromise, currentUser }: FeedListProps) => {

    const posts = use(postsPromise);

    return (
        <div>
            {posts.length > 0 ?
                (posts.map((post) => (
                    <PostDetails
                        key={post.id}
                        post={post}
                        isHomeCard={true}
                        userId={currentUser?.id} />
                ))
                ) : (
                    <div className="text-white text-center mt-10">
                        <h2>No posts to show</h2>
                    </div>
                )}
        </div>
    )
}

export default FeedList