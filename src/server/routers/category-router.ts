import { db } from "@/db";
import { adminProcedure, j, publicProcedure } from "../jstack";
import { z } from "zod";
import { createAdSchema, createCategorySchema } from "@/types/ads";

export const categoryRouter = j.router({
  getAllCategory: publicProcedure.query(async ({ c }) => {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        subCategories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
    return c.superjson(categories);
  }),

  getSubCategories: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
      })
    )
    .query(async ({ input, c }) => {
      const subcategories = await db.subCategory.findMany({
        where: {
          categoryId: input.categoryId,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });
      return c.superjson(subcategories);
    }),

  getCategoryBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, c, ctx }) => {
      const category = await db.category.findFirst({
        where: {
          slug: input.slug,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
          updatedAt: true,
          subCategories: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return c.superjson(category);
    }),
  createAdCategory: adminProcedure
    .input(createCategorySchema)
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx;
      const category = await db.category.create({
        data: {
          name: input.name,
          slug: input.slug,
          image: input.image,
        },
      });
      return c.json({ category });
    }),
});
