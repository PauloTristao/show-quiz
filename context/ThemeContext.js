import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themes, setThemes] = useState([]);

  return (
    <ThemeContext.Provider value={{ themes, setThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};
