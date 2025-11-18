"use client";
import { LambdaConfigProvider, ThemeProvider } from "lambda-ui-components";
export function ClientProviders({ children }: { children: React.ReactNode }) {
	return (
		<LambdaConfigProvider lang="en">
			<ThemeProvider
				defaultTheme="slate"
				themes={["light", "dark", "retro", "slate"]}
				attribute="data-theme"
				value={{ light: "light", dark: "dark", retro: "retro", slate: "slate" }}
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</LambdaConfigProvider>
	);
}
