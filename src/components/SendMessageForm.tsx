'use client';
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { messageSchema } from '@/validations/messageSchema';

const SendMessageForm = () => {

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
    });

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        console.log(data)
    }
    return (
        <section className="flex justify-between gap-2 w-full py-2">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="relative flex items-center w-full">
                                        <Button
                                            className="absolute left-0 !bg-transparent hover:!bg-transparent"
                                        >
                                            <Image
                                                src="/icons/send.svg"
                                                width={24}
                                                height={24}
                                                alt="send"
                                                className="opacity-70 hover:opacity-100 transition-opacity"
                                            />
                                        </Button>
                                        <Input
                                            placeholder="Write your message here..."
                                            {...field}
                                            className="!bg-dark-3 pr-10 focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0"
                                        />
                                         <Button
                                            
                                            type="submit"
                                            size={"icon"}
                                            className=" !bg-yellow-primary hover:!bg-yellow-primary/90"
                                        >
                                            <Image
                                                src="/icons/arrow-black.svg"
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
        </section>)
}

export default SendMessageForm