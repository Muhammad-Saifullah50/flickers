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

            return (
              <ChatListItem
                key={chat.id}
                chatName={otherUser?.name!}
                // the other users username
                chatUsername={otherUser?.username!}
                chatId={chat.id}
                // the other users image
                chatImage={otherUser?.image!}
              />

            )
          })
        )}
      </ul>
    </section>
  )
}

export default ChatsList