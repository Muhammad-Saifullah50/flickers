import { auth } from "@/lib/auth"
import { formatDateTime } from "@/lib/utils"
import { Comment, Post, User } from "@prisma/client"
import Image from "next/image"
import PostComment from "./PostComment"
import CommentCard from "./CommentCard"

const PostInfoCard = async ({ post,isHomeCard }: { post: Post & { author: User, comments: Comment[] },isHomeCard?: boolean }) => {
    const session = await auth();

    const isOwner = session?.user?.email === post.author?.email;
    return (
        <aside className="flex flex-col gap-4 w-full bg-dark-2 p-4 rounded-r-lg justify-between h-full min-h-full">

            <section className="flex flex-col gap-4">
                <section className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div>
                            <Image
                                src={post.author?.image!}
                                width={40}
                                height={40}
                                alt='profile photo'
                                className='rounded-full' />
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg text-white">{post.author?.name}</h2>
                            <p className="text-sm text-purple-secondary font-medium">{formatDateTime(post.createdAt)}</p>
                        </div>
                    </div>

                    {/* todo: add edit and delete functionality */}

                    {isOwner && (<div className="flex items-center justify-end gap-2">
                        <Image
                            src={'/icons/edit.svg'}
                            width={20}
                            height={20}
                            alt='edit'
                            className='cursor-pointer' />

                        <Image
                            src={'/icons/trash.svg'}
                            width={20}
                            height={20}
                            alt='delete'
                            className='cursor-pointer' />
                    </div>)}
                </section>

                <section className="flex flex-col">
                    <p className="text-base">{post.caption}</p>
                    <span>&nbsp; &nbsp;</span>
                    <p className="text-base text-purple-secondary">{post.hashtags}</p>
                </section>

                <hr className="border-dark-4" />

                {!isHomeCard && <section className="flex flex-col overflow-y-scroll gap-6 max-h-[280px] ">
                    {post.comments
                        .filter(comment => !comment.parentCommentId) // Only get top-level comments
                        .map((comment) => {
                            // Get replies for this comment
                            const replies = post.comments.filter(reply => reply.parentCommentId === comment.id);
                            
                            return (
                                <div key={comment.id} className="flex flex-col gap-4">
                                    <CommentCard
                                        comment={comment}
                                        replyCount={replies?.length}
                                    />
                                    
                                    {replies?.length > 0 && (
                                        <div className="flex flex-col gap-4">
                                            {replies.map((reply) => (
                                                <CommentCard
                                                    key={reply.id}
                                                    comment={reply}
                                                    isReply
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </section>}
            </section>


            <section className="flex flex-col gap-4">
                <section className="flex items-center justify-between ">
                    <div className="flex items-center justify-start gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src={'/icons/heart.svg'}
                                width={20}
                                height={20}
                                alt='like'
                                className='cursor-pointer'
                            />
                            <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image
                                src={'/icons/comment.svg'}
                                width={20}
                                height={20}
                                alt='like'
                                className='cursor-pointer'
                            />
                            {/* todo: add comments functionality */}
                            {!isHomeCard && <span>{post.comments?.length}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <Image
                                src={'/icons/share.svg'}
                                width={18}
                                height={18}
                                alt='like'
                                className='cursor-pointer'
                            />
                            <span>{post.shares}</span>
                        </div>

                    </div>
                    <div>
                        <Image
                            src={'/icons/bookmark.svg'}
                            width={20}
                            height={20}
                            alt="bookmark"
                        />
                    </div>
                </section>
                <PostComment postId={post.id} author={post.author} />
            </section>

        </aside >
    )
}

export default PostInfoCard