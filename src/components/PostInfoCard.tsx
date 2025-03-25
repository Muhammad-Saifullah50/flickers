import { cn, formatDateTime } from "@/lib/utils"
import { Comment, Like, Post, Save, User } from "@prisma/client"
import Image from "next/image"
import PostComment from "./PostComment"
import CommentCard from "./CommentCard"
import PostCarousel from "./PostCarousel"
import Link from "next/link"
import DeletePost from "./DeletePost"
import SavePostBtn from "./SavePostBtn"
import ShareButton from "./ShareButton";

type PostInfoCardProps = {
    post: Post & {
        author: User,
        comments: Comment[],
        saves: Save[],
        likes: Like[]
    },
    isHomeCard?: boolean
    userId?: string
    currentUser: User | null
    handleDeletePost?: (postId: string) => void
}

const PostInfoCard = ({ post, isHomeCard, userId, currentUser, handleDeletePost }: PostInfoCardProps) => {



    const isOwner = currentUser?.email === post.author?.email;

    const isSaved = post.saves?.some((save) => save.postId === post.id);
    const saveId = post.saves?.find((save) => save.postId === post.id)?.id;

    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/posts/${post.id}`;

    return (
        <aside className={cn("flex flex-col gap-4 w-full bg-dark-2 p-4 rounded-r-lg justify-between h-full min-h-full",
            'rounded-3xl', isHomeCard
        )}>

            <section className="flex flex-col gap-4">
                <section className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div>
                            <Image
                                src={post?.author?.image || '/icons/dummyuser.svg'}
                                width={40}
                                height={40}
                                alt='profile photo'
                                className='rounded-full' />
                        </div>
                        <div>
                            <Link href={`/users/${post.author?.id}`}>
                                <h2 className="font-semibold text-lg text-white">{post.author?.name}</h2>
                            </Link>
                            <p className="text-sm text-purple-secondary font-medium">{formatDateTime(post.createdAt)}</p>
                        </div>
                    </div>


                    {currentUser && isOwner  &&  (<div className="flex items-center justify-end gap-2">
                        <Link href={`/edit-post/${post.id}`}>
                            <Image
                                src={'/icons/edit.svg'}
                                width={20}
                                height={20}
                                alt='edit'
                                className='cursor-pointer' />
                        </Link>
                        <DeletePost postId={post.id} onDelete={handleDeletePost} />
                    </div>)}
                </section>

                <Link href={`/posts/${post.id}`}>
                    <section className="flex flex-col">
                        <p className="text-base text-white">{post.caption}</p>
                        <span>&nbsp; &nbsp;</span>
                        <p className="text-base text-purple-secondary">{post.hashtags}</p>
                    </section>
                </Link>
                {!isHomeCard && <hr className="border-dark-4" />}


                {isHomeCard && (
                    <PostCarousel items={post.assets} />
                )}

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



            <section className={"flex flex-col gap-4"}>
                <Link href={`/posts/${post.id}`}>
                    <section className="flex items-center justify-between ">
                        <div className="flex items-center justify-start gap-4">
                            
                            <div className="flex items-center gap-2">
                                <Image
                                    src={'/icons/comment.svg'}
                                    width={20}
                                    height={20}
                                    alt='like'
                                    className='cursor-pointer'
                                />
                                <span className="text-white">{post?.comments?.length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={'/icons/share.svg'}
                                    width={18}
                                    height={18}
                                    alt='like'
                                    className='cursor-pointer'
                                />
                                <span className="text-white">{post.shares}</span>
                            </div>

                        </div>
                        <div className="flex gap-2">
                            <ShareButton
                                itemId={post.id}
                                link={shareLink}
                                modalOpen={false}
                                authorName={post.author.name}
                                caption={post.caption}
                                currentShares={post.shares}
                            />
                            {userId && <SavePostBtn
                                isHomeCard={isHomeCard}
                                userId={userId}
                                postId={post.id}
                                isSaved={isSaved}
                                saveId={saveId}
                            />}
                        </div>
                    </section>
                </Link>
                <PostComment postId={post.id} author={currentUser!} />
                            </section>

        </aside >
    )
}

export default PostInfoCard