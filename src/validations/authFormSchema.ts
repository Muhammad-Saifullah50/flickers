import { z } from "zod";

const signUpSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email("Invalid email address."),
    password: z.string().min(2, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })

}).refine((data) => data.password !== data.confirmPassword, {
    message: "Password and confirm password do not match.",
})

const signInSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(2, {
        message: "Please enter a password.",
    }),

})

export const authSchema = (type: 'signin' | 'signup') => {
    if (type === 'signin') {
        return signInSchema
    }
    return signUpSchema
}