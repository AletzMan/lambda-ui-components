import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("Checkbox", () => {
	test("renders with label", () => {
		renderWithProvider(<Checkbox label="Acepto términos" />);
		expect(screen.getByText("Acepto términos")).toBeInTheDocument();
	});

	test("calls onChange when clicked", () => {
		const handleChange = vi.fn();
		renderWithProvider(<Checkbox label="Check" onChange={handleChange} />);
		const input = screen.getByRole("checkbox");
		fireEvent.click(input);
		expect(handleChange).toHaveBeenCalled();
	});

	test("renders as checked", () => {
		renderWithProvider(<Checkbox label="Seleccionado" checked />);
		const input = screen.getByRole("checkbox");
		expect(input).toBeChecked();
	});

	test("renders as disabled", () => {
		renderWithProvider(<Checkbox label="Deshabilitado" disabled />);
		const input = screen.getByRole("checkbox");
		expect(input).toBeDisabled();
	});

	//TODO: Agregar opciones de invalid y helperText al componente Checkbox
	/*
	test("shows error message when invalid", () => {
		renderWithProvider(<Checkbox invalid errorMessage="Campo requerido" />);
		expect(screen.getByText("Campo requerido")).toBeInTheDocument();
	});

	test("shows helper text", () => {
		renderWithProvider(<Checkbox helperText="Ayuda" />);
		expect(screen.getByText("Ayuda")).toBeInTheDocument();
	});
	*/
});
