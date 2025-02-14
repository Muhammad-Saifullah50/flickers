'use client'
import { Textarea } from '../ui/textarea'
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PostEditingSchema, PostSchema } from '@/validations/postSchema'
import FileUploader from '../FileUploader'
import { useState } from 'react'
import { Button } from '../ui/button'
import Loader from '../Loader'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createPost, updatePost } from '@/actions/post.actions'
import { Post, User } from '@prisma/client'

interface PostFormProps {
    post?: Post
    isEditing?: boolean
}
const PostForm = ({  post, isEditing }: PostFormProps) => {

    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState<string[]>(post?.assets || []);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    const totalFiles = files.length + existingFiles.length;

    const schema = (!isEditing || totalFiles === 0) ? PostSchema : PostEditingSchema

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            caption: post?.caption || '',
            altText: post?.altText || '',
            assets: post?.assets || [],
            hashtags: post?.hashtags || ''
        }
    })

    const handleRemoveExisting = (fileUrl: string) => {
        setExistingFiles(prev => prev.filter(f => f !== fileUrl));
    };

    const handleFormSubmit = async (data: z.infer<typeof schema>) => {

        try {
            setIsUploading(true);

            // Upload files to Cloudinary first
            const uploadedUrls: string[] = [];
            for (const file of files) {
                try {
                    const formData = new FormData();
                    formData.append("file", file);

                    const request = await fetch('/api/upload', {
                        method: 'POST',

                        body: formData,
                    });

                    const url = await request.json();
                    if (url) {
                        //data field is returned by our upload api
                        uploadedUrls.push(url.data.url);
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
                assets: [...uploadedUrls, ...existingFiles],
                hashtags: data.hashtags
            };

            if (uploadedUrls.length > 0 || existingFiles.length > 0) {

                if (isEditing && post) {
                    const updatedPost = await updatePost(post?.id, formData)
                    if (updatedPost) {
                        toast({
                            description: 'Post updated successfully',
                            variant: 'default'
                        })
                        router.push(`/posts/${updatedPost.id}`);
                    }
                } else {
                    const post = await createPost(formData);
                    if (post) {
                        toast({
                            description: 'Post created successfully',
                            variant: 'default'
                        })
                        router.push(`/posts/${post.id}`);
                    }
                }
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
                                    onChange={(files) => {
                                        setFiles(files);
                                        form.setValue('assets', files, { shouldValidate: true });
                                    }}
                                    uploadedFiles={uploadedFiles}
                                    setUploadedFiles={setUploadedFiles}
                                    existingFiles={existingFiles}
                                    onRemoveExisting={handleRemoveExisting}
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
                <FormField
                    control={form.control}
                    name="hashtags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hashtags</FormLabel>
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
                        {isUploading ? <Loader variant='white' /> : isEditing ? 'Update Post' : 'Share Post'}
                    </Button>
                </div>
            </Form >
        </form>
    )
}

export default PostForm
