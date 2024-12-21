'use server';

import { prisma } from "@/lib/prisma";

interface createFlickParams {
    caption: string;
    altText: string;
    videoUrl: string;
    authorId: string;
    hashtags?: string
}

export const createFlick = async (data: createFlickParams) => {
    try {
        const flick = await prisma.flick.create({
            data: {
                caption: data.caption,
                altText: data.altText,
                likes: 0,
                videoUrl: data.videoUrl,
                authorId: data.authorId,
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
