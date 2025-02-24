'use client'
import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import SendMessageForm from '@/components/forms/SendMessageForm'
import { User } from '@prisma/client'
import Messages from './Messages'
import Loader from './Loader'
import { Message, MessageEvents, Room, useTyping } from '@ably/chat'


const MessageBox = ({ chatId, currentUser, otherUser, room }: {
    chatId: string,
    currentUser: User,
    otherUser: User,
    room: Room
}) => {


    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [typing, setTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(false);



    useEffect(() => {
        if (!room) return;
        const fetchMessages = async () => {
            try {

                const historicalMessages = await room.messages.get({
                    limit: 100,

                });
                const reversedList = historicalMessages.items.slice().reverse();
                const reversedFilteredListByDeletions = reversedList.filter(message => !message.isDeleted) 
                setMessages(reversedFilteredListByDeletions);
            } catch (error) {
                console.error('Error fetching messages from ably:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMessages()
    }, [room]);

    // have to implenment pagination
    useEffect(() => {
        if (!room) return;
        const { unsubscribe } = room.messages.subscribe((event) => {

            switch (event.type) {
                case MessageEvents.Created:
                    setMessages(prevMessages => [...prevMessages, event.message]);
                    break;

                case MessageEvents.Deleted:

                  setMessages(prevMessages => prevMessages.filter(message => message.serial !== event.message.serial));

                case MessageEvents.Updated:
                   
                    setMessages(prevMessages => prevMessages.map(message => message.serial === event.message.serial ? event.message : message));
            }

        });

        return () => {
            unsubscribe();
        }
    }, [room]);

    useEffect(() => {
        if (!room) return;
        const { unsubscribe } = room.typing.subscribe((event) => {
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
        if (!room || !otherUser) return;

        room.presence.enter();
        const checkPresence = async () => {
            const members = await room.presence.get();
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


    return (
        <>
            <section className="flex justify-between items-center pb-4 ">

                <div className="flex gap-4 items-center">
                    <div>
                        <Image
                            src={otherUser?.image as string}
                            width={50}
                            height={50}
                            alt="chat image"
                            className="rounded-full"
                        />
                    </div>
                    <div className='flex flex-col gap-'>
                        <h2 className='text-white'>{otherUser?.name}</h2>
                        {typing ? (<p className='text-xs text-purple-primary font-semibold'>typing...</p>) : isOnline && !typing ? (
                            <p className='text-sm text-purple-secondary'>online</p>
                        ) : (null)}

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
                {isLoading ? (
                    <Loader variant="purple" />

                ) : messages ? (
                    <Messages
                        messages={messages}
                        currUser={currentUser}
                        room={room} />
                ) : null}
            </section>

            <section>

                <SendMessageForm
                    chatId={chatId} senderId={currentUser?.id}
                    room={room} />
            </section>
        </>
    )
}

export default MessageBox

