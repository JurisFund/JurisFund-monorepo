// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, /* protectedProcedure, */ publicProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const applicationsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const applications = await ctx.prisma.borrowersTable.findMany();
    return applications;
  }),
  getByID: publicProcedure
    .input(
      z.object({
        applicationID: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const application = await ctx.prisma.borrowersTable.findUnique({
        where: {
          id: input.applicationID,
        },
      });
      return application;
    }),
  add: publicProcedure // protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        stateLiveIn: z.string(),
        typeOfCase: z.string(),
        alreadyWorkingWithAttorney: z.string(),
        lawFirmName: z.string(),
        lawyerName: z.string(),
        expectedSettlementAmount: z.string(),
        walletAddress: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.borrowersTable.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phoneNumber: input.phoneNumber,
          stateLiveIn: input.stateLiveIn,
          typeOfCase: input.typeOfCase,
          alreadyWorkingWithAttorney: input.alreadyWorkingWithAttorney,
          lawFirmName: input.lawFirmName,
          lawyerName: input.lawyerName,
          expectedSettlementAmount: input.expectedSettlementAmount,
          walletAddress: input.walletAddress,
          caseNumber: "01",
          userId: "656345522cd7c56e95aaed85", // ctx.session.user.id,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        applicationID: z.string(),
        loanAmount: z.string(),
        interestRate: z.string(),
        lawyerWalletAddress: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.borrowersTable.update({
        where: {
          id: input.applicationID,
        },
        data: {
          loanAmount: input.loanAmount,
          fixedAPY: input.interestRate,
          lawyerWalletAddress: input.lawyerWalletAddress,
          applicationStatus: "Approved",
        },
      });
    }),
});
