'use server';

import { prisma } from "@/lib/prisma";
import { MomentSchema } from "@/validations/momentSchema";
import { revalidatePath } from "next/cache";

interface createMomentParams {
    caption?: string;
    assets?: string[];
    altText?: string;
    bgColor?: string;
    authorId: string;
}

export const getRecentMoments = async () => {
    const moments = await prisma.moment.findMany({
        where:{
            createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        }
    });

    return moments;
}

export const createMoment = async (data: createMomentParams) => {
    const moment = await prisma.moment.create({
        data: {
            caption: data.caption,
            assets: data.assets || [],
            altText: data.altText,
            bgColor: data.bgColor,
            authorId: data.authorId
        },
        include: {
            author: true
        }
    })

    revalidatePath('/')
    return moment;
}

