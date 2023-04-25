import { createTRPCRouter } from "@/server/api/trpc";

import { userRouter } from "./routers/user";
import { userNutritionalStatsRouter } from "./routers/usernutritionalstats";
import { mealRouter } from "./routers/meals";
import { ingredientsRouter } from "./routers/ingredients";

/**
 * This is the primary router for the server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  userNutritionalStats: userNutritionalStatsRouter,
  meals: mealRouter,
  ingredients: ingredientsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
