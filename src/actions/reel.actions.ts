'use server';

import { prisma } from "@/lib/prisma";

interface createReelParams {
    caption: string;
    altText: string;
    videoUrl: string;
    authorId: string;
    hashtags?: string
}

export const createReel = async (data: createReelParams) => {
    try {
        const reel = await prisma.reel.create({
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

        return reel
    } catch (error) {
        console.error('Error creating reel on server:', error);
    }
}

export const updateReel = async (reelId: string, data: createReelParams) => {
    try {
        const reel = await prisma.reel.update({
            where: {
                id: reelId
            },
            data: {
                caption: data.caption,
                altText: data.altText,
                videoUrl: data.videoUrl,
                hashtags: data.hashtags || ''
            },
        })

        return reel
    } catch (error) {
        console.error('Error updating reel on server:', error);
    }
}
