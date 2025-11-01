import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Switch } from "./Switch";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("Switch", () => {
	test("renders with label", () => {
		renderWithProvider(<Switch label="Activar opción" />);
		expect(screen.getByText("Activar opción")).toBeInTheDocument();
	});

	test("calls onChange when clicked", () => {
		const handleChange = vi.fn();
		renderWithProvider(<Switch label="Switch" onChange={handleChange} />);
		const input = screen.getByRole("checkbox");
		fireEvent.click(input);
		expect(handleChange).toHaveBeenCalled();
	});

	test("renders as checked", () => {
		renderWithProvider(<Switch label="On" checked />);
		const input = screen.getByRole("checkbox");
		expect(input).toBeChecked();
	});

	test("renders as disabled", () => {
		renderWithProvider(<Switch label="Off" disabled />);
		const input = screen.getByRole("checkbox");
		expect(input).toBeDisabled();
	});

	//TODO: Implementar las opciones invalid y helperText en el componente Switch
	/*
	test("shows error message when invalid", () => {
		renderWithProvider(<Switch invalid errorMessage="Campo requerido" />);
		expect(screen.getByText("Campo requerido")).toBeInTheDocument();
	});

	test("shows helper text", () => {
		renderWithProvider(<Switch helperText="Ayuda" />);
		expect(screen.getByText("Ayuda")).toBeInTheDocument();
	});
	*/
});
