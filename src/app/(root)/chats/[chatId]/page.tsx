import { getChatById } from "@/actions/chat.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import Messages from "@/components/Messages";
import SendMessageForm from "@/components/SendMessageForm";
import Image from "next/image";

const ChatPage = async ({ params }: { params: { chatId: string } }) => {

  const usableParams = await params;

  const { chatId } = usableParams;

  const chat = await getChatById(chatId);

  const currentUser = await getCurrentUserFromDb();

  const otherUser = chat?.users.find((user) => user.id !== currentUser?.id);
 
  return (
    <main className="flex flex-col  w-full bg-dark-2 h-[calc(100vh-80px)] rounded-2xl border border-dark-4 p-4">

      <section className="flex justify-between items-center pb-4">
        <div className="flex gap-4 items-center">
          <div>
            <Image
              src={otherUser?.image!}
              width={50}
              height={50}
              alt="chat image"
              className="rounded-full"
            />
          </div>
          <div>
            <h2>{otherUser?.name}</h2>
            <p className="text-sm text-purple-secondary">Online</p>
          </div>

        </div>

        <div className="flex gap-2">
          <Image
            src={'/icons/phone.svg'}
            width={20}
            height={20}
            alt="phone image"
          />
          <Image
            src={'/icons/video.svg'}
            width={20}
            height={20}
            alt="phone image"
          />
        </div>
      </section>

      <span className="w-full h-[1px] bg-dark-4" />

      <section className=" overflow-y-scroll h-full">
        <Messages messages={chat?.messages!}/>
      </section>

      <section>
        <SendMessageForm chatId={chatId} senderId={currentUser?.id!} />
      </section>
    </main>
  )
}

export default ChatPage