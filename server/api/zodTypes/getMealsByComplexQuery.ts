import { z } from "zod";


export const getMealsByComplexQueryInput = 
    z.object({
        query: z.string().optional(),
        maxCalories: z.number().min(0).max(2000).optional(),
        minCalories: z.number().min(0).max(2000).optional(),
        maxCarbs: z.number().min(0).max(2000).optional(),
        minCarbs: z.number().min(0).max(2000).optional(),
        maxFat: z.number().min(0).max(2000).optional(),
        minFat: z.number().min(0).max(2000).optional(),
        maxProtein: z.number().min(0).max(2000).optional(),
        minProtein: z.number().min(0).max(2000).optional(),
        type: z.string().min(1).optional(),
        cuisine: z.string().min(1).optional(),
    });

export type GetMealsByComplexQueryInput = z.infer<typeof getMealsByComplexQueryInput>;

export const getMealsByComplexQueryOutput =
    z.object({ 
        results: z.array(
        z.object({
            id: z.number(),
            title: z.string(),
            image: z.string(),
            nutrition: z.object({
                nutrients: z.array(
                    z.object({
                        name: z.string(),
                        amount: z.number(),
                        unit: z.string(),
                    })
                ),
                ingredients: z.array(
                    z.object({
                        name: z.string(),
                        amount: z.number(),
                        unit: z.string(),
                    })
                ),
            }),
            analyzedInstructions: z.array(
                z.object({
                    name: z.string(),
                    steps: z.array(
                        z.object({
                            number: z.number(),
                            step: z.string(),
                        })
                    ),
                }),
            ),
        })
    )});

export type GetMealsByComplexQueryOutput = z.infer<typeof getMealsByComplexQueryOutput>;