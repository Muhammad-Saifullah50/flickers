'use server';

import { prisma } from "@/lib/prisma";

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

