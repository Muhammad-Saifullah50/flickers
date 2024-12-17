import { Chat } from "@prisma/client"
import ChatListItem from "./ChatListItem"

const ChatsList = ({ chatList }: { chatList: [] }) => {
  return (
    <section>
      <ul>
        {chatList.length === 0 ? (
          <p>No Chats to show</p>
        ) : (
          chatList.map((chat) => {
            // console.log(chat, 'chat')
            return (
            <ChatListItem key={chat.id} chat={chat.chats} />
          )})
        )}
      </ul>
    </section>
  )
}

export default ChatsList