'use server'

import { prisma } from "@/lib/prisma"

export const savePost = async (userId: string, postId: string) => {
    try {

        const existingSave = await prisma.save.findFirst({
            where: {
                userId: userId,
                postId: postId
            }
        })

        if (!existingSave) {

            const save = await prisma.save.create({
                data: {
                    userId,
                    postId
                }
            });

            return save
        }

        return existingSave
    } catch (error) {
        console.error('error saving post on server', error)
    }
} 