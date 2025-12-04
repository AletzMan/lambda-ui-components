import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeAll } from "vitest";
import { Select } from "./Select";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es"  >
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

const options = [
	{ label: "Opción 1", value: "1" },
	{ label: "Opción 2", value: "2" },
	{ label: "Opción 3", value: "3" },
];

beforeAll(() => {
	window.ResizeObserver = class {
		observe() { }
		unobserve() { }
		disconnect() { }
	};
});

describe("Select", () => {
	test("renders with label and placeholder", () => {
		renderWithProvider(
			<Select label="Selecciona" options={options} placeholder="Elige una opción" />
		);
		expect(screen.getByText("Selecciona")).toBeInTheDocument();
		expect(screen.getByText("Elige una opción")).toBeInTheDocument();
	});

	test("opens dropdown and selects option", () => {
		renderWithProvider(<Select options={options} />);
		const btn = screen.getByRole("button");
		fireEvent.click(btn);
		expect(screen.getByText("Opción 2")).toBeInTheDocument();
		fireEvent.click(screen.getByText("Opción 2"));
		expect(btn).toHaveTextContent("Opción 2");
	});

	test("calls onChange when option is selected", () => {
		const handleChange = vi.fn();
		renderWithProvider(<Select options={options} onChange={handleChange} />);
		const btn = screen.getByRole("button");
		fireEvent.click(btn);
		fireEvent.click(screen.getByText("Opción 3"));
		expect(handleChange).toHaveBeenCalledWith("3");
	});

	test("renders as disabled", () => {
		renderWithProvider(<Select options={options} disabled />);
		const btn = screen.getByRole("button");
		expect(btn).toBeDisabled();
	});

	test("shows error message when invalid", () => {
		renderWithProvider(<Select options={options} invalid errorMessage="Campo requerido" />);
		expect(screen.getByText("Campo requerido")).toBeInTheDocument();
	});
});
