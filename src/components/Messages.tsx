import { getCurrentUserFromDb } from "@/actions/user.actions"
import { cn, formatMessageTime } from "@/lib/utils"
import { Message } from "@prisma/client"
import Image from "next/image"

const Messages = async ({ messages }: { messages: Message[] }) => {

  const currUser = await getCurrentUserFromDb()
  return (
    <div className="flex flex-col gap-2 justify-end overflow-y-scroll overflow-x-clip my-10 ">
      {messages.map((message: Message) => {
        console.log(message.createdAt)
        const isOwner = message.senderId === currUser?.id
        return (

          <div
            key={message.id}
            className={cn("flex flex-col  max-w-fit self-start",
              isOwner && "self-end"
            )}>
            <div
              className={cn("flex justify-start bg-dark-4 rounded-lg ml-2 p-3 text-base",
                isOwner && " bg-purple-primary mr-2")}
            >
              <Image
                src={'/icons/tri-gray.svg'}
                width={20}
                height={20}
                alt={'triangle'}
                className={`relative top-[18.75px] right-5 ${isOwner && "hidden" }`} />
              {message.body}
              <Image
                src={'/icons/tri-purple.svg'}
                width={20}
                height={20}
                alt={'triangle'}
                className={`relative top-[18.5px] left-5 ${!isOwner && "hidden" }`} />
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