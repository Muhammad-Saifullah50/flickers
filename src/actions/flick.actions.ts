'use server';

import { prisma } from "@/lib/prisma";
import { getCurrentUserFromDb } from "./user.actions";
import { revalidatePath } from "next/cache";

interface createFlickParams {
    caption: string;
    altText: string;
    videoUrl: string;
    hashtags?: string
}

export const createFlick = async (data: createFlickParams) => {
    try {
        const user = await getCurrentUserFromDb();
        const flick = await prisma.flick.create({
            data: {
                caption: data.caption,
                altText: data.altText,
                videoUrl: data.videoUrl,
                authorId: user.id,
                hashtags: data.hashtags || ''
            },
            include: {
                author: true
            }
        });

        return flick
    } catch (error) {
        console.error('Error creating flick on server:', error);
    }
}

export const updateFlick = async (flickId: string, data: createFlickParams) => {
    try {
        const flick = await prisma.flick.update({
            where: {
                id: flickId
            },
            data: {
                caption: data.caption,
                altText: data.altText,
                videoUrl: data.videoUrl,
                hashtags: data.hashtags || ''
            },
        })

        return flick
    } catch (error) {
        console.error('Error updating flick on server:', error);
    }
}


export const getFlicksByQuery = async (query?: string) => {

    try {
        const flicks = await prisma.flick.findMany({
            where: {
                OR: [
                    { caption: { contains: query } },
                    { hashtags: { contains: query } },
                    { author: { name: { contains: query } } },
                    { author: { username: { contains: query } } }
                ]
            },
            include: {
                author: true,
                likes: true
            }
        });

        return flicks
    } catch (error) {
        console.error('Error getting flicks on server:', error);
    }
}

export const getAllFlicks = async () => {
    try {
        const flicks = await prisma.flick.findMany({
            include: {
                author: true,
                likes: true
            }
        });

        return flicks
    } catch (error) {
        console.error('Error getting all flicks on server:', error);
    }
}

export const getfollowingFlicks = async () => {
    try {
        const currrUser = await getCurrentUserFromDb();

        const flicks = await prisma.flick.findMany({
            where: {
                authorId: {
                    in: currrUser?.following.map((user) => user.id)
                }
            },
            include: {
                author: true,
                likes: true
            }
        });

        return flicks
    } catch (error) {
        console.error('Error getting following flicks on server:', error);
    }
}

export const getPopularFlicks = async () => {
    try {
        const flicks = await prisma.flick.findMany({
            orderBy: {
                likes: {
                    _count: 'desc'
                }
            },
            take: 10,
            include: {
                author: true,
                likes: true
            }

        });

        return flicks
    } catch (error) {
        console.error('Error getting popular flicks on server:', error);
    }
}
export const getMostViewedFlicks = async () => {
    try {
        const flicks = await prisma.flick.findMany({
            orderBy: {
                plays: 'desc',
            },
            take: 10,
            include: {
                author: true,
                likes: true
            }
        });

        return flicks
    } catch (error) {
        console.error('Error getting popular flicks on server:', error);
    }
}

export const getFlickById = async (flickId: string) => {
    try {
        const flick = await prisma.flick.findUnique({
            where: {
                id: flickId
            },
            include: {
                author: true,
                saves: true
            }
        });


        return flick
    } catch (error) {
        console.error('Error getting flick by id on server:', error);
        throw error

    }
}

export const getPrevAndNextFlicks = async (flickId: string) => {
    try {

        const prevFlick = await prisma.flick.findFirst({
            where: {
                id: {
                    lt: flickId
                }
            },
            orderBy: {
                id: 'desc'
            },
            include: {
                author: true,
                saves: true

            }
        });

        const nextFlick = await prisma.flick.findFirst({
            where: {
                id: {
                    gt: flickId
                }
            },
            include: {
                author: true,
                saves: true
            }
        });

        console.log(prevFlick?.id, nextFlick?.id)
        return [prevFlick, nextFlick]
    } catch (error) {
        console.error('Error getting prev and next flicks on server:', error);

    }
}

export const getFlicksByUserId = async (userId: string) => {
    try {
        const flicks = await prisma.flick.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: true,
                likes: true
            }
        });
        return flicks

    } catch (error) {
        console.error('Error getting flicks by user id on server:', error);
    }
}

export const getAllFlickIds = async () => {
    try {
        const posts = await prisma.flick.findMany({
            select: {
                id: true
            }
        });

        const flickIdsArray = posts.map(post => post.id);
        return flickIdsArray
    } catch (error) {
        console.error('error fetching all flick ids', error)
    }
}

export const saveFlick = async (userId: string, flickId: string, pathname: string) => {
    try {

        const existingSave = await prisma.save.findFirst({
            where: {
                userId: userId,
                flickId: flickId
            }
        })

        if (!existingSave) {

            const save = await prisma.save.create({
                data: {
                    userId,
                    flickId
                }
            });

            revalidatePath(pathname)
            return save
        }
        revalidatePath(pathname)
        return existingSave
    } catch (error) {
        console.error('error saving flick on server', error)
    }
}