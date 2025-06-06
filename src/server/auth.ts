import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";

import { Role } from "../../generated/prisma";

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
      name: "firstname",
    },
    additionalFields: {
      lastname: {
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
