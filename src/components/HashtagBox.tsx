'use client';

import { usePathname, useRouter } from "next/navigation";

const HashtagBox = ({ text }: { text: string }) => {

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === '/flicks') {
      router.push(`${pathname}?flicks_query=${text}`);
    } else {
      router.push(`${pathname}/?hashtag_query=${text}`);
    }}
    return (
      <div
        onClick={handleClick}
        className="text-xs bg-dark-2 text-purple-tertiary border border-dark-4  rounded-full p-2 px-4 cursor-pointer">
        #{text}
      </div>
    )
  }

  export default HashtagBox 