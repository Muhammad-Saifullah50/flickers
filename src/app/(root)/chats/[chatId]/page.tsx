import { getChatById } from "@/actions/chat.actions";

const ChatPage = async ({ params }: { params: { chatId: string } }) => {

  const chat = await getChatById(params.chatId);
  return (
    <div>
      <h1>Chat1</h1>
    </div>
  )
}

export default ChatPage