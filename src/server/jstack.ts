import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack";
import { db } from "@/db";
import type { Context } from "hono";
import { auth } from "./auth";
import { headers } from "next/headers";

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
});
/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure;
export const privateProcedure = j.procedure.use(authMiddleware);
