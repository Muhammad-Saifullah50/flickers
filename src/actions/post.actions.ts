'use server'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface createPostParams {
    caption: string;
    altText: string;
    assets: string[];
    authorId: string;
    hashtags?: string
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
                hashtags: data.hashtags || ''
            },
            include: {
                author: true
            }
        });

        return post
    } catch (error) {
        console.error('Error creating post on server:', error);
    }
}

export const getPostById = async (id: string) => {

    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: true,
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        replies: {
                            orderBy: {
                                createdAt: 'desc'
                            }
                        }
                    }
                },
            }
        })

        return post
    } catch (error) {
        console.error('Error fetching post:', error);

    }
}