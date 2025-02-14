'use server';

import { prisma } from "@/lib/prisma";
import { MomentSchema } from "@/validations/momentSchema";
import { revalidatePath } from "next/cache";

interface createMomentParams {
    caption?: string;
    assets?: {
        url: string,
        duration: number
    }[];
    altText?: string;
    bgColor?: string;
    authorId: string;
    text?: string
}

export const getRecentMoments = async () => {
    const moments = await prisma.moment.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        }, include: {
            author: true,
            assets: true
        }
    });

    return moments;
}

export const createMoment = async (data: createMomentParams) => {
    const moment = await prisma.moment.create({
        data: {
            caption: data.caption,
            altText: data.altText,
            bgColor: data.bgColor,
            authorId: data.authorId,
            text: data.text,
            assets: {
                create: data.assets?.map(asset => ({
                    url: asset.url,
                    duration: asset.duration 
                }))
            }
        },
        include: {
            author: true,
        }
    })

    revalidatePath('/')
    return moment;
}

