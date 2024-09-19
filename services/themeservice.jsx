import * as dbservice from "./dbservice.jsx";

export async function createTable() {
  const query = `CREATE TABLE IF NOT EXISTS tbThemes
        (
            ThemeId text not null PRIMARY KEY,
            Description text not null,     
        )`;
  var cx = await dbservice.getDbConnection();
  await cx.execAsync(query);
  await cx.closeAsync();
}

export async function getAllThemes() {
  var retorno = [];
  var dbCx = await dbservice.getDbConnection();
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
  let dbCx = await dbservice.getDbConnection();
  let query = "insert into tbThemes (ThemeId, Description) values (?,?)";
  const result = await dbCx.runAsync(query, [theme.themeId, theme.description]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function updateTheme(theme) {
  let dbCx = await dbservice.getDbConnection();
  let query = "update tbThemes set Description=? where ThemeId=?";
  const result = await dbCx.runAsync(query, [theme.description, theme.themeId]);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function deleteTheme(themeId) {
  let dbCx = await dbservice.getDbConnection();
  let query = "delete from tbThemes where ThemeId=?";
  const result = await dbCx.runAsync(query, themeId);
  await dbCx.closeAsync();
  return result.changes == 1;
}

export async function deleteAllThemes() {
  let dbCx = await dbservice.getDbConnection();
  let query = "delete from tbThemes";
  await dbCx.execAsync(query);
  await dbCx.closeAsync();
}
