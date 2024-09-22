import * as dbService from "./dbService";

export async function getAllThemes() {
  let dbCx; // Declara a conexão fora do try
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
    return []; // Retorna um array vazio em caso de erro
  } finally {
    if (dbCx) {
      await dbCx.closeAsync(); // Fecha a conexão se foi aberta
    }
  }
}

export async function addTheme(theme) {
  let dbCx; // Declara a conexão fora do try
  try {
    dbCx = await dbService.getDbConnection();
    let query = "insert into tbThemes (ThemeId, Description) values (?,?)";
    const result = await dbCx.runAsync(query, [
      theme.themeId,
      theme.description,
    ]);
    return result.changes == 1; // Retorna true se a inserção foi bem-sucedida
  } catch (e) {
    console.log("Erro ao adicionar tema:" + e.toString());
    return false; // Retorna false se houver falha
  } finally {
    if (dbCx) {
      await dbCx.closeAsync(); // Fecha a conexão se foi aberta
    }
  }
}

export async function updateTheme(theme) {
  let dbCx; // Declara a conexão fora do try
  try {
    dbCx = await dbService.getDbConnection();
    let query = "update tbThemes set Description=? where ThemeId=?";
    const result = await dbCx.runAsync(query, [
      theme.description,
      theme.themeId,
    ]);
    return result.changes == 1; // Retorna true se a atualização foi bem-sucedida
  } catch (e) {
    console.log("Erro ao atualizar tema:" + e.toString());
    return false; // Retorna false se houver falha
  } finally {
    if (dbCx) {
      await dbCx.closeAsync(); // Fecha a conexão se foi aberta
    }
  }
}

export async function deleteTheme(themeId) {
  let dbCx; // Declara a conexão fora do try
  try {
    dbCx = await dbService.getDbConnection();
    let query = "delete from tbThemes where ThemeId=?";
    const result = await dbCx.runAsync(query, themeId);
    return result.changes == 1; // Retorna true se a deleção foi bem-sucedida
  } catch (e) {
    console.log("Erro ao deletar tema:" + e.toString());
    return false; // Retorna false se houver falha
  } finally {
    if (dbCx) {
      await dbCx.closeAsync(); // Fecha a conexão se foi aberta
    }
  }
}

export async function deleteAllThemes() {
  let dbCx; // Declara a conexão fora do try
  try {
    dbCx = await dbService.getDbConnection();
    let query = "delete from tbThemes";
    await dbCx.execAsync(query);
  } catch (e) {
    console.log("Erro ao deletar todos os temas:" + e.toString());
  } finally {
    if (dbCx) {
      await dbCx.closeAsync(); // Fecha a conexão se foi aberta
    }
  }
}
