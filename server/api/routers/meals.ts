import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { spoonacularMeal } from "@/types";
import { GetRecipeByID } from "@/types/Spoonacular/GetRecipeByID";
import { Ingredients } from "@prisma/client";
import { getMealsByComplexQueryInput, getMealsByComplexQueryOutput } from "../zodTypes/getMealsByComplexQuery";

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

            console.log(suggestedMeals);
            return suggestedMeals;
        }),

    getMealById: protectedProcedure
        .input(z.object({ mealId: z.string().min(1) }))
        .query(async ({ ctx, input }) => {
            const mealDetails = await fetch(
                `https://api.spoonacular.com/recipes/${input.mealId}/information?includeNutrition=true&apiKey=${process.env.SPOONACULAR_API_KEY}`
            )
                .then((response) => response.json())
                .then((data) => {
                    return data as GetRecipeByID;
                });
            return mealDetails;
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
                    // console.log(data)
                    const parsedData = getMealsByComplexQueryOutput.parse(data);
                    return parsedData;
                });
            return meals;
        }),

    createMeal: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                spoonacularId: z.number(),
                title: z.string(),
                servedAtDay: z.date(),
                servedAtTime: z.string(),
                steps: z.array(z.string()),
                image: z.string(),
                ingredients: z.array(
                    z.object({
                        name: z.string(),
                        amount: z.number(),
                        unit: z.string(),
                    })
                ),
                nutrition: z.object({
                    calories: z.number(),
                    carbs: z.number(),
                    fat: z.number(),
                    protein: z.number(),                    
                }),
            })
        )
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
                    Users: {
                        connect: {
                            id: input.userId,
                        },
                    },
                },
            });
            return meal;
        }),

        getMealsByDateRange: protectedProcedure
        .input( z.object({ dateFrom: z.date(), dateTo: z.date() }))
        .query(async ({ ctx, input }) => {
            const meals = await ctx.prisma.meal.findMany({
                where: {
                    Users: {
                        some: {
                            id: ctx.session.user.id
                        },
                    },
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
        })
});
