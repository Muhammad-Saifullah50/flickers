import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()

        const post = await prisma.post.create({
            data: {
                caption: body.caption,
                altText: body.altText,
                likes: 0,
                shares: 0,
                assets: body.assets,
                authorId: body.authorId,
                hashtags: body.hashtags || ''
            },
            include: {
                author: true
            }
        });

        return NextResponse.json({
            message: 'Post created successfully', data: post, status: 201
        })
    } catch (error) {
        console.error('Error creating posts:', error);
        return NextResponse.json({ error: 'Failed to create post' ,  status: 500 });
    }
}