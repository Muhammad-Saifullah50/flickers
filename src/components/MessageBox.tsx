'use client'
import Image from 'next/image'
import React from 'react'
import SendMessageForm from '@/components/forms/SendMessageForm'
import { User } from '@prisma/client'
import { getChatById } from '@/actions/chat.actions'
import Messages from './Messages'
import useSWR from 'swr';
import Loader from './Loader'



const MessageBox = ({ chatId, currentUser, otherUser }: {
    chatId: string,
    currentUser: User,
    otherUser: User
}) => {

    const fetcher = async () => {
        const chat = await getChatById(chatId);
        return chat?.messages
    }

    const { data: messages, isLoading, error,  } = useSWR(`chat-${chatId}`, fetcher, {
        revalidateIfStale: true,
        refreshInterval: 5,
        });
    return (
        <>
            <section className="flex justify-between items-center pb-4">
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
                ) : error ? (
                    <p>Error</p>
                ) : messages ? (
                    <Messages messages={messages} currUser={currentUser} />
                ) : null}
            </section>

            <section>
                
                <SendMessageForm chatId={chatId} senderId={currentUser?.id} />
            </section>
        </>
    )
}

export default MessageBox