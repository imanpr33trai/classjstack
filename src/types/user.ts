import { z } from "zod";
import {
  Ad,
  User,
  BlogPost as PrismaBlogPost,
  BlogCategory as PrismaBlogCategory,
  User as PrismaUser,
} from "../../generated/prisma/client";
export const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
);

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(), // Phone is optional
    password: z.string().regex(passwordValidation, {
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special characters.",
    }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  // Use .refine to validate that password and confirmPassword match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword", "password"], // Show the error on the confirmPassword field
  });

// Export the inferred type
export type SignUpSchema = z.infer<typeof signUpSchema>;
