
import { z } from "zod";

export const MomentSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }).optional(),
    text: z.string().min(5, { message: "Text must be at least 5 characters" }).optional(),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }).optional(),
    bgColor: z.string().optional(),
    assets: z.array(z.custom<File>().or(z.string())).optional(),
}).refine((data) =>{
    if (!data.assets && !data.text) {
        return {
            message: "Either assets or text must be provided",
            path: ["assets", "text"]
        }
    }

    if (data.assets && data.text) {
        return {
            message: "Only one of assets or text can be provided",
            path: ["assets", "text"]
        }
    }

    if (data.assets && !data.altText) {
        return {
            message: "If assets are provided, alt text must be provided",
            path: ["altText"]
        }
    }

    if (data.text && !data.bgColor) {
        return {
            message: "If text is provided, background color must be provided",
            path: ["bgColor"]
        }
    }

    if (data.text && data.caption){
        return {
            message: "If text is provided, caption must not be provided",
            path: ["caption"]
        }
    }
}) 

// text ya assets honay chahiye
// assets agar hon to alt text bhi honi chahiye
// text hon to bgcolor bhi hona chahiye