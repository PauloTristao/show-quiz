import * as dbService from "./dbService";

export async function getAllThemes() {
  let dbCx;
  try {
    var retorno = [];
    dbCx = await dbService.getDbConnection();
    const registros = await dbCx.getAllAsync("SELECT * FROM tbThemes");

    for (const registro of registros) {
      let obj = {
        themeId: registro.ThemeId,
        description: registro.Description,
      };
      retorno.push(obj);
    }

    return retorno;
  } catch (e) {
    console.log("Erro no themeService:" + e.toString());
    return [];
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function addTheme(theme) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query = "insert into tbThemes (ThemeId, Description) values (?,?)";
    const result = await dbCx.runAsync(query, [
      theme.themeId,
      theme.description,
    ]);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao adicionar tema:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function updateTheme(theme) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query = "update tbThemes set Description=? where ThemeId=?";
    const result = await dbCx.runAsync(query, [
      theme.description,
      theme.themeId,
    ]);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao atualizar tema:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function deleteTheme(themeId) {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query = "delete from tbThemes where ThemeId=?";
    const result = await dbCx.runAsync(query, themeId);
    return result.changes == 1;
  } catch (e) {
    console.log("Erro ao deletar tema:" + e.toString());
    return false;
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}

export async function deleteAllThemes() {
  let dbCx;
  try {
    dbCx = await dbService.getDbConnection();
    let query = "delete from tbThemes";
    await dbCx.execAsync(query);
  } catch (e) {
    console.log("Erro ao deletar todos os temas:" + e.toString());
  } finally {
    if (dbCx) {
      await dbCx.closeAsync();
    }
  }
}
