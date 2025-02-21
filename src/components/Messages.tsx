import { cn, formatMessageTime } from "@/lib/utils"
import { Message } from "@ably/chat"
import { User } from "@prisma/client"
import Image from "next/image"
import { useEffect, useRef } from "react"

const Messages = ({ messages, currUser }: { messages: Message[], currUser: User }) => {

  const msgref = useRef<HTMLDivElement>(null);

  useEffect(() => {
if ( msgref.current) msgref.current.scrollIntoView({behavior: 'instant'})
  }, [messages])
  
  return (
    <div className="flex flex-col gap-2 justify-end overflow-y-scroll overflow-x-clip my-10 ">
      {messages.map((message, index) => {
        const isOwner = message.clientId === currUser?.id;
        const isLastMessage = index === messages.length - 1
        return (

          <div
            ref={isLastMessage ? msgref : null}
            key={message.createdAt.toString()}
            className={cn("flex flex-col  max-w-fit self-start",
              isOwner && "self-end"
            )}>
            <div
              className={cn("flex justify-start bg-dark-4 rounded-lg ml-2 p-3 text-base text-light-2 relative",
                isOwner && " bg-purple-primary mr-2")}
            >
              <Image
                src={'/icons/tri-gray.svg'}
                width={20}
                height={20}
                alt={'triangle'}
                className={`absolute  -bottom-[7px]  -left-2 w-[20px] h-[20px]  ${isOwner && "hidden"}`} />
              {message.text}
              <Image
                src={'/icons/tri-purple.svg'}
                width={20}
                height={20}
                alt={'triangle'}
                className={`absolute  -bottom-1  -right-2 w-[20px] h-[20px]  ${!isOwner && "hidden"}`} />
            </div>
            <span className={cn("text-xs flex text-purple-tertiary m-1",
              isOwner && "justify-end"
            )}>{formatMessageTime(message.createdAt)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Messages