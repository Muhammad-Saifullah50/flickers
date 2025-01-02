
import { cn } from "@/lib/utils";
import Heading from "./Heading";
import { getTopCreators } from "@/actions/creator.actions";
import UserCard from "./UserCard";

const RightSidebar = async ({pathname}: {pathname: string | null}) => {


  const topCreators = await getTopCreators();

 

  // const shouldBeVisible = pathname === '/' || pathname === '/edit-profile' || pathname === '/create-post' || !pathname

  switch (pathname) {
    //maeans homepage
    case null:
      return (
        <aside className={cn('w-[465px]')}>
          <div className="flex flex-col space-y-4 py-9">
            <Heading text="Top Creators" className="text-2xl font-semibold" />
            {topCreators && topCreators.map((creator) => (
              <UserCard user={creator} key={creator.id} />
            ))}
          </div>
        </aside>
      )
    case '/edit-profile':
      return (
        <h1>edit profile</h1>
      )

    case '/create-post':
      return (
        <h1>create post</h1>
      )

    default:
      return null
  }
}

export default RightSidebar
