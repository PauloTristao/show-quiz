import * as dbService from "./dbService";

export async function getAllThemes() {
  var retorno = [];
  var dbCx = await dbService.getDbConnection();
  const registros = await dbCx.getAllAsync("SELECT * FROM tbThemes");
  await dbCx.closeAsync();

  for (const registro of registros) {
    let obj = {
      themeId: registro.ThemeId,
      description: registro.Description,
    };
    retorno.push(obj);
  }

  return retorno;
}

export async function addTheme(theme) {
  let dbCx = await dbService.getDbConnection();
  let query = "insert into tbThemes (ThemeId, Description) values (?,?)";
  const result = await dbCx.runAsync(query, [theme.themeId, theme.description]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function updateTheme(theme) {
  let dbCx = await dbService.getDbConnection();
  let query = "update tbThemes set Description=? where ThemeId=?";
  const result = await dbCx.runAsync(query, [theme.description, theme.themeId]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function deleteTheme(themeId) {
  let dbCx = await dbService.getDbConnection();
  let query = "delete from tbThemes where ThemeId=?";
  const result = await dbCx.runAsync(query, themeId);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function deleteAllThemes() {
  let dbCx = await dbService.getDbConnection();
  let query = "delete from tbThemes";
  await dbCx.execAsync(query);
  await dbCx.closeAsync();
}
