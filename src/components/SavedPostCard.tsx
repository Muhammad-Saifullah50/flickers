import { getPostById } from "@/actions/post.actions";
import Image from "next/image";
import Link from "next/link";
import UnsaveBtn from "./UnsaveBtn";
type SavedPostCardProps = {
    postId?: string;
    saveId: string;
};

const SavedPostCard = async ({ postId, saveId }: SavedPostCardProps) => {
    let post = null;

    if (postId) {
        post = await getPostById(postId!)
    }


    const isVideo = post?.assets.some((item) =>
        item.endsWith(".mp4") ||
        item.endsWith(".avi") ||
        item.endsWith(".webm") ||
        item.endsWith(".ogg")
    );

    if (!post) return null;
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

export default SavedPostCard;
