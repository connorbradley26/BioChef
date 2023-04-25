import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";


export const ingredientsRouter = createTRPCRouter({
    getIngredientsByDateRange: protectedProcedure
        .input(
            z.object({
                startDate: z.date(),
                endDate: z.date(),
            })
        )
        .query(async ({ ctx, input }) => {
            const meals = await ctx.prisma.meal.findMany({
                where: {
                    AND: [
                        {
                            userId: ctx.userId,
                        },
                        {
                            servedAtDay: {
                                gte: input.startDate,
                                lte: input.endDate,
                            },
                        },
                    ],
                },
                include: {
                    ingredients: true,
                },
            });
            const ingredients = meals.flatMap((meal) => meal.ingredients);

            return ingredients;
        }),
});
