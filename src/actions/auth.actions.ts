'use server'

import { signIn } from "@/lib/auth"
import { Provider } from "@/types"
import { signInSchema } from "@/validations/authFormSchema"
import { AuthError } from "next-auth"
import { z } from "zod"


export const signInWithCredentials = async (formData: z.infer<typeof signInSchema>) => {
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof AuthError) {
            //todo: have to redirect to error page
            // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
        }
        throw error
    }
}


export const signInWithOAuthProvider = async (provider: Provider, callbackUrl: string) => {
    try {
        await signIn(provider.id, {
            redirectTo: callbackUrl ?? "",
        })
    } catch (error) {

        if (error instanceof AuthError) {
            //todo: have to redirect to error page
            // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
        }

        throw error
    }
}
