import * as dbservice from "./dbservice.jsx";

export async function createTable() {
  const query = `CREATE TABLE IF NOT EXISTS tbQuestions
        (
            QuestionId text not null PRIMARY KEY,
            Description text not null,
            ThemeId text not null,
            FOREIGN KEY (ThemeId) REFERENCES Themes(ThemeId)          
        )`;
  var cx = await dbservice.getDbConnection();
  await cx.execAsync(query);
  await cx.closeAsync();
}

export async function getAllQuestions() {
  var retorno = [];
  var dbCx = await dbservice.getDbConnection();
  const registros = await dbCx.getAllAsync("SELECT * FROM tbQuestions");
  await dbCx.closeAsync();

  for (const registro of registros) {
    let obj = {
      questionId: registro.QuestionId,
      descricao: registro.Descricao,
      themeId: registro.ThemeId,
    };
    retorno.push(obj);
  }

  return retorno;
}

export async function addQuestion(question) {
  let dbCx = await dbservice.getDbConnection();
  let query =
    "insert into tbQuestions (QuestionId, Description, ThemeId) values (?,?,?)";
  const result = await dbCx.runAsync(query, [
    question.questionId,
    question.description,
    question.themeId,
  ]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function updateQuestion(question) {
  let dbCx = await dbservice.getDbConnection();
  let query =
    "update tbQuestions set Description=?, ThemeId=? where QuestionId=?";
  const result = await dbCx.runAsync(query, [
    question.description,
    question.themeId,
    question.questionId,
  ]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function deleteQuestion(questionId) {
  let dbCx = await dbservice.getDbConnection();
  let query = "delete from tbQuestions where QuestionId=?";
  const result = await dbCx.runAsync(query, questionId);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function deleteAllQuestions() {
  let dbCx = await dbservice.getDbConnection();
  let query = "delete from tbQuestions";
  await dbCx.execAsync(query);
  await dbCx.closeAsync();
}
