import { baseProcedure } from "../init";

export const getSnapshotProcedure = baseProcedure.query(
  ({ ctx: { database } }) => {
    try {
      const query = "SELECT id, snapshot FROM snapshots WHERE id = 1";
      const getSnapshot = database.prepare(query);
      const snapshot = getSnapshot.get() as {
        id: number;
        snapshot: string;
      };

      return snapshot ?? {};
    } catch (error) {
      throw new Error(`Failed to fetch snapshot: ${error}`);
    }
  }
);

export const setSnapshotProcedure = baseProcedure
  .input(Object)
  .mutation(({ input, ctx: { database } }) => {
    try {
      const query = `INSERT INTO snapshots (id, snapshot) VALUES (?, ?)
                     ON CONFLICT(id) DO UPDATE SET snapshot = excluded.snapshot`;

      const insertSnapshot = database.prepare(query);
      const result = insertSnapshot.run(1, JSON.stringify(input));

      return { success: true, changes: result.changes };
    } catch (error) {
      throw new Error(`Failed to save snapshot: ${error}`);
    }
  });

export const deleteSnapshotProcedure = baseProcedure.mutation(
  ({ ctx: { database } }) => {
    try {
      const query = `DELETE FROM snapshots WHERE id = 1`;

      const deleteSnapshot = database.prepare(query);
      const result = deleteSnapshot.run();

      return { success: true, changes: result.changes };
    } catch (error) {
      throw new Error(`Failed to delete snapshot: ${error}`);
    }
  }
);
