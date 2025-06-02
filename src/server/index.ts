import { j } from "./jstack";
import { userRouter } from "./routers/user-router";
import { adsRouter } from "./routers/ads-router";
import { blogRouter } from "./routers/blog-router";
import { categoryRouter } from "./routers/category-router";

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(api, {
  user: userRouter,
  ads: adsRouter,
  blog: blogRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
