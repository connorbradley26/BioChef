import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ctx}) => {
        const user = await ctx.prisma.user.findMany();
        if (!user) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'No users found'
            });
        }
        return user;
    }),

    example: publicProcedure.query(async ({ctx}) => {
        return "Hello!"
    })
});