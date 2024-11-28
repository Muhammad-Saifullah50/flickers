import { z } from "zod";

export const PostSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }),
    assets: z.array(z.custom<File>()).min(1, { message: "At least one image or video is required" }),
})