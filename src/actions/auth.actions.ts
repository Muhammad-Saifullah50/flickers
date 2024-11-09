'use server'

import { signIn } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Provider } from "@/types"
import { authSchema } from "@/validations/authFormSchema"
import { AuthError } from "next-auth"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

const signInSchema = authSchema('signin');
const signUpSchema = authSchema('signup');


export const signInWithOAuthProvider = async (provider: Provider, callbackUrl: string) => {
    try {
        await signIn(provider.id, {
            redirectTo: callbackUrl ?? "/",
        })
    } catch (error) {

        if (error instanceof AuthError) {
            //todo: have to redirect to error page
            // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
        }

        throw error
    }
}

export const signUpWithCredentials = async (formData: z.infer<typeof signUpSchema>) => {

    const userExists = await prisma.user.findUnique({
        where: {
            email: formData.email,
        }
    });
    if (userExists) {
        throw new Error("User already exists")
    };

    await prisma.user.create({
        data: {
            //@ts-ignore
            name: formData.name,
            email: formData.email,
            password: await bcrypt.hash(formData.password, 10),
        }
    });
    redirect(`/signin`);
}