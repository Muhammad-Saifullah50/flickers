'use client'
import { User } from "next-auth"
import Image from "next/image"
import { Input } from "./ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { commentSchema } from "@/validations/commentSchema"
import { z } from "zod"
import { useState } from "react"
import { createCommentOrReply } from "@/actions/comments.actons"
import { useSession } from "next-auth/react"

interface PostCommentProps {
    author: User
    postId: string
    isReply?: boolean
    parentCommentId?: string
    setisReplying?: (value: boolean) => void
}

const PostComment = ({ author, postId, isReply, parentCommentId, setisReplying }: PostCommentProps) => {

    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: '',
        }
    });


    const session = useSession();

    // todo: show skeleton for laofing state
    if (session.status !== 'authenticated') {
        return (
            <span>Please login to comment</span>
        )
    }

    const onSubmit = async (data: z.infer<typeof commentSchema>) => {
        try {

            const commentObject = {
                comment: data.comment,
                authorId: author.id || '',
                postId: postId
            }

            const replyObject = {
                comment: data.comment,
                authorId: author.id || '',
                postId: postId,
                parentCommentId: parentCommentId
            }
            await createCommentOrReply(isReply ? replyObject : commentObject);

        } catch (error) {
            console.error('error creating comment', error);
        } finally {
            form.reset();
            setisReplying && setisReplying(false);
        }
    }
    return (
        <section className="flex justify-between gap-2 w-full py-2">
            <Image
                src={author.image || '/icons/dummyuser.svg'}
                width={40}
                height={35}
                alt="profile photo"
                className='rounded-full' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="relative flex items-center w-full">
                                        <Input
                                            placeholder={isReply ? "Post a reply..." : "Post a comment..."}
                                            {...field}
                                            className="!bg-dark-3 pr-10 focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0"
                                        />
                                        <Button
                                            disabled={field.value.length === 0}
                                            type="submit"
                                            className="absolute right-0 !bg-transparent hover:!bg-transparent"
                                        >
                                            <Image
                                                src="/icons/send.svg"
                                                width={24}
                                                height={24}
                                                alt="send"
                                                className="opacity-70 hover:opacity-100 transition-opacity"
                                            />
                                        </Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </section>
    )
}

export default PostComment