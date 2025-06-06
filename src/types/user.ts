import { z } from "zod";
import {
  Ad,
  User,
  BlogPost as PrismaBlogPost,
  BlogCategory as PrismaBlogCategory,
  User as PrismaUser,
} from "../../generated/prisma/client";
export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  apiKey: z.string().cuid().optional(),
});

// Update User Schema
export const updateUserSchema = createUserSchema.partial().extend({
  id: z.number().int().positive(),
});

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .optional(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignUpSchema = z.infer<typeof signUpSchema>;

// Blog Category Schema

// Types

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
