'use client'
import { Textarea } from '../ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import profileSchema from '@/validations/profileSchema'
import { Button } from '../ui/button'
import Loader from '../Loader'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Label } from '../ui/label'
import { updateProfile } from '@/actions/user.actions'

interface ProfileFormProps {
    user: User
}
const ProfileForm = ({ user }: ProfileFormProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(user?.image || '/icons/dummy-user.png');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name,
            username: user?.username || '',
            email: user?.email || '',
            bio: user?.bio || '',
            image: user?.image || '',
        }
    })


    const handleFormSubmit = async (data: z.infer<typeof profileSchema>) => {
        try {
            setLoading(true);

            // Upload file to Cloudinary first
            let uploadedUrl = user?.image;


            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                try {

                    const request = await fetch('/api/upload', {
                        method: 'POST',

                        body: formData,
                    });

                    const url = await request.json();
                    uploadedUrl = url.data
                } catch (error) {
                    console.error('Error uploading file:', error);
                    toast({
                        description: `Error uploading file`,
                        variant: 'destructive'
                    });
                }
            }

            // Update the form data with Cloudinary URLs
            const dataToUpload = {
                name: data.name,
                username: data.username,
                email: data.email,
                bio: data.bio,
                image: uploadedUrl
            };
            console.log(dataToUpload, 'data')

           const updatedUser = await updateProfile(dataToUpload, user.id);
            if (updatedUser) {
                toast({
                    description: 'Profile updated successfully',
                    variant: 'default'
                });
            }

        }


        catch (error) {
            console.error('Error creating post:', error);
            toast({
                description: 'Error updating profile',
                variant: 'destructive'
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}
                className='flex flex-col gap-9 py-9'>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex items-center gap-4'>
                                    <Image
                                        src={image!}
                                        alt={user?.name}
                                        className='w-20 h-20 rounded-full'
                                        width={80}
                                        height={80}
                                    />
                                    <Label htmlFor='upload' className='text-[#0095F6] cursor-pointer'>Change Profile Photo</Label>
                                    <Input
                                        id='upload'
                                        className="hidden"
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const previewUrl = URL.createObjectURL(file);
                                                setImage(previewUrl);
                                                setImageFile(file);

                                                field.onChange(file);
                                                form.setValue('image', file);

                                                return () => URL.revokeObjectURL(previewUrl);
                                            }
                                        }} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                !bg-dark-3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                !bg-dark-3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                !bg-dark-3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
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
                        disabled={loading}
                    >
                        {loading ? <Loader variant='white' /> : 'Update Profile'}
                    </Button>
                </div>
            </form>
        </Form >
    )
}

export default ProfileForm
