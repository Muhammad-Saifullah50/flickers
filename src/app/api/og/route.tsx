import { getPostById } from "@/actions/post.actions";
import { determineAssetType } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";

export const GET = async (request: NextRequest) => {

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json({
            message: "Post ID or Flick Id is required",
        }, {
            status: 400,
        })
    }

 

        const post = await getPostById(postId);

        const firstAssetUrl = post?.assets[0];
        const firstAssetType = determineAssetType(firstAssetUrl as string);

        if (firstAssetType === "image") {
            return new ImageResponse(
                <img src={firstAssetUrl}  width="100%" height="100%" style={{ maxWidth: '1200px', maxHeight: '630px' }} />
            )
        } else {
            return new ImageResponse(
                <video src={firstAssetUrl} width="100%" height="100%" style={{ maxWidth: '1200px', maxHeight: '630px' }} />
            )
        }
}




