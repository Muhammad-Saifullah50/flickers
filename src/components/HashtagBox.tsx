'use client';

import { usePathname, useRouter } from "next/navigation";

const HashtagBox = ({text} : {text: string}) => {

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    console.log(pathname)
    router.push(`/${pathname}?hashtag_query=${text}`);
 // have to correcty this pushing
  }
  return (
    <div 
    onClick={handleClick}
    className="text-xs bg-dark-2 text-purple-tertiary border border-dark-4  rounded-full p-2 px-4 cursor-pointer">
      #{text}
      </div>
  )
}

export default HashtagBox 