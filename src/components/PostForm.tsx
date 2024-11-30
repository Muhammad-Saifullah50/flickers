'use client'
import { Textarea } from './ui/textarea'
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PostSchema } from '@/validations/postSchema'
import FileUploader from './FileUploader'
import { useState } from 'react'
import { Button } from './ui/button'
import Loader from './Loader'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { createPost } from '@/actions/post.actions'
import { User } from 'next-auth'

const PostForm = ({ user }: { user: User }) => {

    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            caption: '',
            altText: '',
            assets: []
        }
    })

    const handleFilesChange = (newFiles: File[]) => {
        setFiles(newFiles);
        form.setValue('assets', newFiles, { shouldValidate: true });

    };


    const handleFormSubmit = async (data: z.infer<typeof PostSchema>) => {


        try {
            setIsUploading(true);

            // Upload files to Cloudinary first
            const uploadedUrls: string[] = [];
            for (const file of files) {
                try {
                    const url = await uploadToCloudinary(file);
                    if (url) {
                        uploadedUrls.push(url);
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    toast({
                        description: `Error uploading file: ${file.name}`,
                        variant: 'destructive'
                    });
                }
            }

            // Update the form data with Cloudinary URLs
            const formData = {
                caption: data.caption,
                altText: data.altText,
                assets: uploadedUrls,
                authorId: user.id || ''
            };

            const post = await createPost(formData);

            console.log(post)
            if (post) {
                toast({
                    description: 'Post created successfully',
                    variant: 'default'
                });

                router.push(`/posts/${post.id}`);
            }

        } catch (error) {

            console.error('Error creating post:', error);
            toast({
                description: 'Error creating post',
                variant: 'destructive'
            })
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(handleFormSubmit)}
            className='flex flex-col gap-9 py-9'>
            <Form {...form}>

                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                !bg-dark-3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="assets"
                    render={() => (
                        <FormItem>
                            <FormLabel>Add Photos/Videos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    files={files}
                                    onChange={handleFilesChange}
                                    uploadedFiles={uploadedFiles}
                                    setUploadedFiles={setUploadedFiles}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="altText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Photo/Video Alt Text</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                !bg-dark-3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end'>
                    <Button
                        type='submit'
                        disabled={isUploading}
                    >
                        {isUploading ? <Loader variant='white' /> : 'Share Post'}
                    </Button>
                </div>
            </Form >
        </form>
    )
}

export default PostForm
