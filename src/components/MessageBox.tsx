'use client'
import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import SendMessageForm from '@/components/forms/SendMessageForm'
import { User } from '@prisma/client'
import Messages from './Messages'
import Loader from './Loader'
import { Message, Room, useTyping } from '@ably/chat'


const MessageBox = ({ chatId, currentUser, otherUser, room }: {
    chatId: string,
    currentUser: User,
    otherUser: User,
    room: Room
}) => {


    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [typing, setTyping] = useState(false);



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
        if (!room) return;
        room.attach()
        const { unsubscribe } = room.messages.subscribe((event) => {
            setMessages(prevMessages => [...prevMessages, event.message]);
        });

        return () => {
            unsubscribe();
            room.detach()
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

    }, [room])




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
                    {typing && <p className='text-xs text-purple-primary font-semibold'>typing...</p>}
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
                    room={room} setTyping={setTyping} />
            </section>
        </>
    )
}

export default MessageBox

