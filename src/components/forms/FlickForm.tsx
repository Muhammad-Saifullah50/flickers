'use client'
import { Textarea } from '../ui/textarea'
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '../ui/button'
import Loader from '../Loader'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Flick, User } from '@prisma/client'
import { FlickEditingSchema, FlickSchema } from '@/validations/flickSchema'
import { createFlick, updateFlick } from '@/actions/flick.actions'
import FlickUploader from '../FlickUploader'
import { PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'

interface FlickFormProps {
    flick?: Flick
    isEditing?: boolean
}
const FlickForm = ({ flick, isEditing }: FlickFormProps) => {

    const [uploadedFile, setUploadedFile] = useState<string>();
    const [file, setFile] = useState<File>();
    const [existingFile, setExistingFile] = useState<string>(flick?.videoUrl || '');
    const [isUploading, setIsUploading] = useState(false);
    const [blob, setBlob] = useState<PutBlobResult | null>();


    const router = useRouter();

    const schema = (!isEditing) ? FlickSchema : FlickEditingSchema

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            caption: flick?.caption || '',
            altText: flick?.altText || '',
            videoUrl: flick?.videoUrl || '',
            hashtags: flick?.hashtags || ''
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


                const newBlob = await upload(file.name!, file!, {
                    access: 'public',
                    handleUploadUrl: '/api/videos/upload'
                });

                setBlob(newBlob);

                uploadedUrl = newBlob.url;
                console.log(uploadedUrl, 'uploadedurl')
                console.log(newBlob, 'blob')
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
                hashtags: data.hashtags
            };
console.log(formData, 'formdata')

            if (isEditing && flick) {
                const updatedflick = await updateFlick(flick?.id, formData)
                if (updatedflick) {
                    toast({
                        description: 'Post updated successfully',
                        variant: 'default'
                    })
                    router.push(`/posts/${updatedflick.id}`);
                }
            } else {

                if (uploadedUrl) {

                    const flick = await createFlick(formData);
                    if (flick) {
                        toast({
                            description: 'Flick created successfully',
                            variant: 'default'
                        })
                        router.push(`/flicks`);
                    }
                }
            }

        } catch (error) {
            console.error('Error creating flick:', error);
            toast({
                description: 'Error creating flick',
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
                                <FlickUploader
                                    onChange={(file) => {
                                        setFile(file!);
                                        form.setValue('videoUrl', file, { shouldValidate: true });
                                    }}
                                    uploadedFile={uploadedFile}
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
                        {isUploading ? <Loader variant='white' /> : isEditing ? 'Update flick' : 'Create flick'}
                    </Button>
                </div>
            </Form >
        </form>
    )
}

export default FlickForm
