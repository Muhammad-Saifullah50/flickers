import { getPostById } from "@/actions/post.actions";
import { determineAssetType } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const GET = async (request: NextRequest) => {

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json({
            message: "Post ID is required",
        }, {
            status: 400,
        })
    }

    const post = await getPostById(postId);

    const firstImageUrl = post?.assets.filter((asset) => determineAssetType(asset) === 'image')[0];

    if (!firstImageUrl) {
        return new ImageResponse(
            <div 

            tw="flex flex-col justify-center items-center w-full h-full bg-white text-black"
            >
            {post?.caption}
            </div>
        )
    }


    return new ImageResponse(
    <img src={firstImageUrl} width={100} height={100} alt={post?.caption} />
)}
    
