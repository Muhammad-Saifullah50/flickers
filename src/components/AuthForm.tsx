'use client'
import { providerMap } from "@/lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { signInSchema } from "@/validations/authFormSchema"
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
import { signInWithCredentials, signInWithOAuthProvider } from "../actions/auth.actions"
import { Provider } from "@/types"
import Image from "next/image"

interface AuthFormProps {
    callbackUrl: string
    type: 'signin' | 'signup'
}

const AuthForm = ({ callbackUrl, type }: AuthFormProps) => {

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    type SignInFormValues = z.infer<typeof signInSchema>;


    const handleCredentialSubmit: SubmitHandler<SignInFormValues> = async (values) => {
        await signInWithCredentials(values);
    }

    const handleOAuthSubmit = async (provider: Provider) => {
        await signInWithOAuthProvider(provider, callbackUrl);
    }

    return (
        <div className="flex flex-col gap-2">

            <div className="flex justify-center items-center gap-2">
                <Image
                    src={'/icons/logo.svg'}
                    width={25}
                    height={25}
                    alt="logo" />

                <h1 className="font-bold text-2xl">Flickers</h1>
            </div>

            <div className="p-3 flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold">Log in to your account</h3>
                <p className="text-purple-secondary font-normal text-base">Welcome back! Please enter your details.</p>
            </div>
            <Form {...form}>
                <form
                    className="w-full min-w-[400px] flex flex-col gap-4"
                    onSubmit={form.handleSubmit(handleCredentialSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem
                                className="">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="Your Name"
                                    className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0 !bg-dark-4" {...field} />
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
                                    className="focus-visible:ring-0 ring-0 border-0 focus-visible:ring-offset-0
                                    !bg-dark-4"
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                    className="rounded-lg font-semibold" type="submit">Log In</Button>

                </form>
            </Form>

            {Object.values(providerMap).map((provider) => (
                <form
                className="w-full min-w-[400px] flex flex-col gap-3 "
                    key={provider.id}
                    action={() => handleOAuthSubmit(provider)}
                >
                    <Button 
                    type="submit" 
                    variant={'white'}
                    className="rounded-lg">
                        <span className="font-semibold text-dark-4">Sign in with {provider.name}</span>
                    </Button>
                </form>
            ))}
        </div>
    )
}

export default AuthForm







