import { db } from "@/db";
import { j, publicProcedure } from "../jstack";
import { z } from "zod";

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
    .query(async ({ input, c }) => {
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
});
