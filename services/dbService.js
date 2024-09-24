import * as SQLite from "expo-sqlite/next";

export async function getDbConnection() {
  try {
    const cx = await SQLite.openDatabaseAsync("dbQuiz.db");
    return cx;
  } catch (e) {
    console.log(
      "Erro ao abrir a conexão com o banco de dados: " + e.toString()
    );
    throw e;
  }
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

  let cx;
  try {
    cx = await getDbConnection();
    await cx.execAsync(query1);
    await cx.execAsync(query2);
    await cx.execAsync(query3);
  } catch (e) {
    console.log("Erro ao criar tabelas: " + e.toString());
  } finally {
    if (cx) {
      await cx.closeAsync();
    }
  }
}

export async function generateInitialData() {
  const themes = [
    { id: "theme1", description: "Esporte" },
    { id: "theme2", description: "Filmes/Televisão" },
    { id: "theme3", description: "Geografia" },
  ];

  const questions = [
    {
      id: "q1",
      description: "Qual é o esporte mais popular do mundo?",
      themeId: "theme1",
      answers: [
        { id: "q1a1", description: "Futebol", isCorrect: 1 },
        { id: "q1a2", description: "Basquete", isCorrect: 0 },
        { id: "q1a3", description: "Críquete", isCorrect: 0 },
        { id: "q1a4", description: "Vôlei", isCorrect: 0 },
      ],
    },
    {
      id: "q2",
      description: "Qual país sediou a Copa do Mundo de 2014?",
      themeId: "theme1",
      answers: [
        { id: "q2a1", description: "Brasil", isCorrect: 1 },
        { id: "q2a2", description: "Alemanha", isCorrect: 0 },
        { id: "q2a3", description: "África do Sul", isCorrect: 0 },
        { id: "q2a4", description: "França", isCorrect: 0 },
      ],
    },
    {
      id: "q3",
      description: "Quantas jogadoras formam um time de vôlei?",
      themeId: "theme1",
      answers: [
        { id: "q3a1", description: "6", isCorrect: 1 },
        { id: "q3a2", description: "5", isCorrect: 0 },
        { id: "q3a3", description: "7", isCorrect: 0 },
        { id: "q3a4", description: "8", isCorrect: 0 },
      ],
    },
    {
      id: "q4",
      description: "Qual é o esporte mais praticado no mundo?",
      themeId: "theme1",
      answers: [
        { id: "q4a1", description: "Futebol", isCorrect: 1 },
        { id: "q4a2", description: "Tênis", isCorrect: 0 },
        { id: "q4a3", description: "Basquete", isCorrect: 0 },
        { id: "q4a4", description: "Natação", isCorrect: 0 },
      ],
    },
    {
      id: "q5",
      description: "Qual é o maior evento esportivo do mundo?",
      themeId: "theme1",
      answers: [
        { id: "q5a1", description: "Olimpíadas", isCorrect: 1 },
        { id: "q5a2", description: "Copa do Mundo", isCorrect: 0 },
        { id: "q5a3", description: "Super Bowl", isCorrect: 0 },
        { id: "q5a4", description: "Tour de France", isCorrect: 0 },
      ],
    },
    {
      id: "q6",
      description: "Quem ganhou o Oscar de Melhor Filme em 2020?",
      themeId: "theme2",
      answers: [
        { id: "q6a1", description: "Parasita", isCorrect: 1 },
        { id: "q6a2", description: "1917", isCorrect: 0 },
        { id: "q6a3", description: "Coringa", isCorrect: 0 },
        {
          id: "q6a4",
          description: "Era uma vez em... Hollywood",
          isCorrect: 0,
        },
      ],
    },
    {
      id: "q7",
      description:
        "Qual filme é baseado em uma história real de um gênio da matemática?",
      themeId: "theme2",
      answers: [
        { id: "q7a1", description: "O Jogo da Imitação", isCorrect: 1 },
        { id: "q7a2", description: "Uma Mente Brilhante", isCorrect: 0 },
        { id: "q7a3", description: "A Rede Social", isCorrect: 0 },
        { id: "q7a4", description: "A Teoria de Tudo", isCorrect: 0 },
      ],
    },
    {
      id: "q8",
      description:
        "Qual série de TV apresenta um grupo de amigos vivendo em Nova York?",
      themeId: "theme2",
      answers: [
        { id: "q8a1", description: "Friends", isCorrect: 1 },
        { id: "q8a2", description: "How I Met Your Mother", isCorrect: 0 },
        { id: "q8a3", description: "The Big Bang Theory", isCorrect: 0 },
        { id: "q8a4", description: "Brooklyn Nine-Nine", isCorrect: 0 },
      ],
    },
    {
      id: "q9",
      description: "Qual é o filme mais rentável de todos os tempos?",
      themeId: "theme2",
      answers: [
        { id: "q9a1", description: "Avatar", isCorrect: 1 },
        { id: "q9a2", description: "Titanic", isCorrect: 0 },
        {
          id: "q9a3",
          description: "Star Wars: O Despertar da Força",
          isCorrect: 0,
        },
        { id: "q9a4", description: "Os Vingadores", isCorrect: 0 },
      ],
    },
    {
      id: "q10",
      description: "Quem interpretou o personagem Jack Dawson em Titanic?",
      themeId: "theme2",
      answers: [
        { id: "q10a1", description: "Leonardo DiCaprio", isCorrect: 1 },
        { id: "q10a2", description: "Brad Pitt", isCorrect: 0 },
        { id: "q10a3", description: "Johnny Depp", isCorrect: 0 },
        { id: "q10a4", description: "Tom Cruise", isCorrect: 0 },
      ],
    },
    {
      id: "q11",
      description: "Qual é a capital da França?",
      themeId: "theme3",
      answers: [
        { id: "q11a1", description: "Paris", isCorrect: 1 },
        { id: "q11a2", description: "Londres", isCorrect: 0 },
        { id: "q11a3", description: "Berlim", isCorrect: 0 },
        { id: "q11a4", description: "Madri", isCorrect: 0 },
      ],
    },
    {
      id: "q12",
      description: "Qual país tem a maior população do mundo?",
      themeId: "theme3",
      answers: [
        { id: "q12a1", description: "China", isCorrect: 1 },
        { id: "q12a2", description: "Índia", isCorrect: 0 },
        { id: "q12a3", description: "Estados Unidos", isCorrect: 0 },
        { id: "q12a4", description: "Indonésia", isCorrect: 0 },
      ],
    },
    {
      id: "q13",
      description: "Qual é o deserto mais extenso do mundo?",
      themeId: "theme3",
      answers: [
        { id: "q13a1", description: "Deserto da Antártica", isCorrect: 1 },
        { id: "q13a2", description: "Deserto do Saara", isCorrect: 0 },
        { id: "q13a3", description: "Deserto de Gobi", isCorrect: 0 },
        { id: "q13a4", description: "Deserto de Kalahari", isCorrect: 0 },
      ],
    },
    {
      id: "q14",
      description: "Qual continente é conhecido como o berço da civilização?",
      themeId: "theme3",
      answers: [
        { id: "q14a1", description: "África", isCorrect: 1 },
        { id: "q14a2", description: "Ásia", isCorrect: 0 },
        { id: "q14a3", description: "Europa", isCorrect: 0 },
        { id: "q14a4", description: "América", isCorrect: 0 },
      ],
    },
    {
      id: "q15",
      description: "Qual é o maior oceano do mundo?",
      themeId: "theme3",
      answers: [
        { id: "q15a1", description: "Oceano Pacífico", isCorrect: 1 },
        { id: "q15a2", description: "Oceano Atlântico", isCorrect: 0 },
        { id: "q15a3", description: "Oceano Índico", isCorrect: 0 },
        { id: "q15a4", description: "Oceano Ártico", isCorrect: 0 },
      ],
    },
  ];

  let cx;
  try {
    cx = await getDbConnection();

    const existingThemes = await cx.getAllAsync("SELECT * FROM tbThemes");
    if (existingThemes.length === 0) {
      for (const theme of themes) {
        await cx.runAsync(
          `INSERT INTO tbThemes (ThemeId, Description) VALUES (?, ?)`,
          [theme.id, theme.description]
        );
      }
    }

    for (const question of questions) {
      const existingQuestion = await cx.getAllAsync(
        `SELECT * FROM tbQuestions WHERE QuestionId = ?`,
        [question.id]
      );

      if (existingQuestion.length === 0) {
        await cx.runAsync(
          `INSERT INTO tbQuestions (QuestionId, Description, ThemeId) VALUES (?, ?, ?)`,
          [question.id, question.description, question.themeId]
        );
      }
    }

    for (const question of questions) {
      for (const answer of question.answers) {
        await cx.runAsync(
          `INSERT OR IGNORE INTO tbAnswers (AnswerId, Description, IsCorrect, QuestionId) VALUES (?, ?, ?, ?)`,
          [answer.id, answer.description, answer.isCorrect, question.id]
        );
      }
    }
  } catch (e) {
    console.log("Erro ao inserir dados iniciais: " + e.toString());
  } finally {
    if (cx) {
      await cx.closeAsync();
    }
  }
}
