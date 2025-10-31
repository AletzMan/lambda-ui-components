import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Input } from "./Input";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("Input", () => {
	test("renders with label", () => {
		renderWithProvider(<Input label="Usuario" />);
		expect(screen.getByText("Usuario")).toBeInTheDocument();
	});

	test("renders with placeholder", () => {
		renderWithProvider(<Input placeholder="Ingresa tu nombre" />);
		const input = screen.getByPlaceholderText("Ingresa tu nombre");
		expect(input).toBeInTheDocument();
	});

	test("calls onChange when typing", () => {
		const handleChange = vi.fn();
		renderWithProvider(<Input onChange={handleChange} />);
		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "nuevo" } });
		expect(handleChange).toHaveBeenCalled();
	});

	test("renders as disabled", () => {
		renderWithProvider(<Input disabled />);
		const input = screen.getByRole("textbox");
		expect(input).toBeDisabled();
	});

	test("shows error message when invalid", () => {
		renderWithProvider(<Input invalid errorMessage="Campo obligatorio" />);
		expect(screen.getByText("Campo obligatorio")).toBeInTheDocument();
	});

	test("shows helper text", () => {
		renderWithProvider(<Input helperText="Ayuda" />);
		expect(screen.getByText("Ayuda")).toBeInTheDocument();
	});

	test("shows password toggle", () => {
		renderWithProvider(<Input type="password" />);
		const toggleBtn = screen.getByRole("button", { name: /show password/i });
		expect(toggleBtn).toBeInTheDocument();
	});

	test("shows clear button for search type", () => {
		renderWithProvider(<Input type="search" value="buscar" />);
		const clearBtn = screen.getByRole("button", { name: /limpiar búsqueda/i });
		expect(clearBtn).toBeInTheDocument();
	});
});
