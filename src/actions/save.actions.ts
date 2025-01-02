'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { getCurrentUserFromDb } from "./user.actions";

export const savePost = async (userId: string, postId: string, isHomePage?: boolean) => {
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
            revalidatePath(isHomePage ? '/' : '/explore')
            return save
        }
        revalidatePath(isHomePage ? '/' : '/explore')
        return existingSave
    } catch (error) {
        console.error('error saving post on server', error)
    }
}

export const getSavedItems = async () => {
    try {
        const user = await getCurrentUserFromDb();

        const savedItems = await prisma.save.findMany({
            where: {
                userId: user?.id
            },
        });

        return savedItems
    } catch (error) {
console.error('error fetching saved items on server', error)    
    }
}