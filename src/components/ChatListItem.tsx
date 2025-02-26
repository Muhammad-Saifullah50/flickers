import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link"

type ChatListItemProps = {
    chatName: string;
    chatUsername: string
    chatId: string;
    chatImage: string | null
    isOnline: boolean;
    typing: boolean;
}
const ChatListItem = ({ chatName, chatId, chatImage, chatUsername, isOnline, typing }: ChatListItemProps) => {
    console.log(isOnline, ';')
    return (
        <li>
            <Link href={`/chats/${chatId}`}
                className="flex items-center justify-between gap-4 p-4 hover:bg-dark-3 rounded-lg"
            >
                <div className="flex items-center gap-4">

                    <Image
                        src={chatImage!}
                        width={40}
                        height={40}
                        alt="profile photo"
                        className="rounded-full"
                    />

                    {/* // the other persons name and username */}
                    <div className="text-white">
                        <h4 className="line-clamp-1">{chatName}</h4>
                        {typing ? <p className="text-sm text-purple-primary font-semibold">typing...</p> : (
                            <p className="text-sm text-purple-secondary font-normal">{chatUsername}</p>
                        )}

                    </div>
                </div>

                <span className={cn("h-[14px] w-[14px] rounded-full flex shrink-0", {
                    "bg-green-500": isOnline,
                    "bg-red-500": !isOnline,
                })} />
            </Link>
        </li>
    )
}

export default ChatListItem