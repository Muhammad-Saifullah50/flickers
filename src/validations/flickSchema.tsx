import { z } from "zod";

export const FlickSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }),
    videoUrl: z.custom<File>().or(z.string().min(1, { message: "Video URL is required" })), 
    hashtags: z.string().optional()
})

export const FlickEditingSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }),
    videoUrl: z.custom<File>().or(z.string()).optional(),
    hashtags: z.string().optional()
})