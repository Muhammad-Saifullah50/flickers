'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface createCommentParams {
    comment: string,
    postId: string,
    authorId: string
    parentCommentId?: string
    isNestedComment?: boolean
}
export const createComment = async (commentData: createCommentParams) => {

    try {

        const uploadedComment = await prisma.comment.create({
            data: {
                content: commentData.comment,
                postId: commentData.postId,
                authorId: commentData.authorId,
                parentCommentId: commentData.parentCommentId || null,
            }
        });
        revalidatePath(`/post/${commentData.postId}`)
        return uploadedComment

    } catch (error) {
        console.error('error creating comment on server', error);
    }

}