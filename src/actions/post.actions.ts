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