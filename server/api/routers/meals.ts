import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { spoonacularMeal } from "@/types";
import { GetRecipeByID } from "@/types/Spoonacular/GetRecipeByID";
import { getMealsByComplexQueryInput, getMealsByComplexQueryOutput } from "../zodTypes/getMealsByComplexQuery";
import { createMealInput } from "../zodTypes/createMeal";
import { getMealsByDateRangeInput } from "../zodTypes/getMealsByDateRange";
import { getMealByIdInput, getMealByIdOutput } from "../zodTypes/getMealById";
import { getMealInstructionsInput, getMealInstructionsOutput } from "../zodTypes/getMealInstructions";

export const mealRouter = createTRPCRouter({

    /**
     * Public Procedure - No Authentication Required
     * As it just queries the external API, its not needed.
     * This allows us to do SSR without having to worry about authentication.
     * 
     * Should find another way to limit this, as it could be abused.
     */
    getMealById: publicProcedure
        .input(getMealByIdInput)
        .query(async ({ ctx, input }) => {
            const mealDetails = await fetch(`https://api.spoonacular.com/recipes/${input.mealId}/information?includeNutrition=true&apiKey=${process.env.SPOONACULAR_API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    const returnData = getMealByIdOutput.parse(data);
                    console.log(returnData);
                    return returnData;
                });
            return mealDetails;
        }),
        
    getMealInstructions: publicProcedure
        .input(getMealInstructionsInput)
        .query(async ({ ctx, input }) => {
            const mealInstructions = await fetch(`https://api.spoonacular.com/recipes/${input.mealId}/analyzedInstructions?apiKey=${process.env.SPOONACULAR_API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    const returnData = getMealInstructionsOutput.parse(data);
                    console.log(returnData);
                    return returnData;
                });
            return mealInstructions;
        }),


    getMealsByComplexQuery: protectedProcedure
        .input(getMealsByComplexQueryInput)
        .query(async ({ ctx, input }) => {
            // Build URL
            const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

            for (const [key, value] of Object.entries(input)) {
                if (value) {
                    url.searchParams.append(key, value as string);
                }
            }

            url.searchParams.append("apiKey", process.env.SPOONACULAR_API_KEY as string);
            url.searchParams.append("addRecipeNutrition", "true");
            url.searchParams.append("number", "10");

            // Fetch data
            const meals = await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const parsedData = getMealsByComplexQueryOutput.parse(data);
                    return parsedData;
                });
            return meals;
        }),

    createMeal: protectedProcedure
        .input(createMealInput)
        .mutation(async ({ ctx, input }) => {
            const meal = await ctx.prisma.meal.create({
                data: {
                    name: input.title,
                    spoonacularId: input.spoonacularId,
                    servedAtDay: input.servedAtDay,
                    servedAtTime: input.servedAtTime,
                    steps: input.steps,
                    ingredients: {
                        create: input.ingredients.map((ingredient) => {
                            return {
                                name: ingredient.name,
                                amount: ingredient.amount,
                                unit: ingredient.unit,
                            };
                        }),
                    },
                    nutrition: {
                        create: {
                            calories: input.nutrition.calories,
                            carbs: input.nutrition.carbs,
                            fat: input.nutrition.fat,
                            protein: input.nutrition.protein,
                        },
                    },
                    image: input.image,
                    userId: ctx.userId,
                },
            });
            return meal;
        }),

    getMealsByDateRange: protectedProcedure
        .input(getMealsByDateRangeInput)
        .query(async ({ ctx, input }) => {
            const meals = await ctx.prisma.meal.findMany({
                where: {
                    userId: ctx.userId,
                    servedAtDay: {
                        gte: input.dateFrom,
                        lte: input.dateTo,
                    },
                },
                include: {
                    nutrition: true,
                    ingredients: true,
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
});
