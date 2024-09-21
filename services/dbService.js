import * as SQLite from "expo-sqlite/next";

export async function getDbConnection() {
  const cx = await SQLite.openDatabaseAsync("dbQuiz.db");
  return cx;
}

export async function createTables() {
  const query1 = `CREATE TABLE IF NOT EXISTS tbQuestions
  (
    QuestionId TEXT NOT NULL PRIMARY KEY,
    Description TEXT NOT NULL,
    ThemeId TEXT NOT NULL,
    FOREIGN KEY (ThemeId) REFERENCES tbThemes(ThemeId)
  );`;

  const query2 = `CREATE TABLE IF NOT EXISTS tbThemes
  (
    ThemeId TEXT NOT NULL PRIMARY KEY,
    Description TEXT NOT NULL
  );`;

  const query3 = `CREATE TABLE IF NOT EXISTS tbAnswers
  (
    AnswerId TEXT NOT NULL PRIMARY KEY,
    Description TEXT NOT NULL,
    IsCorrect INTEGER NOT NULL,  -- Booleano: 0 ou 1
    QuestionId TEXT NOT NULL,
    FOREIGN KEY (QuestionId) REFERENCES tbQuestions(QuestionId)
  );`;

  var cx = await getDbConnection();
  await cx.execAsync(query1);
  await cx.execAsync(query2);
  await cx.execAsync(query3);
  await cx.closeAsync();
}
