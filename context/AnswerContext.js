import React, { createContext, useState } from "react";

export const AnswerContext = createContext();

export const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);

  return (
    <AnswerContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswerContext.Provider>
  );
};
