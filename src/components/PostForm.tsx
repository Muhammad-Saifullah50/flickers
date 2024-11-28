'use client'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PostSchema } from '@/validations/postSchema'
import FileUploader from './FileUploader'

const PostForm = () => {

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            caption: '',
            altText: '',
            assets: []
        }
    })

    return (
        <div className='flex flex-col gap-9 py-9'>
            <Form {...form} >

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
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add Photos/Videos</FormLabel>
                            <FormControl>
                                <FileUploader
                                //@ts-ignore
                                // files={field.value}
                                // onChange={field.onChange}
                                />
                            </FormControl>
                            {/* {uploadedImage && (
                            <FormDescription className="text-light-secondary text-sm">Click again to change the image</FormDescription>
                            )} */}

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

            </Form >
        </div>
    )
}

export default PostForm
