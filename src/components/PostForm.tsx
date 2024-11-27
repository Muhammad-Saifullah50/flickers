'use client'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PostSchema } from '@/validations/postSchema'

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
        <Form {...form}>
             <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="abc@example.com"
                                        className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                    !bg-dark-4" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

        </Form>
    )
}

export default PostForm
