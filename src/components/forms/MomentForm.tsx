'use client'
import { Textarea } from '../ui/textarea'
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FileUploader from '../FileUploader'
import { useState } from 'react'
import { Button } from '../ui/button'
import Loader from '../Loader'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { MomentSchema } from '@/validations/momentSchema'
import { } from 'react-color';
import { CirclePicker } from 'react-color';
import { createMoment } from '@/actions/moments.actions'
import { revalidatePath } from 'next/cache'


const MomentForm = ({ userId }: { userId: string }) => {

    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof MomentSchema>>({
        resolver: zodResolver(MomentSchema),
        defaultValues: {
            caption: '',
            altText: '',
            assets: [],
        }
    });

    const handleFormSubmit = async (data: z.infer<typeof MomentSchema>) => {

        try {
            setIsUploading(true);

            // upload files to cloudinary first
            const uploadedUrls: string[] = [];
            if (data?.assets && data.assets.length > 0) {



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
                            uploadedUrls.push(url.data);
                        }

                    } catch (error) {
                        console.error('Error uploading file:', error);
                        toast({
                            description: `Error uploading file: ${file.name}`,
                            variant: 'destructive'
                        });
                    }
                }
            }

            // Update the form data with Cloudinary URLs
            const formData = {
                caption: data.caption,
                altText: data.altText,
                assets: uploadedUrls,
                text: data.text,
                bgColor: data?.bgColor,
                authorId: userId

            };


            const moment = await createMoment(formData);
            if (moment) {
                toast({
                    description: 'Moment created successfully',
                    variant: 'default'
                })
            }


        } catch (error) {
            console.error('Error creating moment:', error);
            toast({
                description: 'Error creating moment',
                variant: 'destructive'
            })
        } finally {
            setIsUploading(false);
        }
    };
// have tyo figure out how to close the modal
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
                            <FormLabel>Photo/Video Alternate Text</FormLabel>
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
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
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
                    name="bgColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Background Color</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-4">
                                    <CirclePicker
                                        onChange={(color) => field.onChange(color.hex)}
                                        color={field.value}
                                        width='100%'
                                        circleSpacing={40}
                                        circleSize={50}
                                        className='pt-10'
                                    />
                                    {field.value && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => field.onChange('')}
                                        >
                                            Clear Color
                                        </Button>
                                    )}
                                </div>
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
                        {isUploading ? <Loader variant='white' /> : 'Share Moment'}
                    </Button>
                </div>
            </Form >
        </form>
    )
}

export default MomentForm

// have to chekck form validation errors
// have to correct the dialog close isasue
