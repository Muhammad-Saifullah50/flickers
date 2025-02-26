'use client'
import { Chat, User } from "@prisma/client"
import ChatListItem from "./ChatListItem"
import { useEffect, useState } from "react";
import { getChatList } from "@/actions/chat.actions";
import ChatListItemSkeleton from "./skeletons/ChatListItemSkeleton";
import { Room } from "@ably/chat";

interface ChatListProps {
  currentUser: User;
  otherUser?: User;
  room?: Room;
}


const ChatsList = ({ room, otherUser, currentUser }: ChatListProps) => {

  const [chatList, setchatList] = useState<(Chat & { users: User[] })[]>();
  const [loading, setloading] = useState(false);
  const [typing, setTyping] = useState<{[key: string]: boolean}>({});
  const [isOnline, setIsOnline] = useState<{[key: string]: boolean}>({});	


  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const list = await getChatList();
        setchatList(list);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {

    if (!room?.typing || !otherUser) return;
    const { unsubscribe } = room?.typing.subscribe((event) => {

      setTyping((prev) => ({
        ...prev,
        [room.roomId]: event.currentlyTyping.has(otherUser?.id),
      }));

    });

    return () => {
      unsubscribe();
    };

  }, [room]);

  useEffect(() => {
    if (!room?.presence || !otherUser) return;

    const checkPresence = async () => {
      const members = await room?.presence.get();
      setIsOnline((prev) => ({
        ...prev,
        [room.roomId]: members.some((member) => member.clientId === otherUser.id),
      }));

    };
    checkPresence();
    
    const { unsubscribe } = room.presence.subscribe((event) => {

       if (event.action === 'enter' && event.clientId === otherUser.id) {
                setIsOnline((prev) => ({
                    ...prev,
                    [room.roomId]: event.action === 'enter' && event.clientId === otherUser.id,
                }));
            }
            else if (event.action === 'leave') {
                setIsOnline((prev) => ({
                    ...prev,
                    [room.roomId]: false
                }));
            }
 
    });
    return () => {
      unsubscribe();
    };

  }, [room, otherUser]);

  return loading ? (
    <ChatListItemSkeleton />
  ) : (
    <section >
      <ul>
        {chatList?.length === 0 ? (
          <p>No Chats to show</p>
        ) : (
          chatList?.map((chat) => {

            const otherUser = chat.users.find((user: User) => user.id !== currentUser?.id);


            if (!otherUser) return null;
            return (
              <ChatListItem
                key={chat.id}
                chatName={otherUser?.name}
                //  info the other users username
                chatUsername={otherUser?.username || `@${otherUser?.name.toLowerCase().replace(' ', '')}`}
                chatId={chat.id}
                //  info the other users image
                chatImage={otherUser?.image}
                isOnline={isOnline[chat.id] || false}
                typing={typing[chat.id] || false}
              />

            )
          })
        )}
      </ul>
    </section>
  )
}

export default ChatsList

