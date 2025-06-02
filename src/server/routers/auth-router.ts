import { publicProcedure } from "../jstack";
import { se } from "better-auth";

export const authRoouter = j.router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    const auth = await c;
  }),
});
