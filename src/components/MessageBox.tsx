'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SendMessageForm from '@/components/forms/SendMessageForm'
import { User } from '@prisma/client'
import { getChatById } from '@/actions/chat.actions'
import Messages from './Messages'
import useSWR from 'swr';
import Loader from './Loader'
import { Message, OrderBy, PaginatedResult, Room } from '@ably/chat'


const MessageBox = ({ chatId, currentUser, otherUser, room }: {
    chatId: string,
    currentUser: User,
    otherUser: User,
    room: Room
}) => {


    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!room.messages) return;
        const fetchMessages = async () => {
            try {

                const historicalMessages = await room.messages.get({
                    limit: 10,

                });
                const reversedList = historicalMessages.items.slice().reverse();
                setMessages(reversedList);
            } catch (error) {
                console.error('Error fetching messages from ably:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMessages()
    }, [room]);


    useEffect(() => {
        if (!room.messages) return;
        room.attach()
        const { unsubscribe } = room.messages.subscribe((event) => {
            setMessages(prevMessages => [ ...prevMessages, event.message ]);
        });

        return () => {
            unsubscribe();
            room.detach()
        }
    }, [room.messages])

    return (
        <>
            <section className="flex justify-between items-center pb-4">
                <div className="flex gap-4 items-center">
                    <div>
                        <Image
                            src={otherUser?.image as string || '/icons/dummyuser.png'}
                            width={50}
                            height={50}
                            alt="chat image"
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <h2 className='text-white'>{otherUser?.name}</h2>
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
                    <Messages messages={messages} currUser={currentUser} />
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

