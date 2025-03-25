'use server'

import { prisma } from "@/lib/prisma";
import { getCurrentUserFromDb } from "./user.actions";
import { revalidatePath } from "next/cache";
import { Post, User } from "@prisma/client";
import { redirect } from "next/navigation";

interface createPostParams {
    caption: string;
    altText: string;
    assets: string[];
    hashtags?: string
}

export const createPost = async (data: createPostParams) => {
    try {
        const user = await getCurrentUserFromDb();
        const post = await prisma.post.create({
            data: {
                caption: data.caption,
                altText: data.altText,
                shares: 0,
                assets: data.assets,
                authorId: user?.id!,
                hashtags: data.hashtags || ''
            },
            include: {
                author: true
            }
        });

        revalidatePath('/');
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
                saves: true,
                likes: true
            }
        })

        return post
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error

    }
}

export const getinitialFeedPosts = async (userhasFollowed: boolean) => {
    try {

        if (userhasFollowed) {
            const currUser = await getCurrentUserFromDb();
            // followed people posts
            const posts = await prisma.post.findMany({
                where: {
                    // correct typeerror
                    //@ts-expect-error have to correct this 
                    authorId: currUser.following.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: true,
                    comments: true,
                    saves: true,
                    likes: true
                },
                take: 2
            });

            return posts
        }

        if (!userhasFollowed) {
            const posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: true,
                    saves: true,
                    likes: true,
                    comments: true
                },
                take: 2
            });

            return posts
        }

    } catch (error) {
        console.error('Error fetching post feed on server:', error);
        throw error

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

export const getPopularTodayPostsAndFlicks = async () => {
    try {

        const posts = await prisma.post.findMany({
            orderBy: {
                likes: {
                    _count: 'desc'
                }
            },
            include: {
                author: true
            },
            take: 5
        });

        const flicks = await prisma.flick.findMany({
            orderBy: {
                likes: {
                    _count: 'desc'
                }
            },
            include: {
                author: true
            },
            take: 5
        })

        return [...posts, ...flicks];
    } catch (error) {
        console.error('error getting popuklar posts and reels', error)
        throw error

    }
}

export const getPostsandFlicksByHashtags = async (query: string) => {
    try {


        const posts = await prisma.post.findMany({
            where: {
                hashtags: {
                    contains: query
                }
            },
            include: {
                author: true
            },

        });

        const flicks = await prisma.flick.findMany({
            where: {
                hashtags: {
                    contains: query
                }
            },
            include: {
                author: true
            },
            take: 5
        });

        return [...posts, ...flicks]
    } catch (error) {
        console.error('error fetching by hashtags', error)
        throw error

    }
}

export const getMoreUserPosts = async (userId: string, postId: string) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                id: { not: postId },
                authorId: userId
            },
            include: {
                author: true
            }
        });
        return posts
    } catch (error) {
        console.error('error fetching more user posts', error)

    }
}
export const getRelatedOrMoreUserOrLatestPosts = async (post: Post) => {
    // this function will search for related posts 
    // if no related posts are found it will return more posts by the same author
    // if no more posts by the author are found it will return the latest posts

    let posts: (Post & { author: User })[] | undefined;
    try {
        posts = await prisma.post.findMany({

            where: {
                id: { not: post.id },
                OR: [
                    {
                        hashtags: {
                            contains: post.hashtags || ''
                        }
                    },
                    {
                        caption: {
                            contains: post.caption
                        }
                    },
                    {
                        altText: {
                            contains: post.altText
                        }
                    }
                ]

            },
            include: {
                author: true
            },
            take: 4
        });
        if (posts.length === 0) {
            posts = await getMoreUserPosts(post.authorId, post.id)
            return posts
        }
        if (posts?.length === 0) {
            posts = await getFeedPosts(false)

            return posts
        }
        return posts
    } catch (error) {
        console.error('error fetching related posts', error)
        return []
    }
}

export const getTopPostsByUser = async (userId: string) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            orderBy: {
                likes: {
                    _count: 'desc'
                }
            },
            include: {
                author: true
            }
        }
        );
        return posts
    } catch (error) {
        console.error('error fetching top posts by user', error)

    }
}

export const getPostsByUserId = async (userId: string) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: true
            },
            take: 10
        }
        );
        return posts
    } catch (error) {
        console.error('error fetching posts by user', error)
    }
}

export const getAllPostIds = async () => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true
            }
        });

        const postIdsArray = posts.map(post => post.id);
        return postIdsArray
    } catch (error) {
        console.error('error fetching all post ids', error)
    }
}

export const updatePostShares = async (postId: string, currentShares: number) => {
    try {
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                shares: currentShares + 1
            }
        });

        revalidatePath(`/posts/${postId}`)
    } catch (error) {
        console.error('Error updating shares on post', error)
    }
}

export const getPaginatedPosts = async (page: number | null, limit: number) => {
    try {
        if (page === null ) return;
        
        const posts = await prisma.post.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: true,
                saves: true,
                likes: true,
                comments: true
            }

        });
        const nextPage = posts.length < limit ? null : page + 1
        return { posts, nextPage }
    } catch (error) {
        console.error('Error fetching paginated posts on server', error)
        return { posts: [], nextPage: null }
    }
}