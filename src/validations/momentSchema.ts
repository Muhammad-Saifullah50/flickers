import { z } from "zod";

export const MomentSchema = z.object({
    caption: z.string().min(5, { message: "Caption must be at least 5 characters" }).optional(),
    text: z.string().min(5, { message: "Text must be at least 5 characters" }).optional(),
    altText: z.string().min(5, { message: "Alt text must be at least 5 characters" }).optional(),
    bgColor: z.string().optional(),
    assets: z.array(z.custom<File>().or(z.string())).optional(),
}).superRefine((data, ctx) => {
    // Check if neither assets nor text is provided
    if (!data.assets?.length && !data.text) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Either assets or text must be provided",
            path: ["assets", "text"]
        });
    }

    // Check if both assets and text are provided
    if (data.assets?.length && data.text) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Only one of assets or text can be provided",
            path: ["assets", "text"]
        });
    }

    // Check if assets are provided but no alt text
    if (data.assets?.length && !data.altText) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "If assets are provided, alt text must be provided",
            path: ["altText"]
        });
    }

    // Check if text is provided but no background color
    if (data.text && !data.bgColor) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "If text is provided, background color must be provided",
            path: ["bgColor"]
        });
    }

    // Check if text and caption are both provided
    if (data.text && data.caption) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "If text is provided, caption must not be provided",
            path: ["caption"]
        });
    }
});

// text ya assets honay chahiye
// assets agar hon to alt text bhi honi chahiye
// text hon to bgcolor bhi hona chahiye