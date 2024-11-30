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
import { createComment } from "@/actions/comments.actons"
import { getSession, useSession } from "next-auth/react"

const PostComment = ({ author, postId }: { author: User, postId: string }) => {

    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: '',
        }
    });

    const [loading, setloading] = useState(false);

    const session = useSession();

    // todo: show skeleton for laofing state
    if (session.status !== 'authenticated') {
        return (
            <span>Please login to comment</span>
        )
    }

    const onSubmit = async (data: z.infer<typeof commentSchema>) => {
        try {
            setloading(true);

            const commentObject = {
                comment: data.comment,
                authorId: author.id || '',
                postId: postId
            }
            const comment = await createComment(commentObject);
        } catch (error) {
            console.error('error creating comment', error);
        } finally {
            setloading(false);
            form.reset();

        }
    }
    return (
        <section className="flex justify-between gap-2 w-full">
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
                                            placeholder="Enter your comment"
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