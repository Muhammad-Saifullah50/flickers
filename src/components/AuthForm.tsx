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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleCredentialSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" {...field} />
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
                                    <Input placeholder="abc@example.com" {...field} />
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
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sign In</Button>

                </form>
            </Form>

            {Object.values(providerMap).map((provider) => (
                <form
                    key={provider.id}
                    action={() => handleOAuthSubmit(provider)}
                >
                    <Button type="submit">
                        <span>Sign in with {provider.name}</span>
                    </Button>
                </form>
            ))}
        </div>
    )
}

export default AuthForm







