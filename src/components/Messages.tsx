import { cn, determineAssetType, formatMessageTime } from "@/lib/utils"
import { Message, Room } from "@ably/chat"
import { User } from "@prisma/client"
import Image from "next/image"
import React, { useEffect, useRef } from "react"
import MessageActionsDropdown from "./MessageActionsDropdown"
import Loader from "./Loader"
import MessageAssetModal from "./modals/MessageAssetModal"

type MessagesProps = {
  messages: Message[]
  room: Room
  currUser: User
  containsOlderMessages: boolean;
  olderMessagesLoading: boolean;
}

const Messages = ({ room, messages, currUser, containsOlderMessages, olderMessagesLoading }: MessagesProps) => {

  const msgref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containsOlderMessages) return
    if (msgref.current) msgref.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages]);

  const reversed = messages.slice()

  return (
    <div key={room.roomId} className="flex flex-col gap-2 justify-end overflow-y-scroll overflow-x-clip my-10 ">
      {olderMessagesLoading && (
        <Loader variant="purple" />
      )}
      {reversed.map((message, index) => {
        const isOwner = message.clientId === currUser?.id;
        const isLastMessage = index === messages.length - 1;

        const isImage = determineAssetType(message.text) === 'image';
        const isVideo = determineAssetType(message.text) === 'video';
        return (

          <React.Fragment key={message.serial}>

            <div
              ref={isLastMessage ? msgref : null}
              className={cn("flex relative flex-col  max-w-fit self-start",
                isOwner && "self-end"
              )}>
              {isOwner && <MessageActionsDropdown message={message} room={room} />}
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


                {isImage ? (
                   <MessageAssetModal src={message.text} isVideo={isVideo} />
                ) : isVideo ? (
                   <MessageAssetModal src={message.text} isVideo={isVideo} />
                ) : (
                  message.text
                )}
                <Image
                  src={'/icons/tri-purple.svg'}
                  width={20}
                  height={20}
                  alt={'triangle'}
                  className={`absolute  -bottom-1  -right-2 w-[20px] h-[20px]  ${!isOwner && "hidden"}`} />
              </div>
              <span className={cn("text-xs flex text-purple-tertiary m-1",
                isOwner && "justify-end"
              )}>{message.isUpdated ? (`Edited - ${formatMessageTime(message?.updatedAt!)}`) : formatMessageTime(message.createdAt)}</span>

            </div>

          </React.Fragment>
        )
      })}
    </div>

  )
}

export default Messages