import { z } from "zod";

export const SubCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  categoryId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  subCategories: z.array(SubCategorySchema).optional(),
});

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
  userId: z.number(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  categoryId: z.string().optional(),
});

export const BlogPostsResponseSchema = z.object({
  posts: z.array(BlogPostSchema),
  // currentPage: z.number(),
  // totalPages: z.number(),
  // totalItems: z.number(),
});

export type Category = z.infer<typeof CategorySchema>;
export type SubCategory = z.infer<typeof SubCategorySchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type BlogPostsResponse = z.infer<typeof BlogPostsResponseSchema>;
