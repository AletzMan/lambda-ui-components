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
import { accentColorsArray } from "../../_util/accentColors";
import { ThemeScript } from "./ThemeScript";

type TypeColor =
	| "neutral"
	| "success"
	| "danger"
	| "orange"
	| "warning"
	| "yellow"
	| "lime"
	| "emerald"
	| "teal"
	| "cyan"
	| "info"
	| "blue"
	| "indigo"
	| "violet"
	| "purple"
	| "fuchsia"
	| "pink"
	| "rose"
	| "gray";

type TypeTheme = "light" | "dark" | "slate" | "retro" | undefined;
const themesDark: TypeTheme[] = ["dark", "slate"];
const themesLight: TypeTheme[] = ["light", "retro"];

interface ThemeContextProps {
	theme: TypeTheme;
	toggleTheme: () => void;
}

interface ThemeProviderProps {
	children: ReactNode;
	defaultMode?: "dark" | "light";
	accentColor?: TypeColor;
	lightTheme?: TypeTheme;
	darkTheme?: TypeTheme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({
	children,
	defaultMode,
	accentColor,
	lightTheme = "light",
	darkTheme = "dark",
}: ThemeProviderProps) => {
	const [theme, setTheme] = useState<TypeTheme>(() => {
		// Lee el valor del DOM que el script de la cabecera ya aplicó
		// Nota: En SSR, esto puede ser nulo, por lo que se asume un default seguro
		if (typeof window !== "undefined") {
			const initialTheme = document.documentElement.getAttribute("data-theme") as TypeTheme;
			if (initialTheme) {
				return initialTheme;
			}
		}
		// Fallback si no está en el DOM (ej. durante SSR)
		return defaultMode === "dark" ? darkTheme : lightTheme;
	});

	useEffect(() => {
		const stored: TypeTheme = localStorage.getItem("theme") as TypeTheme;
		if (stored) {
			if (themesDark.includes(stored) || themesLight.includes(stored)) {
				setTheme(stored);
			} else {
				setTheme(defaultMode);
			}
		} else {
			setTheme(defaultMode);
		}

		if (accentColor) {
			const root = document.documentElement;
			const color = accentColorsArray.find((color) => color[accentColor]);
			const variants = color?.[accentColor]?.variants;
			if (!variants) return;
			Object.entries(variants).forEach(([key, value]) => {
				root.style.setProperty(`--lambda-color-primary-${key}`, value);
			});
		}
	}, [defaultMode]);

	useLayoutEffect(() => {
		if (!theme) return;

		if (theme === "retro") {
			const root = document.documentElement;
			const color = accentColorsArray.find((color) => color["orange"]);
			const variants = color?.["orange"]?.variants;
			if (!variants) return;
			Object.entries(variants).forEach(([key, value]) => {
				root.style.setProperty(`--lambda-color-primary-${key}`, value);
			});
		}
		if (theme === "slate") {
			const root = document.documentElement;
			const color = accentColorsArray.find((color) => color["blue"]);
			const variants = color?.["blue"]?.variants;
			if (!variants) return;
			Object.entries(variants).forEach(([key, value]) => {
				root.style.setProperty(`--lambda-color-primary-${key}`, value);
			});
		}
		if (theme === "dark") {
			const root = document.documentElement;
			const color = accentColorsArray.find((color) => color["cyan"]);
			const variants = color?.["cyan"]?.variants;
			if (!variants) return;
			Object.entries(variants).forEach(([key, value]) => {
				root.style.setProperty(`--lambda-color-primary-${key}`, value);
			});
		}
		if (theme === "light") {
			const root = document.documentElement;
			const color = accentColorsArray.find((color) => color["cyan"]);
			const variants = color?.["cyan"]?.variants;
			if (!variants) return;
			Object.entries(variants).forEach(([key, value]) => {
				root.style.setProperty(`--lambda-color-primary-${key}`, value);
			});
		}
		console.log("theme useLayoutEffect", theme);
		document.documentElement.setAttribute("data-theme", theme);
		document.documentElement.classList.remove("dark", "light", "slate", "retro");
		document.documentElement.classList.add(theme);
		document.documentElement.style.background = "var(--background-color)";
		/*localStorage.setItem("theme", theme);*/
	}, [theme]);

	// Función para alternar entre temas
	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => {
			let newTheme: TypeTheme;
			if (themesDark.includes(prevTheme)) {
				if (lightTheme) {
					newTheme = lightTheme;
				} else {
					newTheme = "light";
				}
			} else {
				if (darkTheme) {
					newTheme = darkTheme;
				} else {
					newTheme = "dark";
				}
			}
			console.log("theme toggleTheme", newTheme);
			localStorage.setItem("theme", newTheme);
			document.documentElement.style.background = "var(--background-color)";
			return newTheme;
		});
	}, []);
	// Evita el render hasta tener el tema real
	if (!theme) return null;
	return (
		<>
			<ThemeScript />
			<ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
		</>
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
