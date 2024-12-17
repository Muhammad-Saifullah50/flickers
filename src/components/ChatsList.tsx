import { Chat, User } from "@prisma/client"
import ChatListItem from "./ChatListItem"

const ChatsList = ({ chatList }: { chatList: [] }) => {

  console.log(chatList)
  return (
    <section>
      <ul>
        {chatList.length === 0 ? (
          <p>No Chats to show</p>
        ) : (
          chatList.map((chat: Chat & { users: User[] }) => {
            return (
              <ChatListItem
                key={chat.id}
                chatName={chat.name!}
                // the other users username
                chatUsername={chat.users[1].username}
                chatId={chat.id}
                // the other users image
                chatImage={chat.image}
              />

            )
          })
        )}
      </ul>
    </section>
  )
}

export default ChatsList