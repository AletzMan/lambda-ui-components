import "lambda-ui-components/dist/main.css";
import "./globals.css";
import type { Metadata } from "next";
import { ClientProviders } from "./ClientProviders";
import { HeaderApp } from "../components/ui/HeaderApp";

export const metadata: Metadata = {
	title: "Lambda UI Components",
	description: "Components library for React",
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<link rel="icon" href="/favicon.svg" sizes="any" />
			<body
				className={`antialiased max-w-[1920px] mx-auto flex flex-col items-center justify-center`}
			>
				<ClientProviders>
					<HeaderApp />
					{children}
				</ClientProviders>
			</body>
		</html>
	);
}
