'use server'

import { auth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary'
import { prisma } from '@/lib/prisma';
import { PostSchema } from '@/validations/postSchema';
import { z } from 'zod';
export const CreatePost = async (postData: z.infer<typeof PostSchema>, files: File[]) => {
    try {

        const session = await auth();
        // Upload all files to Cloudinary
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const uploadedUrls = await Promise.all(uploadPromises);

        // Update the form data with Cloudinary URLs
        const formData = {
            ...postData,
            assets: uploadedUrls,
        };

        // Here you can make your API call to save the post

        const asset = await prisma.asset.createMany({
            data: formData.assets.map((url) => ({
                url: url,
                altText: postData.altText
            }))
        })
        const post = await prisma.post.create({
            data: {
                caption: formData.caption,
                likes: 0,
                shares: 0,
                authorId: session?.user?.id,
                author: {
                    connect: {
                        email: session?.user?.email!
                    }
                }

            }
        })
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

