import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invelid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  role: z.string().trim().min(1, "Role is required"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invelid email address"),
  password: z.string().trim().min(1, "Password is required"),
});
