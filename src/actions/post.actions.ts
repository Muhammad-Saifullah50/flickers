'use server'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface createPostParams {
    caption: string;
    altText: string;
    assets: string[];
    authorId: string;
}

export const createPost = async (data: createPostParams) => {

    try {

        const post = await prisma.post.create({
            data: {
                caption: data.caption,
                altText: data.altText,
                likes: 0,
                shares: 0,
                assets: data.assets,
                authorId: data.authorId,
            },
            include: {
                author: true
            }
        });

        return post
    } catch (error) {
        console.log('error creating post', error);
    }
}

export const getPostById = async (id: string) => {

    try {
        const post = prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: true,
                comments: true
            }
        })

        return post
    } catch (error) {
        console.error('Error fetching post:', error);

    }
}