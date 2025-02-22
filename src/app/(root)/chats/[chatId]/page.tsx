'use client';
import { getChatById } from "@/actions/chat.actions";
import { getCurrentUserFromDb, getDbUserById } from "@/actions/user.actions";
import Loader from "@/components/Loader";
import MessageBox from "@/components/MessageBox";
import { ChatClient, ChatClientProvider, ChatRoomProvider, Room, RoomOptionsDefaults } from '@ably/chat';
import { User } from "@prisma/client";
import * as Ably from 'ably';
import { subscribe } from "diagnostics_channel";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const ChatPage = () => {


  const { chatId } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [otherUser, setOtherUser] = useState<User | null>();
  const [room, setRoom] = useState<Room>();
  const [chatClient, setChatClient] = useState<ChatClient>();

  useEffect(() => {
    const fetchUser = async () => {
      const currUser = await getCurrentUserFromDb();
      setCurrentUser(currUser);

      const chat = await getChatById(chatId as string);

      const otherUserId = chat?.users.find((user) => user.id !== currUser?.id)?.id;
      const fetchedOtherUser = await getDbUserById(otherUserId!);
      setOtherUser(fetchedOtherUser);
    };

    fetchUser()
  }, [])

  useEffect(() => {
    if (!currentUser || !otherUser) return;

    const realtimeClient = new Ably.Realtime({
      clientId: currentUser?.id!,
      authUrl: '/api/ably',
      authParams: { clientId: currentUser?.id! }
    });

    const client = new ChatClient(realtimeClient);

    setChatClient(client);
  }, [currentUser, otherUser]);



  useEffect(() => {

    if (!chatClient || !chatId) return;

    const getRoom = async () => {
      const typing = { timeoutMs: 3000 };
      const presence = {enter: true, leave: true};
      const fetchedRoom = await chatClient.rooms.get(chatId as string, { typing, presence });

      setRoom(fetchedRoom);
      await fetchedRoom.attach()

    }
    getRoom()
  }, [chatClient, chatId]);



  return (


    <main className="flex flex-col  w-full bg-dark-2 h-[calc(100vh-80px)] rounded-2xl border border-dark-4 p-4">
      {
        (chatClient && room) ? (

          <ChatClientProvider client={chatClient}>

            <ChatRoomProvider id={room?.roomId}>

              <MessageBox
                room={room!}
                chatId={chatId as string}
                currentUser={currentUser!}
                otherUser={otherUser!}
                key={chatId as string}
              />
            </ChatRoomProvider>
          </ChatClientProvider>
        ) : (
          <Loader variant="purple" />
        )

      }
    </main>
  )

}

export default ChatPage

// something is going wronmg with the chat ckliewnt 
// it is coming undefined as the fiorst time