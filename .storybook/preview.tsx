/* eslint-disable react-refresh/only-export-components */
import "@fontsource-variable/manrope";
import React, { useEffect } from "react";
import { ThemeProvider } from "../src/components/ThemeProvider/ThemeProvider";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import "../src/index.css";
import { LambdaConfigProvider } from "../src/_internal/hooks/translation/LambdaConfigProvider";
import { create } from "storybook/theming";

//const themesDark = ["dark", "slate"];
//const themesLight = ["light", "retro"];

const ThemeDecorator = (Story: any, context: any) => {
	const theme = context.globals.theme || "dark";

	useEffect(() => {
		/*const newTheme = themesDark.includes(theme) ? "dark" : "light";
		localStorage.setItem("theme", newTheme);*/
		document.body.setAttribute("data-theme", theme);
		document.body.style.background =
			theme === "dark"
				? "linear-gradient(135deg, var(--background-color) 60%, var(--surface-a) 100%)"
				: "linear-gradient(135deg, var(--background-color) 60%, var(--surface-a) 100%)";
		const element = document.getElementById("storybook-docs")?.children[0] as HTMLElement;
		const container = document.querySelector(".docs-story") as HTMLElement;
		if (element) {
			element.style.backgroundColor = "transparent";
		}
		if (container) {
			container.style.background = "var(--surface-a)";
		}
	}, [theme, Story, context]);

	return (
		<LambdaConfigProvider lang="en">
			<ThemeProvider defaultTheme="dark" lightTheme="retro">
				<Story />
			</ThemeProvider>
		</LambdaConfigProvider>
	);
};

const preview: Preview = {
	parameters: {
		docs: {
			theme: create({
				base: "dark",
				brandTitle: "Lambda UI Components",
				brandUrl: "https://github.com/lambda-ui/lambda-ui-components",
				fontBase: "Manrope Variable, sans-serif",
			}),
		},
		options: {
			storySort: {
				order: ["overview", "components", "pages"],
			},
		},
	},
	decorators: [
		withThemeByClassName({
			defaultTheme: "dark",
			themes: {
				light: "light",
				retro: "retro",
				lavender: "lavender",
				mint: "mint",
				sunset: "sunset",
				ocean: "ocean",
				sandstone: "sandstone",
				"pop-art": "pop-art",
				dark: "dark",
				slate: "slate",
				"deep-cosmic-night": "deep-cosmic-night",
				"soft-obsidian": "soft-obsidian",
				graphite: "graphite",
				midnight: "midnight",
				"aurora-night": "aurora-night",
				"electro-violet": "electro-violet",
			},
		}),
		ThemeDecorator,
	],
};

export default preview;
