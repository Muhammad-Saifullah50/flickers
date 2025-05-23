'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { authSchema } from "@/validations/authFormSchema"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInWithOAuthProvider, signUpWithCredentials } from "@/actions/auth.actions"
import { Provider } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Loader from "../Loader"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { providerMap } from "@/lib/auth"


interface AuthFormProps {
    callbackUrl: string
    type: 'signin' | 'signup'
}

const AuthForm = ({ callbackUrl, type }: AuthFormProps) => {

    const [loading, setloading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    const schema = authSchema(type);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            username: '',
            confirmPassword: '',
        }
    })

    type SignInFormValues = z.infer<typeof schema>;


    const handleCredentialSubmit: SubmitHandler<SignInFormValues> = async (values) => {


        try {
            setloading(true);
            if (type === 'signin') {

                const result = await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password
                });
                if (!result?.error) {
                    router.push('/');
                    toast({
                        description: 'Signed in successfully'
                    });
                }
                else {
                    console.log(result)

                    toast({
                        description: 'Authentication failed! Please try again with correct credentials or sign up if you havent created one yet',
                        variant: 'destructive'
                    });
                }

            } else {
                await signUpWithCredentials(values);
                toast({
                    description: 'Signed up successfully'
                });

            }
        } catch (error) {
            setloading(false);
            // TODO: Handle error
            console.error(error);
        } finally {
            setloading(false);
        }
    }

    const handleOAuthSubmit = async (provider: Provider) => {
        try {
            setloading(true)
             await signInWithOAuthProvider(provider, callbackUrl);

        } catch (error) {
            setloading(false);
            console.error(error);
            throw new Error('Failed to sign in')
            // TODO: Handle error
        }
        finally {
            setloading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-2">

            <div className="flex justify-center items-center gap-2">
                <Image
                    src={'/icons/logo.svg'}
                    width={25}
                    height={25}
                    alt="logo" />

                <h1 className="font-bold text-2xl text-white">Flickers</h1>
            </div>

            <div className="p-3b text-white flex flex-col items-center justify-center gap-2 w-full ">
                <h3 className="text-2xl sm:text-3xl font-bold w-full text-center">{type === 'signin' ? 'Log in to your account' : 'Create a new account'}</h3>
                <p className="text-purple-secondary font-normal text-base text-center">{type === 'signin' ? 'Welcome back! ' : ' To use Flickers,'} Please enter your details.</p>
            </div>
            <Form {...form}>
                <form
                    className="w-full flex flex-col flex-shrink gap-4"
                    onSubmit={form.handleSubmit(handleCredentialSubmit)}
                >

                    {type === 'signup' && <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem
                                className="">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input

                                        placeholder="Your Name"
                                        className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0 !bg-dark-4 " {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                !bg-dark-4"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {type === 'signup' && (<FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                !bg-dark-4"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />)}
                    <Button
                        disabled={loading}
                        className="rounded-lg font-semibold !bg-purple-primary hover:!bg-purple-primary/95 !text-light-1" type="submit">
                        {
                              <p>
                                {type === 'signin' ? 'Log In' : 'Sign Up'}
                            </p>
                        }
                    </Button>

                </form>
            </Form>

            <div className="flex flex-wrap gap-2 ">

                {Object.values(providerMap).map((provider) => (
                    <form
                        className="w-full flex flex-col gap-3 "
                        key={provider.id}
                        action={() => handleOAuthSubmit(provider)}
                    >
                        <Button
                            disabled={loading}
                            variant={'white'}
                            type="submit"
                            className="rounded-lg ">
                            { 
                                 <span className="flex gap-2 items-center justify-center font-semibold text-dark-4">
                                    <Image
                                        src={provider.icon!}
                                        width={20}
                                        height={20}
                                        alt="logo"
                                    /> Sign {type === 'signin' ? 'in' : 'up'} with {provider.name}
                                </span>}
                        </Button>
                    </form>
                ))}
            </div>

            <div className="text-sm w-full flex items-center justify-center mt-4 text-white">

                {type === 'signin' && (
                    <p>
                        Don&apos;t have an account?
                        <Link href={'/signup'} className="text-purple-primary">
                            &nbsp; Sign Up
                        </Link>
                    </p>
                )}



                {type === 'signup' && (
                    <p>
                        Already have an account?
                        <Link href={'/signin'} className="text-purple-primary">
                            &nbsp; Sign In
                        </Link>
                    </p>
                )}

            </div>
        </div>
    )
}

export default AuthForm







