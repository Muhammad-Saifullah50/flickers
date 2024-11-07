import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email("Invalid email address."),
    password: z.string().min(2, {
        message: "Password must be at least 8 characters.",
    }),
})