import React, { createContext, useState } from "react";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [questionsGame, setQuestionsGame] = useState([]);

  return (
    <QuestionContext.Provider
      value={{ questions, setQuestions, questionsGame, setQuestionsGame }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
