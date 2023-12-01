"use client";

import { useEffect, useState, createContext } from 'react';

const ThemeContext = createContext<ThemeContextProps>({
    theme: null,
    alternateTheme: () => { },
});

export function ThemeProvider(props: any) {
    const [theme, setTheme] = useState<"light" | "dark" | null>("light");

    function alternateTheme() {
        const newTheme = theme === "light" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setTheme(savedTheme as "light" | "dark");
    }, [])

    return (
        <ThemeContext.Provider value={{
            theme,
            alternateTheme,
        }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
export const ThemeConsumer = ThemeContext.Consumer;