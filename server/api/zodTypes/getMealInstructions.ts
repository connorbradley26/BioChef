import { z } from "zod";

export const getMealInstructionsInput = z.object({
    mealId: z.number(),
});

export type GetMealInstructionsInput = z.infer<typeof getMealInstructionsInput>;

export const getMealInstructionsOutput = z.array(
    z.object({
        name: z.string(),
        steps: z.array(
            z.object({
                ingredients: z.array(
                    z.object({
                        id: z.number(),
                        name: z.string(),
                        image: z.string(),
                    })
                ),
                number: z.number(),
                step: z.string(),
            })
        ),
    })
);

export type GetMealInstructionsOutput = z.infer<typeof getMealInstructionsOutput>;