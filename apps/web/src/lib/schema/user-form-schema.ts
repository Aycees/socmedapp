import z from "zod";

export const userFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    bio: z.string().max(50, "Limited to 50 characters only").optional(),
    avatarUrl: z.string().optional(),
  });