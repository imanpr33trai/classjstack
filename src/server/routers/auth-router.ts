import { auth } from "../auth";
import { j, publicProcedure } from "../jstack";
import { Auth,User } from "better-auth";

export const authRoouter = j.router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    const auth = await 
  }),
});
