import { z } from "zod";

export const messageSchema = z.object({
    message: z.string().min(1, { message: 'Message cannot be empty' }).optional(),
    images: z.array(z.custom<File>().or(z.string())).optional(),
}).refine((data) => data.message || data.images && (data.images.length > 0), { message: "Message or image is required." });