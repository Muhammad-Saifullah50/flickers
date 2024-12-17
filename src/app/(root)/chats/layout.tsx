import { getChatList } from "@/actions/chat.actions"
import ChatsList from "@/components/ChatsList"
import Heading from "@/components/Heading"

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {

  const chatList = await getChatList()

  return (
    <main className="flex ">
      <section className="flex flex-col gap-4 w-2/5">
        <Heading text='All Chats' icon='/icons/chats-white.svg' />
        <ChatsList chatList={chatList} />
      </section>

      <section className="flex h-full w-3/5">
        {children}
      </section>
    </main>
  )

}

export default ChatLayout