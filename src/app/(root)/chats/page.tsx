import { getCurrentUserFromDb } from "@/actions/user.actions";
import ChatsList from "@/components/ChatsList"
import Heading from "@/components/Heading"

const ChatPage = async () => {
  const currentUser = await getCurrentUserFromDb();
  return (
    <main className="flex gap-4 ">
      <section className="flex flex-col gap-4 w-full lg:w-2/5">
        <Heading text='All Chats' icon='/icons/chats-white.svg' />

        <ChatsList currentUser={currentUser!}/>
      </section>
      <div className="hidden bg-dark-3 lg:flex justify-center items-center w-full h-full min-h-[calc(100vh-80px)] text-white">
        <p>Select a chat to start chatting</p>
      </div>
    </main>
  )
}

export default ChatPage
// haver to make chatl;ist sheet for mobile