'use server'

import { prisma } from "@/lib/prisma"
import { getCurrentUserFromDb, getDbUserById } from "./user.actions"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


type createMessageParams = {
    message?: string,
    image?: string,
    chatId: string,
    senderId: string

}
export const getChatList = async () => {
    try {

        const user = await getCurrentUserFromDb();

        const chatList = await prisma.chat.findMany({
            where: {
                userIds: {
                    has: user?.id
                }
            },
            include: {
                users: true
            }
        })
        return chatList
    } catch (error) {
        console.error('Error fetching chat list on server:', error)
    }
}

export const createChat = async (currUserId: string, otherUserId: string) => {
    const otherUser = await getDbUserById(otherUserId);

    const existingChat = await prisma.chat.findFirst({
        where: {
            userIds: {
                hasEvery: [currUserId, otherUserId]
            }
        }
    })

    if (!existingChat) {

        const chat = await prisma.chat.create({
            data: {
                //@ts-expect-error
                name: otherUser.name!,
                image: otherUser?.image || '/icons/dummyuser.png',
                userIds: [currUserId, otherUserId],
                creatorId: currUserId
            }
        });

        //updating current user
        await prisma.user.update({
            where: {
                id: currUserId
            },
            data: {
                chatIds: {
                    push: chat.id
                }
            }
        });

        //updating other user
        await prisma.user.update({
            where: {
                id: otherUserId
            },
            data: {
                chatIds: {
                    push: chat.id
                }
            }
        });

        revalidatePath('/chats')
        return redirect(`/chats/${chat.id}`)
    };

    revalidatePath('/chats')
    return redirect(`/chats/${existingChat.id}`)

}

export const getChatById = async (chatId: string) => {
    try {

        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId
            },
            include: {
                messages: true,
                users: true
            }
        });


        return chat

    } catch (error) {
        console.error('Error fetching chat by id on server:', error)
    }
}

export const createMessage = async (data: createMessageParams) => {

    try {
        const message = await prisma.message.create({
            data: {
                body: data.message,
                chatId: data.chatId,
                senderId: data.senderId
            }
        });

        revalidatePath(`/chats`)
        revalidatePath(`/chats/${data.chatId}`)
        return message
    } catch (error) {
        console.error('Error creating message on server:', error)
    }
}