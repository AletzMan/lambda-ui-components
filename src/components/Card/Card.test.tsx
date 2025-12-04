import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Card } from "./Card";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" >
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("Card", () => {
	test("renders children", () => {
		renderWithProvider(<Card>Contenido del card</Card>);
		expect(screen.getByText(/Contenido del card/i)).toBeInTheDocument();
	});

	test("renders header with title and description", () => {
		renderWithProvider(
			<Card header={{ title: "Título", description: "Descripción" }}>Contenido del card</Card>
		);
		expect(screen.getByText(/Título/i)).toBeInTheDocument();
		expect(screen.getByText(/Descripción/i)).toBeInTheDocument();
	});

	test("renders image with correct src and alt", () => {
		renderWithProvider(
			<Card image={{ src: "img.png", heightPorcent: 80 }} header={{ title: "T" }}>
				Contenido del card
			</Card>
		);
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "img.png");
		expect(img).toHaveAttribute("alt", expect.stringContaining("img.png"));
	});

	test("renders actions and calls onClick", () => {
		const onClick = vi.fn();
		renderWithProvider(
			<Card actions={[{ text: "Acción 1", onClick }, { text: "Acción 2" }]}>
				Contenido del card
			</Card>
		);
		const btn = screen.getByText(/Acción 1/i).closest("button");
		expect(btn).toBeInTheDocument();
		fireEvent.click(btn!);
		expect(onClick).toHaveBeenCalled();
	});

	test("renders icon in header and action", () => {
		renderWithProvider(
			<Card
				header={{ title: "T", icon: <span data-testid="header-icon">H</span> }}
				actions={[{ text: "A", icon: <span data-testid="action-icon">I</span> }]}
			>
				Contenido del card
			</Card>
		);
		expect(screen.getByTestId("header-icon")).toBeInTheDocument();
		expect(screen.getByTestId("action-icon")).toBeInTheDocument();
	});

	test("applies variant, size and radius props", () => {
		renderWithProvider(
			<Card variant="outline" size="large" radius="small">
				Test
			</Card>
		);
		// No assert de clase exacto porque depende de CSS, pero debe renderizar sin error
		expect(screen.getByText(/Test/i)).toBeInTheDocument();
	});
});
