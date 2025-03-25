/* eslint-disable react-refresh/only-export-components */
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react"
import { Button } from "../main"
import { MoonIcon, SunIcon } from "lucide-react"

interface ThemeContextProps {
    theme: "light" | "dark"
    toggleTheme: () => void
}

interface ThemeProviderProps {
    children: ReactNode
    defaultTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme }) => {
    const [theme, setTheme] = useState<"light" | "dark">(defaultTheme)

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    useEffect(() => {
        document.body.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme debe usarse dentro de un ThemeProvider")
    }
    return context
}

export const ButtonThemeController = () => {
    const { toggleTheme, theme } = useTheme()
    return (
        <Button
            color="secondary"
            variant="ghost"
            icon={theme === "dark" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleTheme} />
    )
}