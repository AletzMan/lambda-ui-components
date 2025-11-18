"use client";
import { LambdaConfigProvider, ThemeProvider } from "lambda-ui-components";
export function ClientProviders({ children }: { children: React.ReactNode }) {
	return (
		<LambdaConfigProvider lang="en">
			<ThemeProvider defaultMode="dark" lightTheme="retro" darkTheme="dark">
				{children}
			</ThemeProvider>
		</LambdaConfigProvider>
	);
}
