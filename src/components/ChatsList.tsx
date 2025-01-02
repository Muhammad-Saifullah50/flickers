import { Chat, User } from "@prisma/client"
import ChatListItem from "./ChatListItem"
import { getCurrentUserFromDb } from "@/actions/user.actions";


type ChatListProps = {
  chatList: (Chat & { users: User[] })[] | undefined
}

const ChatsList = async ({ chatList }: ChatListProps) => {

  const currUser = await getCurrentUserFromDb();
  return (
    <section>
      <ul>
        {chatList?.length === 0 ? (
          <p>No Chats to show</p>
        ) : (
          chatList?.map((chat) => {

            const otherUser = chat.users.find((user: User) => user.id !== currUser?.id);

            if (!otherUser) return null;
            return (   
              <ChatListItem
                key={chat.id}
                chatName={otherUser?.name}
                //info the other users username
                chatUsername={otherUser?.username || `@${otherUser?.name.toLowerCase().replace(' ', '')}`}
                chatId={chat.id}
                //info the other users image
                chatImage={otherUser?.image}
              />

            )
          })
        )}
      </ul>
    </section>
  )
}

export default ChatsList