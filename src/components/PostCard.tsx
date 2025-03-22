'use client'
import { Like, Post, User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type PostCardProps = {
    post: Post & { author: User, likes: Like[] }
    extraImageClasses?: string
}
const PostCard = ({ post, extraImageClasses }: PostCardProps) => {

    const router = useRouter();


    const isVideo = post.assets.some((item) => item.endsWith('.mp4') || item.endsWith('.avi') || item.endsWith('.webm') || item.endsWith('.ogg'))

    return (<div className='relative group'>
        {isVideo ? (
            <video src={post.assets[0]}
                controls={false}
                className='rounded-3xl w-full h-full'
                onClick={() => router.push(`/post-modal/${post.id}`)}

            />
        ) : (
            <Image
                src={post.assets[0]}
                width={500}
                height={500}
                alt={post.altText}
                blurDataURL={`/_next/image?url=${post.assets[0]}&w=16&q=1`}
                placeholder='blur'
                className={`rounded-3xl w-full h-full min-w-[200px] min-h-[200px] ${extraImageClasses}`}
                onClick={() => router.push(`/post-modal/${post.id}`)}
            />
        )}

        {/* overlay */}
        <div className="group-hover:flex flex-col absolute hidden p-4 gap-3 bottom-0 w-full bg-black/20">
            <h3 className="text-sm line-clamp-1">{post?.caption}</h3>
            <p className="text-sm text-purple-secondary line-clamp-1">{post?.hashtags}</p>
            <div className="flex justify-between w-full text-sm">
                <div className="flex items-center gap-2">
                    <Link href={`/users/${post?.author?.id}`} className="flex items-center gap-1">
                        <Image
                            src={post?.author?.image || '/icons/dummyuser.png'}
                            width={30}
                            height={30}
                            alt="profile"
                            className="rounded-full" />
                        <h4 className=" line-clamp-1">{post?.author?.name}</h4>
                    </Link>
                </div>
               
            </div>
        </div>
    </div>)
}

export default PostCard


