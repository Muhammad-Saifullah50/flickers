import { z } from "zod";

export const messageSchema = z.object({
    message: z.string().min(1, { message: 'Message cannot be empty' }).optional(),
    assetUrl: z.array(z.custom<File>().or(z.string())).optional(),
}).refine((data) => data.message || data?.assetUrl, { message: "Message or image is required." });