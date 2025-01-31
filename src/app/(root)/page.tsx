// import { getFeedPosts } from "@/actions/post.actions";
// import { getCurrentUserFromDb } from "@/actions/user.actions";
// import FeedList from "@/components/FeedList";
// import Heading from "@/components/Heading";
// import HomeFeedSkeleton from "@/components/skeletons/HomeFeedSkeleton";
// import { Suspense } from "react";

export default async function HomePage() {

  // let currentUser = null;
  // let userHasFollowed = false;

  // try {
  //   currentUser = await getCurrentUserFromDb();

  // } catch (error) {
  //   console.error('User not authenticated', error);
  // }

  // if (!currentUser) {
  //   userHasFollowed = false
  // } else if (currentUser && currentUser?.following?.length === 0) {
  //   userHasFollowed = false
  // } else if (currentUser && currentUser?.following?.length > 0) {
  //   userHasFollowed = true
  // } else {
  //   userHasFollowed = false
  // }
  // const postsPromise = getFeedPosts(userHasFollowed);

  // return (
  //   <main>
  //     <Heading text='Home Feed' icon='/icons/home-white.svg' />

  //     <section className="flex flex-col gap-6 py-9">
  //       <Suspense fallback={
  //         <div>
  //           {Array.from({ length: 2 }).map((_, index) => (
  //             <HomeFeedSkeleton key={index} />
  //           ))}
  //         </div>
  //       }>

  //         <FeedList postsPromise={postsPromise} currentUser={currentUser} />

  //       </Suspense>
  //     </section>
  //   </main>
  // )

  return <h1>static</h1>
}
