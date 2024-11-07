import { z } from "zod";

export const signInSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email("Invalid email address."),
    password: z.string().min(2, {
        message: "password must be at least 8 characters.",
    }),
})