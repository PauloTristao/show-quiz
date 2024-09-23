import * as dbService from "./dbService.js";

export async function getAllAnswers() {
  let dbCx;
  try {
    var retorno = [];
    dbCx = await dbService.getDbConnection();
    const registros = await dbCx.getAllAsync("SELECT * FROM tbAnswers");

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
  } catch (e) {
    console.log("Erro no answerService:" + e.toString());
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function addAnswer(answer) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query =
      "insert into tbAnswers (AnswerId, Description, IsCorrect, QuestionId) values (?,?,?,?)";
    const result = await dbCx.runAsync(query, [
      answer.answerId,
      answer.description,
      answer.isCorrect,
      answer.questionId,
    ]);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao adicionar resposta:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function updateAnswer(answer) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query =
      "update tbAnswers set Description=?, IsCorrect=?, QuestionId=? where AnswerId=?";
    const result = await dbCx.runAsync(query, [
      answer.description,
      answer.isCorrect,
      answer.questionId,
      answer.answerId,
    ]);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao atualizar resposta:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function deleteAnswer(answerId) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query = "delete from tbAnswers where AnswerId=?";
    const result = await dbCx.runAsync(query, answerId);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao deletar resposta:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function deleteAnswers(answersToDelete) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    await Promise.all(
      answersToDelete.map(async (answer) => {
        const query = "DELETE FROM tbAnswers WHERE AnswerId=?";
        await dbCx.runAsync(query, answer.answerId);
      })
    );
  } catch (e) {
    console.log("Erro ao deletar respostas:" + e.toString());
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function deleteAllAnswers() {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query = "delete from tbAnswers";
    await dbCx.execAsync(query);
  } catch (e) {
    console.log("Erro ao deletar todas as respostas:" + e.toString());
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}
