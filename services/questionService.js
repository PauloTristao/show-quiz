import * as dbService from "./dbService.js";

export async function getAllQuestions() {
  let dbCx; // Declara a conexão fora do try
  try {
    var retorno = [];
    dbCx = await dbService.getDbConnection();
    console.log("Teste");
    const registros = await dbCx.getAllAsync("SELECT * FROM tbQuestions");
    console.log("Teste");
    for (const registro of registros) {
      let obj = {
        questionId: registro.QuestionId,
        descricao: registro.Descricao,
        themeId: registro.ThemeId,
      };
      retorno.push(obj);
    }
    console.log("Teste");
    return retorno;
  } catch (e) {
    console.log("Erro no questionService:" + e.toString());
  } finally {
    if (dbCx) {
      await dbCx.closeAsync(); // Só fecha a conexão se ela foi aberta
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
    return false; // Retorna false se houver falha
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
