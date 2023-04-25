import { z } from "zod";

export const getMealByIdInput = z.object({
    mealId: z.string().min(1),
});

export type GetMealByIdInput = z.infer<typeof getMealByIdInput>;

export const getMealByIdOutput = z.object({
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
        })
    ),
});

export type GetMealByIdOutput = z.infer<typeof getMealByIdOutput>;
