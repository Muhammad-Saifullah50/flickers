import { getFeedPosts } from "@/actions/post.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import Heading from "@/components/Heading";
import PostDetails from "@/components/PostDetails";

export default async function HomePage() {

  const currentUser = await getCurrentUserFromDb();

  let userhasFollowed;

  if (!currentUser) {
    userhasFollowed = false
  } else if (currentUser && currentUser.following.length === 0) {
    userhasFollowed = false
  } else if (currentUser && currentUser.following.length > 0) {
    userhasFollowed = true
  } else {
    userhasFollowed = false
  }

  const posts = await getFeedPosts(userhasFollowed);

  return (
    <main>
      <Heading text='Home Feed' icon='/icons/home-white.svg' />

      <section className="flex flex-col gap-6 py-9">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostDetails key={post.id} post={post} isHomeCard={true}/>
          ))
          ) : (
          <div className="text-white text-center mt-10">
            <h2>No posts to show</h2>
          </div>
        )}
      </section>
    </main>
  )
}
