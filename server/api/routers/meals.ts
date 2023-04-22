import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { spoonacularMeal } from "@/types";
import { GetRecipeByID } from "@/types/Spoonacular/GetRecipeByID";

export const mealRouter = createTRPCRouter({
    getAllByUserId: protectedProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input, ctx }) => {
            const meals = await ctx.prisma.meal.findMany({
                where: {
                    userId: input.userId,
                },
            });
            if (!meals) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No meals found",
                });
            }
            return meals;
        }),

    getMealSuggestionsByNutrition: protectedProcedure
        .input(
            z.object({
                maxCalories: z.number().min(0).max(2000).optional(),
                minCalories: z.number().min(0).max(2000).optional(),
                maxCarbs: z.number().min(0).max(2000).optional(),
                minCarbs: z.number().min(0).max(2000).optional(),
                maxFat: z.number().min(0).max(2000).optional(),
                minFat: z.number().min(0).max(2000).optional(),
                maxProtein: z.number().min(0).max(2000).optional(),
                minProtein: z.number().min(0).max(2000).optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const suggestedMeals = await fetch(
                `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${process.env.SPOONACULAR_API_KEY}&addRecipeInformation=true&number=10&maxCalories=${input.maxCalories}&minCalories=${input.minCalories}&maxCarbs=${input.maxCarbs}&minCarbs=${input.minCarbs}&maxFat=${input.maxFat}&minFat=${input.minFat}&maxProtein=${input.maxProtein}&minProtein=${input.minProtein}&addRecipeNutrition=true`
            )
                .then((response) => response.json())
                .then((data) => {
                    return data as spoonacularMeal[];
                });

                console.log(suggestedMeals)
            return suggestedMeals;
        }),

    getMealById: protectedProcedure
        .input(z.object({ mealId: z.string().min(1) }))
        .query(async ({ ctx, input }) => {
            const mealDetails = await fetch(`https://api.spoonacular.com/recipes/${input.mealId}/information?includeNutrition=true&apiKey=${process.env.SPOONACULAR_API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    return data as GetRecipeByID;
                });
            return mealDetails;
        }),
});
