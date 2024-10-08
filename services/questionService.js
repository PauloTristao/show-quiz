import * as dbService from "./dbService.js";

export async function getAllQuestions() {
  let dbCx;
  try {
    var retorno = [];
    dbCx = await dbService.getDbConnection();
    const registros = await dbCx.getAllAsync("SELECT * FROM tbQuestions");
    for (const registro of registros) {
      let obj = {
        questionId: registro.QuestionId,
        description: registro.Description,
        themeId: registro.ThemeId,
      };
      retorno.push(obj);
    }
    return retorno;
  } catch (e) {
    console.log("Erro no questionService:" + e.toString());
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function addQuestion(question) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query =
      "insert into tbQuestions (QuestionId, Description, ThemeId) values (?,?,?)";
    const result = await dbCx.runAsync(query, [
      question.questionId,
      question.description,
      question.themeId,
    ]);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao adicionar pergunta:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function updateQuestion(question) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query =
      "update tbQuestions set Description=?, ThemeId=? where QuestionId=?";
    const result = await dbCx.runAsync(query, [
      question.description,
      question.themeId,
      question.questionId,
    ]);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao atualizar pergunta:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function deleteQuestion(questionId) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query = "delete from tbQuestions where QuestionId=?";
    const result = await dbCx.runAsync(query, questionId);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao deletar pergunta:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function deleteAllQuestions() {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query = "delete from tbQuestions";
    await dbCx.execAsync(query);
  } catch (e) {
    console.log("Erro ao deletar todas as perguntas:" + e.toString());
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}
