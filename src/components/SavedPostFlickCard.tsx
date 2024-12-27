import { getPostById } from "@/actions/post.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type SavedPostFlickCardProps = {
    postId?: string;
    flickId?: string;
    isFlick?: boolean;
};

const SavedPostCard = async ({ postId,flickId, isFlick }: SavedPostFlickCardProps) => {

    const post = await getPostById(postId!);

    const isVideo = post?.assets.some((item) =>
        item.endsWith(".mp4") ||
        item.endsWith(".avi") ||
        item.endsWith(".webm") ||
        item.endsWith(".ogg")
    );

    return (
        <>
            {isVideo ? (
                <Link href={`/posts/${post?.id}`}>
                    <video
                        src={post?.assets[0]}
                        controls={false}
                        className="rounded-3xl w-[200px] h-[200px]"
                    />
                </Link>

            ) : (
                <Link href={`/posts/${post?.id}`}>
                    <Image
                        src={post?.assets[0]!}
                        width={500}
                        height={500}
                        alt={post?.altText!}
                        className="rounded-3xl w-[200px] h-[200px]"
                    />
                </Link>
            )}
        </>
    );
};

export default SavedPostCard;

// have to make it reusable for flicks