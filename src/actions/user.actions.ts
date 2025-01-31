'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const getCurrentUserFromDb = async () => {
    try {

        const session = await auth();
        const email = session?.user?.email
        if (!email) {
            throw new Error('Not authenticated');
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
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
            }
        });

        if (!user) return null;
        return user;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error
    }
}

export const getDbUserById = async (id: string) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user?.username) {
            await prisma.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    username: `@${user?.name.toLowerCase().replace(' ', '')}`
                }
            })
        }
        return user
    } catch (error) {
        console.error('Error fetching current user on server:', error);
    }
}

export const getDbUserByIdWithDetails = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                followedBy: true,
                following: true,
                posts: true
            }
        })

        return user
    } catch (error) {
        console.error('Error fetching current user on server:', error);
        throw error

    }
}

export const getAllUsers = async () => {

    try {
        const users = await prisma.user.findMany({
            include: {
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
            }
        });
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error

    }
}

type updateProfileParams = {
    name: string;
    username: string;
    email: string;
    bio: string | undefined;
    image: string | null;
}
export const updateProfile = async (data: updateProfileParams, userId: string) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: data.name,
                username: data.username,
                email: data.email,
                bio: data.bio,
                image: data.image
            }
        });
        revalidatePath('/settings')
        return user;

    } catch (error) {
        console.error('Error updating profile:', error);

    }
}
