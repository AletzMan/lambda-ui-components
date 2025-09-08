import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../Button/Button";
import { useTheme } from "./ThemeProvider";

export const ButtonThemeController = () => {
	const { toggleTheme, theme } = useTheme();
	const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
	return (
		<Button
			color="secondary"
			variant="soft"
			icon={theme === "dark" ? <MoonIcon /> : <SunIcon />}
			onClick={toggleTheme}
			aria-label={label}
		/>
	);
};
