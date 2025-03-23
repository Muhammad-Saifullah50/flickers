'use client';
import { getChatById, getChatList } from "@/actions/chat.actions";
import { getCurrentUserFromDb, getDbUserById } from "@/actions/user.actions";
import ChatsList from "@/components/ChatsList";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import MessageBox from "@/components/MessageBox";
import { ChatClient, ChatClientProvider, ChatRoomProvider, Room } from '@ably/chat';
import { User } from "@prisma/client";
import * as Ably from 'ably';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import NotFoundUI from "@/components/NotFoundUI";
import { set } from "zod";
import ErrorUI from "@/components/ErrorUI";



const ChatPage = () => {

  const { chatId } = useParams();
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [otherUser, setOtherUser] = useState<User | null>();
  const [room, setRoom] = useState<Room>();
  const [chatClient, setChatClient] = useState<ChatClient>();
  const [chatNotFound, setChatNotFound] = useState(false);
  const [hasError, setHasError] = useState(false)

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currUser = await getCurrentUserFromDb();
        setCurrentUser(currUser);

        const chat = await getChatById(chatId as string);

        if (!chat) {
          setChatNotFound(true);
          return;
        }

        const otherUserId = chat?.users.find((user) => user.id !== currUser?.id)?.id;
        const fetchedOtherUser = await getDbUserById(otherUserId!);
        setOtherUser(fetchedOtherUser);
      } catch {
        setHasError(true)
      }

    };

    fetchUser()
  }, [chatId])

  useEffect(() => {
    try {

      if (!currentUser || !otherUser) return;

      const realtimeClient = new Ably.Realtime({
        clientId: currentUser.id,
        authUrl: '/api/ably',
        authParams: { clientId: currentUser?.id! }
      });

      const client = new ChatClient(realtimeClient);

      setChatClient(client);
    } catch {
      setHasError(true)

    }
  }, [currentUser, otherUser]);



  useEffect(() => {

    if (!chatClient || !chatId) return;

    const getRoom = async () => {

      try {

        const typing = { timeoutMs: 3000 };
        const presence = { enter: true, leave: true }



        const fetchedRoom = await chatClient?.rooms?.get(chatId as string, { typing, presence });
        if (!fetchedRoom) console.error('Room not found')

        await fetchedRoom.attach()
        setRoom(fetchedRoom);
      } catch {
        setHasError(true)
      }


    }
    getRoom()
  }, [chatClient, chatId]);


  return (

    <main className=" gap-4 relative flex">
      {chatNotFound ? (
        <div className="w-full flex items-center justify-center h-[90vh]">
          <NotFoundUI />
        </div>
      ) : hasError ? (
        <div className="w-full flex items-center justify-center h-[90vh]">

        <ErrorUI reset={() => router.refresh()}/>
        </div>
      ) : (
        <>
          <section className="hidden lg:flex flex-col gap-4 w-2/5">
            <Heading text='All Chats' icon='/icons/chats-white.svg' />

            {room?.typing && <ChatsList
              otherUser={otherUser}
              room={room!}
              currentUser={currentUser!}
              chatId={chatId as string}
            />}
          </section>

          <Sheet >
            <SheetTrigger className="lg:hidden absolute top-28">
              <div className="flex items-center gap-2 bg-dark-4 rounded-full p-2 relative z-50">

                <Image
                  src='/icons/arrow.svg'
                  width={30}
                  height={30}
                  alt="arrow"
                />
              </div>
            </SheetTrigger>
            <SheetContent className="lg:hidden w-[400px] bg-dark-2 border-dark-4" side={"left"}>
              <SheetTitle className="sr-only">All Chats</SheetTitle>
              <SheetDescription className="sr-only">sheet</SheetDescription>

              <Heading text='All Chats' icon='/icons/chats-white.svg' className="pb-6" />

              {room?.typing && <ChatsList
                otherUser={otherUser}
                room={room!}
                currentUser={currentUser!}
                chatId={chatId as string}
              />}
            </SheetContent>
          </Sheet>

          <section className="flex h-full lg:w-3/5 w-full">
            <main className="flex flex-col  w-full bg-dark-2 max-sm:h-[80vh]   sm:h-[calc(100vh-50px)] rounded-2xl border border-dark-4 p-4 ">
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
        </>
      )}
    </main>
  )

}

export default ChatPage

