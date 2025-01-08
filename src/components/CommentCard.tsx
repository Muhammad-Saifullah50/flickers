import { getCurrentUserFromDb, getDbUserById } from "@/actions/user.actions"
import { cn, formatTimeDifference } from "@/lib/utils"
import { Comment } from "@prisma/client"
import Image from "next/image";
import ReplyButton from "./ReplyButton";
interface CommentCardProps {
    comment: Comment
    isReply?: boolean
    replyCount?: number
}

const CommentCard = async ({ comment, isReply, replyCount }: CommentCardProps) => {

    const commentAuthor = await getDbUserById(comment.authorId);

    const currentUser = await getCurrentUserFromDb();

    return (
        // have to add functionality for comment likes
        <div className={cn("flex gap-4", isReply && "ml-12")}>
            <div>
                <Image
                    src={commentAuthor?.image as string}
                    width={40}
                    height={40}
                    alt='profile photo'
                    className='rounded-full'
                />
            </div>
            <div className="flex flex-col justify-between items-start w-full overflow-x-hidden">
                <div className="flex flex-col gap-2 w-full overflow-x-hidden">
                    <span className="text-sm text-purple-secondary">{commentAuthor?.name}</span>
                    <p className=" break-all text-white w-full"> {comment.content}</p>
                </div>
                <div className="flex gap-2 flex-col">
                    <div className="flex gap-4">
                        <span className="text-[10px] text-purple-secondary">{formatTimeDifference(comment.createdAt)}</span>

                        {replyCount! > 0 && <span className="text-[10px] text-purple-secondary">
                            {replyCount} repl{replyCount! > 1 ? 'ies' : 'y'}</span>}

                    </div>

                    {!isReply && <ReplyButton
                        postId={comment.postId}
                        replyAuthor={currentUser}
                        parentCommentId={comment.id}
                    />}

                </div>
            </div>
        </div>
    )
}

export default CommentCard
