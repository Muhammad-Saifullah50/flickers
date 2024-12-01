import { getFeedPosts } from "@/actions/post.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import Heading from "@/components/Heading";

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

      <section>

      </section>
    </main>
  )
}
