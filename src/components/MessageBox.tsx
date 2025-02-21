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


    const [messages, setMessages] = useState<PaginatedResult<Message>>();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!room.messages) return;
        const fetchMessages = async () => {
            try {

                const historicalMessages = await room.messages.get({
                    limit: 10,
                    
                });

                setMessages(historicalMessages)
            } catch (error) {
                console.error('Error fetching messages from ably:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMessages()
    }, [room]);

    const {unsubscribe} = room.messages.subscribe((event) => {
        setMessages(event.message);
      });
      // have to correct the real trime 

    const reversedMessages = messages?.items.slice().reverse();

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

                ) : messages ?  (
                    <Messages messages={reversedMessages} currUser={currentUser} />
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

// some issue the app is infiniteley requesting to the server'
// maybe i will have to use web soickets for thsi chat app
