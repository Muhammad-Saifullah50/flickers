'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const followUser = async (userToFollowId: string,
    followerUserId: string) => {
    try {
        const follow = await prisma.follows.create({
            data: {
                followerId: followerUserId,
                followingId: userToFollowId
            }
        });

        revalidatePath(`/people`)
        return follow
    } catch (error) {
        console.error('Error following user on server:', error);
    }
}

export const unfollowUser = async (followId: string) => {

    try {
        await prisma.follows.delete({
            where: {
                id: followId
            }
        });

        revalidatePath(`/people`)
    } catch (error) {
        console.error('Error unfollowing user on server:', error);
    }

}