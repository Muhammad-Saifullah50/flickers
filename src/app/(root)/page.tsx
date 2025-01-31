import { getFeedPosts } from "@/actions/post.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import FeedList from "@/components/FeedList";
import Heading from "@/components/Heading";
import HomeFeedSkeleton from "@/components/skeletons/HomeFeedSkeleton";
import { Suspense } from "react";

export default async function HomePage() {

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

    const postsPromise = getFeedPosts(userhasFollowed);

  return (
    <main>
      <Heading text='Home Feed' icon='/icons/home-white.svg' />

      <section className="flex flex-col gap-6 py-9">
        <Suspense fallback={
          <div>
            {Array.from({ length: 2 }).map((_, index) => (
              <HomeFeedSkeleton key={index} />
            ))}
          </div>
        }>

          <FeedList postsPromise={postsPromise} currentUser={currentUser}/>

        </Suspense>
      </section>
    </main>
  )
}
