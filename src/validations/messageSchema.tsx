import { z } from "zod";

export const messageSchema = z.object({
    message: z.string().optional(),
    assets: z.array(z.custom<File>().or(z.string())).optional(),
}).refine((data) => data.message || (data.assets && data.assets.length > 0), { message: "Message or image is required." });