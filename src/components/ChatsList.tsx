import { Chat, User } from "@prisma/client"
import ChatListItem from "./ChatListItem"
import { getCurrentUserFromDb } from "@/actions/user.actions";
import { use } from "react";


type ChatListProps = {
  chatListPromise: Promise<(Chat & { users: User[] })[]>
  currentUserPromise: Promise<User & {followedBy: User, following: User}>
}

const ChatsList = ({ chatListPromise, currentUserPromise }: ChatListProps) => {

  const chatList = use(chatListPromise)
  const currUser = use(currentUserPromise)
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