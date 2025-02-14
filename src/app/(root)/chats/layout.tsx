import { getChatList } from "@/actions/chat.actions"
import { getCurrentUserFromDb } from "@/actions/user.actions"
import ChatsList from "@/components/ChatsList"
import Heading from "@/components/Heading"
import ChatListItemSkeleton from "@/components/skeletons/ChatListItemSkeleton"
import { Suspense } from "react"


const ChatLayout = ({ children }: { children: React.ReactNode }) => {

  const chatListPromise = getChatList()
  const currUserPromise = getCurrentUserFromDb();


  return (
    <main className="flex gap-4">
      <section className="flex flex-col gap-4 w-2/5">
        <Heading text='All Chats' icon='/icons/chats-white.svg' />
        
        <Suspense fallback={
          <div className='flex flex-col gap-4 p-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <ChatListItemSkeleton key={index} />
            ))}
          </div>
        }>

          <ChatsList
            chatListPromise={chatListPromise}
            currentUserPromise={currUserPromise}
          />
        </Suspense>
      </section>

      <section className="flex h-full w-3/5">
        {children}
      </section>
    </main>
  )

}

export default ChatLayout