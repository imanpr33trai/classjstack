import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack";
import { db } from "@/db";
import type { Context } from "hono";
import { auth } from "./auth";
import { headers } from "next/headers";
import { Role } from "../../generated/prisma";

interface Env {
  Bindings: {};
}

export const j = jstack.init<Env>();

const authMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const authHeader = c.req.header("Authorization");
  if (authHeader) {
    const apiKey = authHeader.split(" ")[1];

    const user = await db.user.findUnique({
      where: { apiKey },
    });
    if (user) return next({ user });
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  return next({ user });
});

const adminMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const authHeader = c.req.header("Authorization");
  if (authHeader) {
    const apiKey = authHeader.split(" ")[1];

    const user = await db.user.findUnique({
      where: { apiKey },
    });
    if (user && user.role === "ADMIN") return next({ user });
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new HTTPException(403, {
      message: "Forbidden: Admin access required",
    });
  }
  const admin = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!admin || admin.role !== Role.ADMIN) {
    throw new HTTPException(403, {
      message: "Forbidden: Admin access required",
    });
  }
  return next({ admin });
});
/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
export const adminProcedure = privateProcedure.use(adminMiddleware);
// import { HTTPException } from "hono/http-exception";
// import { jstack } from "jstack";
// import { auth } from "./auth"; // Your better-auth instance
// import { headers } from "next/headers";

// import { Role, type User } from "../../generated/prisma";
// import { Schema } from "better-auth";

// // 1. Define the context shape that your middlewares will create.
// interface Context {
//   user?: User; // optional because not all routes require authentication
// }

// interface Env {
//   Bindings: {};
//   Context: Context;
// }

// // 2. Initialize jstack with the new environment definition.
// export const j = jstack.init<Env>();

// /**
//  * Authentication Middleware
//  *
//  * Verifies that a user is logged in via a session.
//  * It adds the `user` object to the context for subsequent procedures.
//  */
// const authMiddleware = j.middleware(async ({ next }) => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
//   const

// });

// /**
//  * Admin Authorization Middleware
//  *
//  * This should run *after* the `authMiddleware`. It checks if the
//  * authentaicated user in the context has the 'ADMIN' role.
//  */
// const adminMiddleware = j.middleware<Context>(async ({ ctx, next }) => {
//   if (!ctx.user || ctx.user.role !== Role.ADMIN) {
//     throw new HTTPException(403, {
//       message: "Forbidden: Admin access required",
//     });
//   }

//   return next();
// });

// // --- PROCEDURE EXPORTS ---

// /**
//  * Public Procedure (unauthenticated)
//  * Anyone can access these endpoints.
//  */
// export const publicProcedure = j.procedure;

// /**
//  * Private Procedure (authenticated)
//  * Requires a user to be logged in. Applies only the authentication middleware.
//  */
// export const privateProcedure = j.procedure.use(authMiddleware);

// /**
//  * Admin Procedure (authenticated & authorized)
//  * Requires a user to be logged in AND have the 'ADMIN' role.
//  * It chains the auth and admin middlewares together, ensuring both checks pass.
//  */
// export const adminProcedure = publicProcedure.use(adminMiddleware);
