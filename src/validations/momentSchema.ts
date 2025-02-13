import { z } from "zod";

export const MomentSchema = z.object({
    caption: z.string().optional(),
    text: z.string().optional(),
    altText: z.string().optional(),
    bgColor: z.string().optional(),
    assets: z.array(z.custom<File>().or(z.string())).optional(),
}).superRefine((data, ctx) => {

    const hasAssets = data.assets && data.assets.length > 0;

    if (!data.caption && !hasAssets && !data.text && !data.altText) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Fill in the fields",
            path: ["caption"]
        })
    }

    if (!data.caption && hasAssets) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Caption is required when assets are provided",
            path: ["caption"]
        })
    }
    if (data.caption && !hasAssets) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Assets are required when caption is provided",
            path: ["assets"]
        })
    }

    if (data.caption && hasAssets && !data.altText) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Alt text is required when assets are provided",
            path: ["altText"]
        })
    }

    if (data.text && !data.bgColor) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Background color is required when text is provided",
            path: ["bgColor"]
        })
    }

    if (data.text && (data.caption || hasAssets || data.altText)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Text cannot be provided when caption, assets, or alt text are present",
            path: ["text"]
        })
    }
    if (data.bgColor && (data.caption || hasAssets || data.altText)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Background color cannot be provided when caption, assets, or alt text are present",
            path: ["bgColor"]
        })
    }
})


// text ya assets honay chahiye
// assets agar hon to alt text bhi honi chahiye
// text hon to bgcolor bhi hona chahiye