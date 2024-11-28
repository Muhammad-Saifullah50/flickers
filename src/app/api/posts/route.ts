import { auth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {

    const body = await request.json();
    const { assets: files }: { assets: File[] } = body;
    try {

        const session = await auth();

        // Upload all files to Cloudinary
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const uploadedUrls = await Promise.all(uploadPromises);

        // Update the form data with Cloudinary URLs
        const formData = {
            ...body,
            assets: uploadedUrls,
        };

        // Here you can make your API call to save the post
console.log(uploadedUrls)
        const post = await prisma.post.create({
            data: {
                caption: formData.caption,
                likes: 0,
                shares: 0,
                authorId: session?.user?.id!,
                assets: uploadedUrls,
                altText: formData.altText
            }
        })

        return NextResponse.json({ message: 'Post created successfully', data:post, status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ message: 'Failed to create post', error:error, status: 500 });
    }

}