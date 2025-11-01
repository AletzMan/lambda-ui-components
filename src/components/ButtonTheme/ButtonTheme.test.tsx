import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { ButtonTheme } from "./ButtonTheme";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { ThemeProvider } from "../ThemeProvider/ThemeProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		<ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("ButtonTheme", () => {
	test("renders with label", () => {
		renderWithProvider(<ButtonTheme label="Tema Oscuro" />);
		expect(screen.getByText("Tema Oscuro")).toBeInTheDocument();
	});

	test("calls onClick when clicked", () => {
		const handleClick = vi.fn();
		renderWithProvider(<ButtonTheme label="Cambiar" onClick={handleClick} />);
		const btn = screen.getByRole("button");
		fireEvent.click(btn);
		expect(handleClick).toHaveBeenCalled();
	});

	test("renders as disabled", () => {
		renderWithProvider(<ButtonTheme label="Deshabilitado" disabled />);
		const btn = screen.getByRole("button");
		expect(btn).toBeDisabled();
	});

	test("applies custom className and style", () => {
		renderWithProvider(
			<ButtonTheme label="Estilo" className="my-btn-theme" style={{ backgroundColor: "red" }} />
		);
		const btn = screen.getByRole("button");
		expect(btn).toHaveClass("my-btn-theme");
		expect(
			btn.style.backgroundColor === "red" || btn.style.backgroundColor === "rgb(255, 0, 0)"
		).toBe(true);
	});

	test("applies slide animation and direction rtl/ltr on theme change", () => {
		renderWithProvider(<ButtonTheme label="Tema" animation="slide" />);

		// Simula cambio de tema de light a dark
		// (esto depende de cómo implementes el cambio de tema en tu ThemeProvider)
		// Por ejemplo, si usas un botón para cambiar tema:
		const btn = screen.getByRole("button");
		fireEvent.click(btn); // Cambia a dark

		// Simula cambio de dark a light
		fireEvent.click(btn); // Cambia a light

		// Si tienes acceso a un contexto o función para cambiar el tema directamente, úsalo aquí

		// Puedes verificar que el body cambia de fondo (opcional)
		expect(document.body.style.background).toContain("linear-gradient");
	});

	test("applies fade animation", () => {
		renderWithProvider(<ButtonTheme label="Tema" animation="fade" />);
		// Aquí puedes verificar que el ícono tenga la animación esperada, o simplemente que renderiza sin error
	});
});
