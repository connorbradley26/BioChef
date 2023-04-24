import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const userNutritionalStatsRouter = createTRPCRouter({
    
    getAllByUserId: protectedProcedure
    .input( z.object({ userId: z.string() }))
    .query(async ({input, ctx}) => {
        const userStats = await ctx.prisma.userNutritionalStats.findMany({
            where: {
                userId: input.userId
            }
        });
        if (!userStats) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'No users found'
            });
        }
        return userStats;
    }),

    saveUserNutritionalStats: protectedProcedure
        .input( z.object({
            weight: z.number().optional(),
            height: z.number().optional(),
            age: z.number().optional(),
            restingHeartRate: z.number().optional(),
            Cholesterol: z.string().optional(),
            bodyFatPercentage: z.number().optional(),
            vitaminD: z.number().optional(),
            vitaminB12: z.number().optional(),
            vitaminB6: z.number().optional(),
            vitaminC: z.number().optional(),
            testosterone: z.number().optional(),
            hbA1c: z.number().optional(),
            goal: z.string().optional()
        }))
        .mutation(async ({ctx, input}) => {
            const userNutritionalStats = await ctx.prisma.userNutritionalStats.create({
                data: {
                    weight: input.weight,
                    height: input.height,
                    age: input.age,
                    restingHeartRate: input.restingHeartRate,
                    Cholesterol: input.Cholesterol,
                    bodyFatPercentage: input.bodyFatPercentage,
                    vitaminD: input.vitaminD,
                    vitaminB12: input.vitaminB12,
                    vitaminB6: input.vitaminB6,
                    vitaminC: input.vitaminC,
                    testosterone: input.testosterone,
                    hbA1c: input.hbA1c,
                    goal: input.goal,
                    userId: ctx.userId
                },
            });
            return userNutritionalStats;
        }),
});