import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { prisma } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

import { appRouter } from "@/server/api/root";

export const config = {
  runtime: "edge",
};

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const caller = appRouter.createCaller({
    session: null,
    prisma,
  });

  try {
    await caller.applications.runJob();

    res.status(200).json({ ok: true, timestamp: Date.now(), error: null });
  } catch (cause) {
    if (cause instanceof TRPCError) {
      const httpStatusCode = getHTTPStatusCodeFromError(cause);

      res.status(httpStatusCode).json({ error: { message: cause.message } });
      return;
    }

    res.status(500).json({
      ok: false,
      timestamp: Date.now(),
      error: { message: `Error while calling trpc server` },
    });
  }
}
