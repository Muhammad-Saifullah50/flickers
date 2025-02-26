'use client'
import { cn } from "@/lib/utils";
import Heading from "./Heading";
import { getTopCreators } from "@/actions/creator.actions";
import UserCard from "./UserCard";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import { Suspense, useEffect, useState } from "react";
import UserCardSkeleton from "./skeletons/UserCardSkeleton";
import Image from "next/image";
import { getTopPostsByUser } from "@/actions/post.actions";
import PostCard from "./PostCard";
import { usePathname } from "next/navigation";
import { Post, User } from "@prisma/client";


const RightSidebar = () => {

  const [currUser, setCurrUser] = useState<User>();
  const [topCreatorstoShow, setTopCreatorsToShow] = useState<User[]>();
  const [topPostsToShow, settopPostsToShow] = useState<Post[]>()
  const [loading, setLoading] = useState(false)
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching data for right sidebar', window.innerWidth)
      try {
        setLoading(true);
        const currUser = await getCurrentUserFromDb();
        setCurrUser(currUser!);

        if (pathname === '/') {
          const topcreators = await getTopCreators();
          const creatorsToShow = topcreators?.filter(creator => creator.id !== currUser?.id)
          setTopCreatorsToShow(creatorsToShow!);
        }

        if (pathname === '/create' || pathname === '/settings') {
          const topPosts = await getTopPostsByUser(currUser?.id!);
          settopPostsToShow(topPosts!);
        }
      } catch (error) {
        console.log('error fetchiong data  for right sidebar', error)
      } finally {
        setLoading(false);
      }


    }

    fetchData()

  }, [])

  switch (pathname) {
    case '/':
      return (
        <aside className={cn('w-[420px] h-screen overflow-y-scroll')}>
          <Heading text="Top Creators" className="text-2xl font-semibold text-left sticky top-0 p-10 bg-dark-1" />

          {loading ? (
            <div className="flex flex-col gap-4 items-center p-10">
             {Array.from({ length: 4 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center p-10">
              {topCreatorstoShow?.map((creator) => (
                <UserCard key={creator.id} user={creator} />
              ))}
            </div>
          )}

        </aside>
      )
    case 'settings':
    case '/create':


      return (
        <aside className={cn('w-[420px] h-screen overflow-y-scroll')}>
          <div className="flex flex-col gap-4 items-center p-10 ">
            <Image
              src={currUser?.image || '/icons/dummyuser.png'}
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
              {topPostsToShow ? topPostsToShow?.map((post) => (
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

// have to correct the foillow unfoillow functionality from the rioght sidebar