import { z } from "zod";

export const PostSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }),
    assets: z.array(z.custom<File>().or(z.string())).min(1, { message: "At least one image or video is required" }),
    hashtags: z.string().optional()
})

export const PostEditingSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }),
    assets: z.array(z.custom<File>().or(z.string())).optional(),
    hashtags: z.string().optional()
})