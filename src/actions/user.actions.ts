'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const getCurrentUserFromDb = async (email: string) => {
    try {

        if (!email) {
            throw new Error('Not authenticated');
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
}

export const getDbUserById = async (id: string) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    } catch (error) {
        console.error('Error fetching current user on server:', error);
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

    }
}