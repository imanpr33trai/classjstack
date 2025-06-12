import { auth } from "../auth";
import { j, privateProcedure, publicProcedure } from "../jstack";
import { Auth, User } from "better-auth";
import { authClient } from "../../lib/authClient";
import { headers } from "next/headers";
import { db } from "@/db";

export const authRouter = j.router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    const user = await auth.api.getSession({
      headers: await headers(),
    });
    if (!user) {
      return c.json({ isSynced: false });
    }
    const dbUser = await db.user.findFirst({
      where: { id: user.user.id },
    });
    console.log("USER IN DB:", dbUser);

    if (!dbUser) {
      console.log("Creating user in DB");
    }

    return c.json({ isSynced: true });
  }),
});
