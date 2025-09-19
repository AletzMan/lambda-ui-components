/* eslint-disable react-refresh/only-export-components */
import "@fontsource-variable/manrope";
import React, { useEffect } from "react";
import { ThemeProvider } from "../src/components/ThemeProvider/ThemeProvider";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import "../src/index.css";
import { LambdaConfigProvider } from "../src/_internal/hooks/translation/LambdaConfigProvider";
import { create } from "@storybook/theming";

const ThemeDecorator = (Story, context) => {
	const theme = context.globals.theme || "dark";

	useEffect(() => {
		document.body.setAttribute("data-theme", theme || "dark");
		document.body.style.backgroundColor = "var(--background-color)";
		const element = document.getElementById("storybook-docs")?.children[0] as HTMLElement;
		const container = document.querySelector(".docs-story") as HTMLElement;
		if (element) {
			element.style.backgroundColor = "transparent";
		}
		if (container) {
			container.style.backgroundColor = "var(--surface-a)";
		}
	}, [theme, Story, context]);

	return (
		<LambdaConfigProvider lang="en" radiusField="tiny" radiusBox="small" radiusSelector="small">
			<ThemeProvider defaultTheme={theme}>
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
				dark: "dark",
			},
		}),
		ThemeDecorator, // Aquí pasas el componente directamente
	],
};

export default preview;
