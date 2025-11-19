"use client";
import { LambdaConfigProvider, ThemeProvider } from "lambda-ui-components";
export function ClientProviders({ children }: { children: React.ReactNode }) {
	return (
		<LambdaConfigProvider lang="en">
			<ThemeProvider
				defaultTheme="slate"
				lightTheme="light"
				darkTheme="dark"
				disableTransitionOnChange
				enableColorScheme={false}
			>
				{children}
			</ThemeProvider>
		</LambdaConfigProvider>
	);
}
