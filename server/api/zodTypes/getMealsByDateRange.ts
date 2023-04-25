import { z } from "zod";

export const getMealsByDateRangeInput = z.object({ 
    dateFrom: z.date(), 
    dateTo: z.date()
});

export type GetMealsByDateRangeInput = z.infer<typeof getMealsByDateRangeInput>;