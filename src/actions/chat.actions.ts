'use server'

import { prisma } from "@/lib/prisma"
import { getCurrentUserFromDb } from "./user.actions"

export const getChatList = async () => {
    try {

        const user = await getCurrentUserFromDb();

        const chatList = await prisma.user.findMany({
            where: {
                email: user?.email
            },
            select: {
                chats: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return chatList
    } catch (error) {
        console.error('Error fetching chat list on server:', error)
    }
} 