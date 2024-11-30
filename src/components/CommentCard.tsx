import { getDbUserById } from "@/actions/user.actions"
import { formatTimeDifference } from "@/lib/utils"
import { Comment } from "@prisma/client"
import Image from "next/image";

const CommentCard = async ({ comment }: { comment: Comment }) => {

    const commentAuthor = await getDbUserById(comment.authorId);

    return (
        <div className="flex gap-4">
            <div>
                <Image
                    src={commentAuthor?.image || '/icons/dummyuser.svg'}
                    width={40}
                    height={40}
                    alt='profile photo'
                    className='rounded-full'
                />
            </div>
            <div className="flex flex-col justify-between items-start w-full overflow-x-hidden">
                <div className="flex flex-col gap-2 w-full overflow-x-hidden">
                    <span className="text-sm text-purple-secondary">{commentAuthor?.name}</span>
                    <p className=" break-all  w-full"> {comment.content}</p>
                </div>
                <div className="flex gap-4">
                    <span className="text-[10px] text-purple-secondary">{formatTimeDifference(comment.createdAt)}</span>
                    <button className="flex text-[10px] items-center gap-2">
                        <Image
                            src={'/icons/reply-arrow.svg'}
                            width={14}
                            height={14}
                            alt='reply'
                        />
                        Reply</button>
                </div>
            </div>
        </div>
    )
}

export default CommentCard

// have to use refs to get the scroll position