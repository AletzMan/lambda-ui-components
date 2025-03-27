/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useLayoutEffect, ReactNode } from "react";
import { Button } from "../main";
import { MoonIcon, SunIcon } from "lucide-react";

// Tipado del contexto
interface ThemeContextProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: "light" | "dark";
}

// Crear el contexto
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = "light" }) => {
    // Estado inicial con localStorage (antes del primer render)
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        return (localStorage.getItem("theme") as "light" | "dark") || defaultTheme;
    });

    // Aplicar el tema ANTES de que React renderice (previene parpadeo)
    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    // Función para alternar entre temas
    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            document.documentElement.setAttribute("data-theme", newTheme); // Aplicar de inmediato
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    }
    return context;
};

// Componente del botón de cambio de tema
export const ButtonThemeController = () => {
    const { toggleTheme, theme } = useTheme();
    return (
        <Button
            color="secondary"
            variant="ghost"
            icon={theme === "dark" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleTheme}
        />
    );
};
