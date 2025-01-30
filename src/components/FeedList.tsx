import PostDetails from './PostDetails';
import { use } from 'react';
import { Post, User } from '@prisma/client';

const FeedList = ({postsPromise, currentUser}: {postsPromise: Promise<Post[]>, currentUser: User | undefined}) => {

  
const posts = use(postsPromise)
    return (
        <div>
            {posts && posts?.length > 0 ?
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