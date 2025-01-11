import { getChatById } from "@/actions/chat.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import MessageBox from "@/components/MessageBox";

const ChatPage = async ({ params }: { params: { chatId: string } }) => {

  const usableParams = await params;

  const { chatId } = usableParams;

  const chat = await getChatById(chatId);

  const currentUser = await getCurrentUserFromDb();

  const otherUser = chat?.users.find((user) => user.id !== currentUser?.id);

  return (
    <main className="flex flex-col  w-full bg-dark-2 h-[calc(100vh-80px)] rounded-2xl border border-dark-4 p-4">

      <MessageBox
     //  {/*@ts-expect-error have to correct this */}
        chatId={chat?.id}
        currentUser={currentUser!}
        otherUser={otherUser!}
      />
    </main>
  )
}

export default ChatPage

// have tio correct  the page. The data is not changed as soon as the page loads