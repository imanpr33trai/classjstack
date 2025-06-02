// src/server/routers/blogCategoriesRouter.ts
import { z } from "zod";
import { publicProcedure, j } from "../jstack";
import { db } from "@/db";
import { BlogPost, BlogPostSchema } from "@/types/schema";

const blogPostInputSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(12),
  categoryId: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export const blogRouter = j.router({
  // Get all categories
  // getCategories: publicProcedure.query(async () => {
  //   return await db.category.findMany({
  //     where: {
  //       parentId: null, // Only get parent categories
  //     },
  //   });
  // }),

  // // Get subcategories by parent category ID
  // getSubCategories: publicProcedure
  //   .input(z.object({ parentId: z.string() }))
  //   .query(async ({ input }) => {
  //     return await db.category.findMany({
  //       where: {
  //         parentId: input.parentId,
  //       },
  //     });
  //   }),

  // Get blog posts with pagination and filtering
  getAll: publicProcedure
    //  .input(blogPostInputSchema)
    .query(async ({ input, c }) => {
      // const skip = (input.page - 1) * input.limit;
      // const where = {
      //   status: input.status,
      //   ...(input.categoryId && { categoryId: input.categoryId }),
      // };

      const posts = await db.blogPost.findMany({
        include: {
          category: true,

          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return c.superjson({
        posts,
      });
    }),
  // Get single blog post by ID or slug
  getBlogPost: publicProcedure
    .input(
      z.object({
        identifier: z.string(),
      })
    )
    .query(async ({ input, c }) => {
      const post = await db.blogPost.findFirst({
        where: {
          OR: [{ id: input.identifier }],
        },
        include: {
          category: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      if (!post) {
        throw new Error("Blog post not found");
      }

      return c.superjson(post);
    }),
});

// export { blogRouter };
