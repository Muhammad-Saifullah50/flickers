'use server'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromDb } from "./user.actions";
import { revalidatePath } from "next/cache";

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

export const getFeedPosts = async (userhasFollowed: boolean) => {
    try {

        if (userhasFollowed) {
            const currUser = await getCurrentUserFromDb();
            // followed people posts
            const posts = await prisma.post.findMany({
                where: {
                    // correct typeerror
                    //@ts-ignore
                    authorId: currUser.following.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: true,
                    comments: true
                }
            });

            return posts
        }

        if (!userhasFollowed) {
            const posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: true
                }
            });

            return posts
        }

    } catch (error) {
        console.error('Error fetching post feed on server:', error);
    }
}

export const updatePost = async (postId: string, data: createPostParams) => {
    try {
        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                caption: data.caption,
                altText: data.altText,
                assets: data.assets,
                hashtags: data.hashtags || ''
            },
        })

        return post
    } catch (error) {
        console.error('Error updating post on server:', error);
    }
}

export const deletePost = async (postId: string) => {

    try {
        await prisma.post.delete({
            where: {
                id: postId
            }
        });
        revalidatePath('/')
    } catch (error) {
        console.error('Error deleting post on server:', error);
    }
}