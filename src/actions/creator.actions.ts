'use client';

import { prisma } from "@/lib/prisma";

export const getTopCreators = async () => {
    try {
        const topCreators = await prisma.user.findMany({
            orderBy: {
                posts:{
                    _count: 'desc'
                },
                flick:{
                    _count: 'desc'
                }
            }
        })
    } catch (error) {
        console.error('error fetching top creators on server')
    }
}