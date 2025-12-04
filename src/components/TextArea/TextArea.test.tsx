import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { TextArea } from "./TextArea";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" >
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("TextArea", () => {
	test("renders with label", () => {
		renderWithProvider(<TextArea label="Descripción" />);
		expect(screen.getByText("Descripción")).toBeInTheDocument();
	});

	test("renders with placeholder", () => {
		renderWithProvider(<TextArea placeholder="Escribe aquí" />);
		const textarea = screen.getByPlaceholderText("Escribe aquí");
		expect(textarea).toBeInTheDocument();
	});

	test("calls onChange when typing", () => {
		const handleChange = vi.fn();
		renderWithProvider(<TextArea onChange={handleChange} />);
		const textarea = screen.getByRole("textbox");
		fireEvent.change(textarea, { target: { value: "nuevo texto" } });
		expect(handleChange).toHaveBeenCalled();
	});

	test("renders as disabled", () => {
		renderWithProvider(<TextArea disabled />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeDisabled();
	});

	test("shows error message when invalid", () => {
		renderWithProvider(<TextArea invalid errorMessage="Campo requerido" />);
		expect(screen.getByText("Campo requerido")).toBeInTheDocument();
	});

	test("shows helper text", () => {
		renderWithProvider(<TextArea helperText="Ayuda" />);
		expect(screen.getByText("Ayuda")).toBeInTheDocument();
	});
});
