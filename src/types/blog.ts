import { z } from "zod";
export const createBlogCategorySchema = z.object({
  name: z.string(),
  image: z.string().url(),
  description: z.string().optional(),
});
export const createBlogSubcategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  categoryId: z.string().cuid(),
});

// Blog Post Schema
export const BlogPostStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createBlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  image: z.string().url().optional().nullable(),
  status: BlogPostStatusEnum.default("DRAFT"),
  publishedAt: z.date().optional().nullable(),
  userId: z.number().int().positive(),
  categoryId: z.string().cuid().optional().nullable(),
});

// Update schemas

export const updateBlogCategorySchema = createBlogCategorySchema
  .partial()
  .extend({
    id: z.string().cuid(),
  });

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  id: z.string().cuid(),
});

export type UpdateBlogCategoryInput = z.infer<typeof updateBlogCategorySchema>;
export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;

// export const getBlogPostsInputSchema = z.object({
//   page: z.number().min(1).default(1),
//   limit: z.number().min(1).max(50).default(12),
//   categoryId: z.string().optional(),
//   status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
// });
// export const getBlogPostsOutputSchema = z.object({
//   posts: z.array(blogPostSchema),
//   currentPage: z.number(),
//   totalPages: z.number(),
//   totalItems: z.number(),
// });
