import "lambda-ui-components/dist/main.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProviders } from "./ClientProviders";
import { HeaderApp } from "../components/ui/HeaderApp";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
		<html lang="en" data-theme="dark">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased scrollBar`}>
				<ClientProviders>
					<HeaderApp />
					{children}
				</ClientProviders>
			</body>
		</html>
	);
}
