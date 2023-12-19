// Provisory

"use client";

import { useEffect, useState, createContext } from "react";

type ThemeContextProps = {
  theme: string | null;
  alternateTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: "",
  alternateTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string | null>("dark");

  function alternateTheme() {
    const newTheme = theme === "" ? "dark" : "";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        alternateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
export const ThemeConsumer = ThemeContext.Consumer;
