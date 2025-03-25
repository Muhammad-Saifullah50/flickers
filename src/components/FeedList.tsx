'use client'
import PostDetails from './PostDetails';
import { use, useEffect, useRef, useState } from 'react';
import { Post, User } from '@prisma/client';
import { getPaginatedPosts } from '@/actions/post.actions';
import Loader from './Loader';

const FeedList = ({ initialPostsPromise, currentUser }: { initialPostsPromise: Promise<Post[]>, currentUser: User | null }) => {


    const initialPosts = use(initialPostsPromise)
    const [posts, setPosts] = useState(initialPosts)
    const [page, setPage] = useState<number | null>(2)
    const [hasMore, setHasMore] = useState(true)
    const loaderRef = useRef(null);

    const handleDeletePost = (postId: string) => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting && hasMore) {
                    {
                        const { posts: newPosts, nextPage } = await getPaginatedPosts(page, 2);

                        setPosts((prev) => [...prev, ...newPosts])
                        setPage(nextPage)
                        setHasMore(!!nextPage)
                    }
                }

            }, { rootMargin: '100px' }
        )

        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => observer.disconnect()
    }, [page, hasMore])

    return (
        <div>
            {posts && posts?.length > 0 ?
                (posts.map((post) => (
                    <PostDetails
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                        isHomeCard={true}
                        userId={currentUser?.id}
                        handleDeletePost={handleDeletePost}
                    />
                ))
                ) : (
                    <div className="text-white text-center mt-10">
                        <h2>No posts to show</h2>
                    </div>
                )}

            {hasMore && <div ref={loaderRef} className='w-full h-10'>
                <Loader variant='purple' />
            </div>
            }            </div>
    )
}

export default FeedList

