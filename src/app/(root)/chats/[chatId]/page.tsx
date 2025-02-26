'use client';
import { getChatById, getChatList } from "@/actions/chat.actions";
import { getCurrentUserFromDb, getDbUserById } from "@/actions/user.actions";
import ChatsList from "@/components/ChatsList";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import MessageBox from "@/components/MessageBox";
import ChatListItemSkeleton from "@/components/skeletons/ChatListItemSkeleton";
import { ChatClient, ChatClientProvider, ChatRoomProvider, Room } from '@ably/chat';
import { User } from "@prisma/client";
import * as Ably from 'ably';
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


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
  }, [chatId])

  useEffect(() => {
    if (!currentUser || !otherUser) return;

    const realtimeClient = new Ably.Realtime({
      clientId: currentUser.id,
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
      const presence = { enter: true, leave: true }



      const fetchedRoom = await chatClient?.rooms?.get(chatId as string, { typing, presence });
      if (!fetchedRoom) console.error('Room not found')

      await fetchedRoom.attach()
      setRoom(fetchedRoom);


    }
    getRoom()
  }, [chatClient, chatId]);


  return (

    <main className="flex gap-4 ">
      <section className="flex flex-col gap-4 w-2/5">
        <Heading text='All Chats' icon='/icons/chats-white.svg' />

        {room?.typing && <ChatsList
          otherUser={otherUser}
          room={room!}
          currentUser={currentUser!}
          chatId={chatId as string}
        />}
      </section>

      <section className="flex h-full w-3/5">
        <main className="flex flex-col  w-full bg-dark-2 h-[calc(100vh-80px)] rounded-2xl border border-dark-4 p-4">
          {
            (chatClient && room && currentUser && otherUser) ? (

              <ChatClientProvider client={chatClient}>

                <ChatRoomProvider id={room?.roomId}>

                  <MessageBox
                    room={room!}
                    currentUser={currentUser}
                    otherUser={otherUser}
                    key={chatId as string}
                    chatId={chatId as string}
                  />
                </ChatRoomProvider>
              </ChatClientProvider>
            ) : (
              <Loader variant="purple" />
            )

          }
        </main>
      </section>
    </main>
  )

}

export default ChatPage

