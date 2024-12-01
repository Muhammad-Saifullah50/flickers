'use client';
import Image from 'next/image'
import { useState } from 'react';
import PostComment from './PostComment';
import { useSession } from 'next-auth/react';
import { getCurrentUserFromDb } from '@/actions/user.actions';
import { User } from '@prisma/client';

interface ReplyButtonProps {
    postId: string
    replyAuthor?: User
    parentCommentId: string
}

const ReplyButton = ({ postId, replyAuthor, parentCommentId }: ReplyButtonProps) => {

    const [isReplying, setIsReplying] = useState(false);

    const session = useSession();

    if (session.status !== 'authenticated') return null

    return (

        <div className='flex flex-col gap-2'>
            <button
                className="flex text-[10px] i gap-2"
                onClick={() => setIsReplying(!isReplying)}>
                <Image
                    src={'/icons/reply-arrow.svg'}
                    width={14}
                    height={14}
                    alt='reply'
                />
                {isReplying ? 'Cancel' : 'Reply'}</button>

            {isReplying && (
                <PostComment
                    author={replyAuthor!}
                    postId={postId}
                    parentCommentId={parentCommentId}
                    setisReplying={setIsReplying}
                    isReply />
            )}
        </div>

    )
}

export default ReplyButton