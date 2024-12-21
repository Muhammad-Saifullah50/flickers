import { z } from "zod";

export const ReelSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }),
    videoUrl: z.string().min(1, { message: "One video is required" }),
    hashtags: z.string().optional()
})

export const ReelEditingSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }),
    videoUrl: z.string({ message: "One video is required" }),
    hashtags: z.string().optional()
})