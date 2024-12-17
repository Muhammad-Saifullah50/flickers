'use server'

import { prisma } from "@/lib/prisma"
import { getCurrentUserFromDb, getDbUserById } from "./user.actions"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
                name: otherUser?.name,
                userIds: [currUserId, otherUserId]
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
            }
        });

        return chat

    } catch (error) {
        console.error('Error fetching chat by id on server:', error)
    }
}