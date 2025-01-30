import { z } from 'zod';

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    bio: z.string().optional(),
    image: z.string().or(z.custom<File>()).optional(),
});

export default profileSchema;