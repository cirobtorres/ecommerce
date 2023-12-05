'use client';

import { useEffect, useState, createContext } from 'react';

type ThemeContextProps = {
  theme: string | null;
  alternateTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: '',
  alternateTheme: () => {},
});

export function ThemeProvider(props: any) {
  const [theme, setTheme] = useState<string | null>('');

  function alternateTheme() {
    const newTheme = theme === '' ? 'dark' : '';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme);
  }, [])

  return (
    <ThemeContext.Provider 
      value={{
        theme,
        alternateTheme,
    }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
export const ThemeConsumer = ThemeContext.Consumer;