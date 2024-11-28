'use server'

import { uploadToCloudinary } from '@/lib/cloudinary'
import { PostSchema } from '@/validations/postSchema';
import { z } from 'zod';
export const CreatePost = async (postData: z.infer<typeof PostSchema>, files: File[]) => {
    try {
        // Upload all files to Cloudinary
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const uploadedUrls = await Promise.all(uploadPromises);

        // Update the form data with Cloudinary URLs
        const formData = {
            ...postData,
            assets: uploadedUrls,
        };

        // Here you can make your API call to save the post
        console.log(formData, 'form data')

    } catch (error) {
        console.error('Error creating post:', error);
    }
}

