"use client";
import { Button, ButtonTheme } from "lambda-ui-components";
export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center text-(--foreground-color)">
			<ButtonTheme />

			<div>Lambda UI Components</div>
			<Button
				variant="unstyled"
				label="Button"
				className="bg-red-500 text-yellow-200 border-2 border-yellow-200 w-md hover:bg-yellow-200 hover:text-red-500 active:bg-yellow-300 active:text-red-800"
			/>
		</div>
	);
}
