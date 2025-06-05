import sqlite, { Database } from "better-sqlite3";

let database: Database | null = null;

const getDB = () => {
  if (!database) {
    // The main objective of the app is for it to provide a database for storing the snapshot of the user editor.
    // I decided to use a simple SQLite database to keep it simple to deploy and use.
    // In a real environment my choice of database would be a proper PostgreSQL with a server.
    database = new sqlite("./tldraw.db");

    // For now since we'll only use a single user that will open the app and work localy
    // we'll refrain from creating a user table or adding a key to indentify ownership
    // and we'll work directly with a single table
    const table = database.prepare(
      `CREATE TABLE IF NOT EXISTS snapshots (
    id INTEGER PRIMARY KEY,
    snapshot JSON);
  `
    );
    table.run();

    console.log("CREATING DATABASE");
  }
  return database;
};

export default getDB;
