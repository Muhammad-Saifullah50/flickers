'use server';

import { prisma } from "@/lib/prisma";

export const getTopCreators = async () => {
    try {
        const allCreators = await prisma.user.findMany({
         include:{
            posts: true,
            flick:true,
            followedBy: {
                include: {
                    follower: true
                }
            },
            following: {
                include: {
                    following: true
                }
            }
         },
           take: 10
        });

        const topCreators = allCreators.map((creator) => (
            {
                ...creator,
                totalItems: creator.posts.length + creator.flick.length
            }
        )).sort((a, b) => b.totalItems - a.totalItems);
        
        return topCreators
    } catch (error) {
        console.error('error fetching top creators on server')
    }
}