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

// Blog Category Schema

// Types

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
