import { z } from "zod";
import { Ad, User } from "../../generated/prisma/client";
import { AD_NAME_VALIDATOR } from "@/lib/validators/ad-validator";
export interface AdWithUser extends Ad {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    createdAt: Date;
  };
}

// Category Schema
export const createCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z.string().url(),
});

// SubCategory Schema
export const createSubCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  categoryId: z.string().cuid(),
});

// Ad Schema
export const createAdSchema = z.object({
  title: AD_NAME_VALIDATOR,
  description: z.string(),
  categoryId: z.string().cuid(),
  price: z.number().positive().multipleOf(0.01),
  location: z.string(),
  pinCode: z.number().int().positive(),
  phone: z.string().max(15),
  organization: z.string().optional(),
  link: z.string().url(),
  platform: z.string(),
  expiredAt: z.date(),
  userId: z.number().int().positive(),
  subCategoryId: z.string().cuid().optional(),
});

// Update Ad Schema
export const updateAdSchema = createAdSchema.partial().extend({
  id: z.string().cuid(),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().cuid(),
});

export const updateSubCategorySchema = createSubCategorySchema
  .partial()
  .extend({
    id: z.string().cuid(),
  });

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CreateSubCategoryInput = z.infer<typeof createSubCategorySchema>;
export type UpdateSubCategoryInput = z.infer<typeof updateSubCategorySchema>;
export type CreateAdInput = z.infer<typeof createAdSchema>;
export type UpdateAdInput = z.infer<typeof updateAdSchema>;
export type CreateBlogSubCategoryInput = z.infer<
  typeof createSubCategorySchema
>;
export type CreateBlogCategoryInput = z.infer<typeof createCategorySchema>;
