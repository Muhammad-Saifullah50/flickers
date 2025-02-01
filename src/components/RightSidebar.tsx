import { cn } from "@/lib/utils";
import Heading from "./Heading";
import { getTopCreators } from "@/actions/creator.actions";
import UserCard from "./UserCard";
import { headers } from "next/headers";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import { Suspense } from "react";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";
import Image from "next/image";
import { getTopPostsByUser } from "@/actions/post.actions";
import PostCard from "./PostCard";


const RightSidebar = async () => {


  const headersList = await headers();
  const currUser = await getCurrentUserFromDb();

  const pathname = headersList.get('x-current-path')
  console.log(pathname, 'pathname')
  const shouldBeVisible = pathname === '/edit-profile' || pathname === '/create' || !pathname


  if (!shouldBeVisible) {
    return null
  }

  switch (pathname) {
    //maeans homepage
    case null:
      const topCreators = await getTopCreators();
      const creatorsToShow = topCreators?.filter(creator => creator.id !== currUser?.id)
      return (
        <aside className={cn('w-[420px] h-screen overflow-y-scroll')}>
          <Heading text="Top Creators" className="text-2xl font-semibold text-left sticky top-0 p-10 bg-dark-1" />
          <Suspense fallback={
            <div className='flex flex-wrap gap-4 py-9'>
              {Array.from({ length: 4 }).map((_, index) => (
                <UserCardSkeleton key={index} />
              ))}
            </div>
          }>
            {creatorsToShow?.map((creator) => (
              <UserCard key={creator.id} user={creator} />
            ))}
          </Suspense>
        </aside>
      )
    case 'settings':
    case '/create':

      const topPosts = await getTopPostsByUser(currUser?.id!);
      return (
        <aside className={cn('w-[420px] h-screen overflow-y-scroll')}>
          <div className="flex flex-col gap-4 items-center p-10 ">
            <Image
              src={currUser?.image || 'icons/dummyuser.png'}
              alt="user image"
              width={150}
              height={150}
              className="rounded-full"
            />
            <h5 className="font-semibold text-2xl">{currUser?.name}</h5>
            <p className="text-purple-secondary text-lg">{currUser?.username}</p>
          </div>

          <div className="relative flex flex-col gap-4 p-10 items-center justify-center">
          <Heading text="Top posts by you" className="!font-semibold !text-xl" />

            <Suspense fallback={
              <div className='flex flex-wrap gap-4 py-9'>
                {Array.from({ length: 4 }).map((_, index) => (
                  <UserCardSkeleton key={index} />
                ))}
              </div>
            }>
              {topPosts ? topPosts?.map((post) => (
                <PostCard key={post.id} post={post} extraImageClasses="!w-[250px] !h-[250px]" />
              )) :
                <p>
                  You havent created any posts yet
                </p>}
            </Suspense>
          </div>
        </aside>
      )

    default:
      return null
  }
}

export default RightSidebar

// have to make this a client component