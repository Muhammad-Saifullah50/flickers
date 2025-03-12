import { getPostById } from "@/actions/post.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UnsaveBtn from "./UnsaveBtn";
import { getCurrentUserFromDb } from "@/actions/user.actions";
import { getFlickById } from "@/actions/flick.actions";
type SavedPostFlickCardProps = {
    postId?: string;
    flickId?: string;
    isFlick?: boolean;
    saveId: string;
};

const SavedPostFlickCard = async ({ postId, isFlick, flickId, saveId }: SavedPostFlickCardProps) => {
    let post = null;
    let flick = null;

    if (isFlick && flickId) {
        flick = await getFlickById(flickId!)
    }

    if (postId) {
        post = await getPostById(postId!)
    }




    const isVideo = post?.assets.some((item) =>
        item.endsWith(".mp4") ||
        item.endsWith(".avi") ||
        item.endsWith(".webm") ||
        item.endsWith(".ogg")
    );

    if (!post && !flick) return null;
    return flickId ? (
        <div className="relative">

            <UnsaveBtn saveId={saveId} />
            <Link href={`/flicks/${flick?.id}`}>
                <video
                    src={flick.videoUrl}
                    controls={false}
                    className="rounded-3xl w-[200px] h-[200px]"
                />
            </Link>
        </div>

    ) : (
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
                <div className="relative">

                    <UnsaveBtn saveId={saveId} />
                    <Link href={`/posts/${post?.id}`} className="relative">
                        <Image
                            src={post?.assets[0]}
                            width={500}
                            height={500}
                            alt={post?.altText}
                            blurDataURL={`/_next/image?url=${post.assets[0]}&w=16&q=1`}
                            placeholder='blur'
                            className="rounded-3xl w-[250px] h-[250px]  "
                        />
                    </Link>
                </div>
            )}
        </>
    );
};

export default SavedPostFlickCard;
