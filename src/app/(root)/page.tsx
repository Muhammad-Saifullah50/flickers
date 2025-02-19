import { getRecentMoments } from "@/actions/moments.actions";
import { getFeedPosts } from "@/actions/post.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import FeedList from "@/components/FeedList";
import Heading from "@/components/Heading";
import MomentsList from "@/components/MomentsList";
import HomeFeedSkeleton from "@/components/skeletons/HomeFeedSkeleton";
import MomentSkeleton from "@/components/skeletons/MomentSkeleton";
import { Suspense } from "react";

export default async function HomePage() {

  let currentUser = null;
  let userHasFollowed = false;

  try {
    currentUser = await getCurrentUserFromDb();

  } catch (error) {
    console.error('User not authenticated', error);
  }

  if (!currentUser) {
    userHasFollowed = false
  } else if (currentUser && currentUser?.following?.length === 0) {
    userHasFollowed = false
  } else if (currentUser && currentUser?.following?.length > 0) {
    userHasFollowed = true
  } else {
    userHasFollowed = false
  }
  const postsPromise = getFeedPosts(userHasFollowed);

  return (
    <main>

        <MomentsList 
         currentUser={currentUser} />
      <Heading text='Home Feed' icon='/icons/home-white.svg' />

      <section className="flex flex-col gap-6 py-9">
        <Suspense fallback={
          <div>
            {Array.from({ length: 2 }).map((_, index) => (
              <HomeFeedSkeleton key={index} />
            ))}
          </div>
        }>

          <FeedList postsPromise={postsPromise} currentUser={currentUser} />

        </Suspense>
      </section>
    </main>
  )
}

// have to see why is this page causing aq full page reload