'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { messageSchema } from '@/validations/messageSchema';
import { Room } from '@ably/chat';
import FileUploader from '../FileUploader';

const SendMessageForm = ({ room }: { chatId: string, senderId: string, room: Room }) => {

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            message: '',
            images: []
        }
    });

    const [loading, setLoading] = useState(false);
    const [imageUploaderOpen, setImageUploaderOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        try {
            setLoading(true);
            room.typing.stop()
            await room.messages.send({ text: data.message! });

            form.setValue('message', '');

        } catch (error) {
            console.error('Error creating message on client:', error);
        } finally {
            setLoading(false);
        }
    }

    // have to add the image upload functionality
    return (
        <section className="flex justify-between gap-2 w-full py-2">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">

                    {imageUploaderOpen && <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <FileUploader
                                        files={files}
                                        onChange={(files) => {
                                            setFiles(files);
                                            form.setValue('images', files, { shouldValidate: true });
                                        }}
                                        uploadedFiles={uploadedFiles}
                                        setUploadedFiles={setUploadedFiles}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />}
{/* have to completye this functionality */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="relative flex items-center w-full">
                                        <Button
                                            className=" !bg-dark-3 hover:!bg-dark-3/90 relative left-2 !rounded-none"
                                        >
                                            <Image
                                                src="/icons/attachment.svg"
                                                width={20}
                                                height={20}
                                                alt="send"
                                                className="opacity-70 hover:opacity-100 transition-opacity"
                                                onClick={() => setImageUploaderOpen(prev => !prev)}
                                            />
                                        </Button>
                                        <Input
                                            placeholder="Write your message here..."
                                            {...field}
                                            className="!bg-dark-3 pr-10 focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                room.typing.start();
                                            }}
                                            onBlur={() => {
                                                room.typing.stop();
                                            }}
                                        />
                                        <Button
                                            disabled={loading}
                                            type="submit"
                                            size={"icon"}
                                            className=" !bg-yellow-primary hover:!bg-yellow-primary/90 !p-2"
                                        >
                                            <Image
                                                src="/icons/arrow-black.svg"
                                                width={20}
                                                height={20}
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