import React, { createContext, useState } from "react";

export const AnswerContext = createContext();

export const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);
  const [answersGame, setAnswersGame] = useState([]);

  return (
    <AnswerContext.Provider
      value={{ answers, setAnswers, answersGame, setAnswersGame }}
    >
      {children}
    </AnswerContext.Provider>
  );
};
