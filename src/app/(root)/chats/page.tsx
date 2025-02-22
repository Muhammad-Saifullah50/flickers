import ChatsList from "@/components/ChatsList"
import Heading from "@/components/Heading"

const ChatPage = () => {
  return (
    <main className="flex gap-4 ">
      <section className="flex flex-col gap-4 w-2/5">
        <Heading text='All Chats' icon='/icons/chats-white.svg' />

        <ChatsList />
      </section>
      <div className="bg-dark-3 flex justify-center items-center w-full h-full min-h-[calc(100vh-80px)] text-white">
        <p>Select a chat to start chatting</p>
      </div>
    </main>
  )
}

export default ChatPage
