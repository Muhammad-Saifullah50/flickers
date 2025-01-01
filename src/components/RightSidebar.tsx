
import { cn } from "@/lib/utils";
import Heading from "./Heading";
import { getTopCreators } from "@/actions/creator.actions";
import UserCard from "./UserCard";
import { headers } from "next/headers";

const RightSidebar = async  () => {


const topCreators = await getTopCreators();

const headerList = await headers();

const pathname = headerList.get('x-current-path')


const shouldBeVisible = pathname === '/' || pathname === '/edit-profile' || pathname === '/create-post' 

  return (
    <aside className={cn('w-[465px]', !shouldBeVisible ? 'hidden' : 'flex')}>
      {pathname === '/' && (
        <div className="flex flex-col space-y-4 py-9">
          <Heading text="Top Creators" className="text-2xl font-semibold"/>

          
          {topCreators &&  topCreators.map((creator) => (
            <UserCard user={creator}/>
          ))}
        </div>
      )}
    </aside>
  )
}

export default RightSidebar
