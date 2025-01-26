import { getCurrentUserFromDb } from '@/actions/user.actions';
import PostDetails from './PostDetails';
import { getFeedPosts } from '@/actions/post.actions';

const FeedList = async () => {

    const currentUser = await getCurrentUserFromDb();

    let userhasFollowed;

    if (!currentUser) {
        userhasFollowed = false
    } else if (currentUser && currentUser?.following?.length === 0) {
        userhasFollowed = false
    } else if (currentUser && currentUser?.following?.length > 0) {
        userhasFollowed = true
    } else {
        userhasFollowed = false
    }

    const posts = await getFeedPosts(userhasFollowed);

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