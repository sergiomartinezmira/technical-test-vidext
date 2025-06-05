import getDB from "server/database";
import { initTRPC } from "@trpc/server";

export const createTRPCContext = () => {
  return { database: getDB() };
};
const t = initTRPC.context<typeof createTRPCContext>().create();
export const createTRPCRouter = t.router;
export const baseProcedure = t.procedure;
