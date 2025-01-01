'use client'

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import Heading from "./Heading";
import { useEffect } from "react";

const RightSidebar = () => {


const pathname = usePathname();

useEffect(() =>   {
  const fetchData = async () => {
    const topCreators = await getTopCreators(); 
  }
}, [])

const shouldBeVisible = pathname === '/' || pathname === '/edit-profile' || pathname === '/create-post' 

  return (
    <aside className={cn('w-[465px]', !shouldBeVisible ? 'hidden' : 'flex')}>
      {pathname === '/' && (
        <div>
          <Heading text="Top Creators" className="text-2xl font-semibold"/>

          
        </div>
      )}
    </aside>
  )
}

export default RightSidebar
