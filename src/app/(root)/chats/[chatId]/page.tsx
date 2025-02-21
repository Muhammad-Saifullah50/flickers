'use client';
import { getChatById } from "@/actions/chat.actions";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import Loader from "@/components/Loader";
import MessageBox from "@/components/MessageBox";
import { ChatClient, ChatClientProvider, ChatRoomProvider, Room } from '@ably/chat';
import { User } from "@prisma/client";
import * as Ably from 'ably';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";


const ChatPage = () => {


  const { chatId } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    const fetchData = async () => {
      const currUser = await getCurrentUserFromDb();
      setCurrentUser(currUser);
    };

    fetchData()
  }, [currentUser])


console.log(currentUser, 'currentUser')
  const realtimeClient = new Ably.Realtime({ clientId: currentUser?.id!, authUrl: '/api/ably', authParams: { clientId: currentUser?.id! } });

  const client = new ChatClient(realtimeClient);

  const typing = { timeoutMs: 5000 }

  useEffect(() => {
    const getRoom = async () => {
      const fetchedRoom = await client.rooms.get(chatId as string, { typing });
      setRoom(fetchedRoom);
    }
    getRoom()
  }, [room])

console.log(client, 'client')
  
  return (
    client ? (

      <ChatClientProvider client={client}>
        <ChatRoomProvider id={room?.roomId}>

          <main className="flex flex-col  w-full bg-dark-2 h-[calc(100vh-80px)] rounded-2xl border border-dark-4 p-4">

            <MessageBox
              room={room!}
              chatId={chatId as string}
              currentUser={currentUser!}
              // otherUser={otherUser!}
              key={chatId as string}
            />
          </main>
        </ChatRoomProvider>
      </ChatClientProvider>
    ) : (
      <Loader variant="purple" />
    )

  )
}

export default ChatPage

// have to see chatgpt solution