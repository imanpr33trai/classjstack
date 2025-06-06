// utils/useUser.ts
import type { Context } from "hono";

export function useUser(c: Context) {
  const user = c.get("user");
  if (!user) {
    throw new Error(
      "No user found in context. Did you forget auth middleware?"
    );
  }
  return user;
}
