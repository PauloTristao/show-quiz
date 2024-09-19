import * as SQLite from "expo-sqlite/next";

export async function getDbConnection() {
  const cx = await SQLite.openDatabaseAsync("dbQuiz.db");
  return cx;
}
