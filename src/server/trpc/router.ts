import { createTRPCRouter } from "./init";
import {
  deleteSnapshotProcedure,
  getSnapshotProcedure,
  setSnapshotProcedure,
} from "./routes/snapshot";

export const appRouter = createTRPCRouter({
  getSnapshot: getSnapshotProcedure,
  setSnapshot: setSnapshotProcedure,
  deleteSnapshot: deleteSnapshotProcedure,
});

export type AppRouter = typeof appRouter;
