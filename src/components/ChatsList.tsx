'use client'
import { Chat, User } from "@prisma/client"
import ChatListItem from "./ChatListItem"
import { getCurrentUserFromDb } from "@/actions/user.actions";
import { useEffect, useState } from "react";
import { getChatList } from "@/actions/chat.actions";
import ChatListItemSkeleton from "./skeletons/ChatListItemSkeleton";
import { Room } from "@ably/chat";

interface ChatListProps {
  currentUser: User;
  otherUser: User;
  room: Room;
}


const ChatsList = ({room, otherUser, currentUser}: ChatListProps) => {

  const [chatList, setchatList] = useState<(Chat & { users: User[] })[]>();
  const [loading, setloading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);


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

          if (!room?.typing) return;
          const { unsubscribe } = room?.typing.subscribe((event) => {
              if (event.currentlyTyping.has(otherUser.id)) {
                  setTyping(true);
              } else {
                  setTyping(false);
              }
  
          });
  
          return () => {
              unsubscribe();
          };
  
      }, [room]);
  
      useEffect(() => {
          if (!room?.presence || !otherUser) return;
  
          room.presence.enter();
          const checkPresence = async () => {
             const members = await room?.presence.get();
             setIsOnline(members.some(member => member.clientId === otherUser.id));
  
          };
          checkPresence();
          const { unsubscribe } = room.presence.subscribe((event) => {
  
              if (event.action === 'enter' && event.clientId === otherUser.id) {
                  setIsOnline(true);
              }
              else if (event.action === 'leave') {
                  setIsOnline(false);
              }
          });
          return () => {
              unsubscribe();
          };
  
      }, [room, otherUser]);

  return loading ? (
    <ChatListItemSkeleton />
  ) : (
    <section>
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
                isOnline={isOnline}
                typing={typing}
              />

            )
          })
        )}
      </ul>
    </section>
  )
}

export default ChatsList