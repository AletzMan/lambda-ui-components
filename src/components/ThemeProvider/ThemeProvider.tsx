/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useContext,
	useState,
	useLayoutEffect,
	ReactNode,
	useCallback,
} from "react";

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

export const ThemeProvider = ({ children, defaultTheme = "light" }: ThemeProviderProps) => {
	// Estado inicial con localStorage (antes del primer render)
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		return (localStorage.getItem("theme") as "light" | "dark") || defaultTheme;
	});

	// Aplicar el tema ANTES de que React renderice (previene parpadeo)
	useLayoutEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		document.body.style.transition = "background 0.3s ease";
		document.body.style.background =
			theme === "dark"
				? "linear-gradient(135deg, var(--background-color) 60%, var(--surface-a) 100%)"
				: "linear-gradient(135deg, var(--background-color) 60%, var(--surface-a) 100%)";
	}, [theme]);

	// Función para alternar entre temas
	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			return newTheme;
		});
	}, []);

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Hook personalizado para acceder al contexto
export const useTheme = (): ThemeContextProps => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme debe usarse dentro de un ThemeProvider");
	}
	return context;
};
