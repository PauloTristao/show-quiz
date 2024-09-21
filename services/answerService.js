import * as dbService from "./dbService.js";

export async function getAllAnswers() {
  var retorno = [];
  var dbCx = await dbService.getDbConnection();
  const registros = await dbCx.getAllAsync("SELECT * FROM tbAnswers");
  await dbCx.closeAsync();

  for (const registro of registros) {
    let obj = {
      answerId: registro.AnswerId,
      description: registro.Description,
      isCorrect: registro.IsCorrect,
      questionId: registro.QuestionId,
    };
    retorno.push(obj);
  }

  return retorno;
}

export async function addAnswer(answer) {
  let dbCx = await dbService.getDbConnection();
  let query =
    "insert into tbAnswers (AnswerId, Description, IsCorrect, QuestionId) values (?,?,?,?)";
  const result = await dbCx.runAsync(query, [
    answer.answerId,
    answer.description,
    answer.isCorrect,
    answer.questionId,
  ]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function updateAnswer(answer) {
  let dbCx = await dbService.getDbConnection();
  let query =
    "update tbAnswers set Description=?, IsCorrect=?, QuestionId=? where AnswerId=?";
  const result = await dbCx.runAsync(query, [
    answer.description,
    answer.isCorrect,
    answer.questionId,
    answer.answerId,
  ]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function deleteAnswer(answerId) {
  let dbCx = await dbService.getDbConnection();
  let query = "delete from tbAnswers where AnswerId=?";
  const result = await dbCx.runAsync(query, answerId);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function deleteAllAnswers() {
  let dbCx = await dbService.getDbConnection();
  let query = "delete from tbAnswers";
  await dbCx.execAsync(query);
  await dbCx.closeAsync();
}