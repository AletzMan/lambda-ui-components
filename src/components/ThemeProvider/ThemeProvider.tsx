/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useContext,
	useState,
	useLayoutEffect,
	ReactNode,
	useCallback,
	useEffect,
} from "react";

// Tipado del contexto
interface ThemeContextProps {
	theme: "light" | "dark" | undefined;
	toggleTheme: () => void;
}

interface ThemeProviderProps {
	children: ReactNode;
	defaultTheme?: "light" | "dark" | undefined;
}

// Crear el contexto
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children, defaultTheme = "light" }: ThemeProviderProps) => {
	// Estado inicial con localStorage (antes del primer render)
	const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		if (stored === "dark" || stored === "light") {
			setTheme(stored);
		} else {
			setTheme(defaultTheme);
		}
	}, [defaultTheme]);

	// Aplicar el tema ANTES de que React renderice (previene parpadeo)
	useLayoutEffect(() => {
		/*document.documentElement.setAttribute("data-theme", theme);
		document.body.style.transition = "background 0.3s ease";
		document.body.style.background =
			theme === "dark"
				? "linear-gradient(135deg, black 60%, black 100%)"
				: "linear-gradient(135deg, white 60%, white 100%)";*/
		if (!theme) return;
		document.documentElement.setAttribute("data-theme", theme);
		document.documentElement.classList.add(theme);
		document.documentElement.classList.remove(theme === "dark" ? "light" : "dark");
		localStorage.setItem("theme", theme);
	}, [theme]);

	// Función para alternar entre temas
	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			return newTheme;
		});
	}, []);
	// Evita el render hasta tener el tema real
	if (!theme) return null;
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
