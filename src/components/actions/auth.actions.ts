'use server'

import { signIn } from "@/lib/auth"
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
