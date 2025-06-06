import { z } from "zod";
import { type Ad, User } from "../../../generated/prisma";
import { j, publicProcedure } from "../jstack";
import { db } from "@/db";

export const adsRouter = j.router({
  // Get all ads
  getAll: publicProcedure.query(async ({ c }) => {
    const ads = await db.ad.findMany({
      include: {
        user: {
          select: {
            email: true,
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        },
      },
    });
    return c.superjson(ads);
  }),

  // Get a single ad by ID
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ c, input }) => {
      const ad = await db.ad.findUnique({
        where: { id: input.id },
      });

      if (!ad) {
        throw new Error("Ad not found");
      }

      return c.superjson(ad);
    }),

  // Create a new ad
  // create: publicProcedure
  //   .input(adCreateSchema)
  //   .mutation(async ({ c, input }) => {
  //     try {
  //       const newAd = await db.ad.create({
  //         data: {
  //           description: input.description,
  //           link: input.link || "Na",
  //         },
  //       });

  //       return c.superjson(newAd);
  //     } catch (error) {
  //       if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //         throw new Error(`Database error: ${error.message}`);
  //       }
  //       throw error;
  //     }
  //   }),

  // // Update an existing ad
  // update: publicProcedure
  //   .input(adUpdateSchema)
  //   .mutation(async ({ c, input }) => {
  //     const { id, ...data } = input;

  //     try {
  //       const updatedAd = await db.ad.update({
  //         where: { id },
  //         data,
  //       });

  //       return c.superjson(updatedAd);
  //     } catch (error) {
  //       if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //         if (error.code === "P2025") {
  //           throw new Error(`Ad with ID ${id} not found`);
  //         }
  //         throw new Error(`Database error: ${error.message}`);
  //       }
  //       throw error;
  //     }
  //   }),

  // // Delete an ad
  // delete: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .mutation(async ({ c, input }) => {
  //     try {
  //       const deletedAd = await db.ad.delete({
  //         where: { id: input.id },
  //       });

  //       return c.superjson(deletedAd);
  //     } catch (error) {
  //       if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //         if (error.code === "P2025") {
  //           throw new Error(`Ad with ID ${input.id} not found`);
  //         }
  //         throw new Error(`Database error: ${error.message}`);
  //       }
  //       throw error;
  //     }
  //   }),
});
