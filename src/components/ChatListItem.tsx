import { Chat, User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

const ChatListItem = ({ chat }: { chat: Chat & { users: User[] } }) => {
    // the image of the second user in the user ids array
    const otherUserImage = chat[1].image;

    console.log(chat, 'chat list item')
    return (
        <li>
            <Link href={`/chats/${chat.id}`}
                className="flex items-start gap-4 p-4 hover:bg-dark-3 rounded-lg"
            >
                <Image
                    src={otherUserImage || '/icons/dummyuser.svg'}
                    width={40}
                    height={40}
                    alt="profile photo"
                />

                <h4>{chat.name}</h4>
            </Link>
        </li>
    )
}

export default ChatListItem