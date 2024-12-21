'use client'
import { Textarea } from './ui/textarea'
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FileUploader from './FileUploader'
import { useState } from 'react'
import { Button } from './ui/button'
import Loader from './Loader'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Reel, User } from '@prisma/client'
import { ReelEditingSchema, ReelSchema } from '@/validations/reelSchema'
import { createReel, updateReel } from '@/actions/reel.actions'
import ReelUploader from './ReelUploader'

interface PostFormProps {
    user: User
    reel?: Reel
    isEditing?: boolean
}
const ReelForm = ({ user, reel, isEditing }: PostFormProps) => {

    const [uploadedFile, setUploadedFile] = useState<string>();
    const [file, setFile] = useState<File>();
    const [existingFile, setExistingFile] = useState<string>(reel?.videoUrl || '');
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    const schema = (!isEditing) ? ReelSchema : ReelEditingSchema

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            caption: reel?.caption || '',
            altText: reel?.altText || '',
            videoUrl: reel?.videoUrl || '',
            hashtags: reel?.hashtags || ''
        }
    })

 

    const handleRemoveExisting = (fileUrl: string) => {
        setExistingFile(fileUrl);
    };

    const handleFormSubmit = async (data: z.infer<typeof schema>) => {

        try {
            setIsUploading(true);

            // Upload file to Cloudinary first
            let uploadedUrl: string = '';
            
                try {
                    const formData = new FormData();
                    formData.append("file", file!);

                    const request = await fetch('/api/upload', {
                        method: 'POST',

                        body: formData,
                    });

                    const url = await request.json();
                    if (url) {
                        //data field is returned by our upload api
                        uploadedUrl = url.data;
                    }

                } catch (error) {
                    console.error('Error uploading file:', error);
                    toast({
                        description: `Error uploading file: ${file?.name}`,
                        variant: 'destructive'
                    });
                }

            // Update the form data with Cloudinary URLs
            const formData = {
                caption: data.caption,
                altText: data.altText,
                videoUrl: uploadedUrl,
                authorId: user.id || '',
                hashtags: data.hashtags
            };


                if (isEditing) {
                    const updatedReel = await updateReel(reel?.id!, formData)
                    if (updatedReel) {
                        toast({
                            description: 'Post updated successfully',
                            variant: 'default'
                        })
                        router.push(`/posts/${updatedReel.id}`);
                    }
                } else {
                    const reel = await createReel(formData);
                    if (reel) {
                        toast({
                            description: 'Reel created successfully',
                            variant: 'default'
                        })
                        router.push(`/reels`);
                    }
            }

        } catch (error) {
            console.error('Error creating reel:', error);
            toast({
                description: 'Error creating reel',
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
                    name="videoUrl"
                    render={() => (
                        <FormItem>
                            <FormLabel>Add a short video</FormLabel>
                            <FormControl>
                                <ReelUploader
                                    file={file!}
                                    onChange={(file) => {
                                        setFile(file!);
                                        form.setValue('videoUrl', file, { shouldValidate: true });
                                    }}
                                    uploadedFile={uploadedFile!}
                                    setUploadedFile={setUploadedFile}
                                    existingFile={existingFile}
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
                            <FormLabel>Video Alt Text</FormLabel>
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

export default ReelForm
