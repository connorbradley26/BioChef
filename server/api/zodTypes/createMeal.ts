import { z } from "zod";

export const createMealInput = z.object({
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
});

export type CreateMealInput = z.infer<typeof createMealInput>;
