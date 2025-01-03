import { z } from "zod";

export const messageSchema = z.object({
    message: z.string().min(1, { message: 'Message cannot be empty' }).optional(),
    image: z.string().min(1, { message: 'Image cannot be empty' }).optional(),
}).refine((data) => data.message || data.image, { message: "Message or image is required." });