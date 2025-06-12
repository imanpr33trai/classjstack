import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  user: {
    fields: {
      name: "firstName",
    },
    additionalFields: {
      lastName: {
        type: "string",
        required: true,
      },
      role: {
        type: "string",
        required: false,
        input: false,
        defaultValue: "USER",
      },
    },
  },

  plugins: [nextCookies()],
});
