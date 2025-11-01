import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { InputNumber } from "./InputNumber";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("InputNumber", () => {
	test("renders with label", () => {
		renderWithProvider(<InputNumber label="Cantidad" />);
		expect(screen.getByText("Cantidad")).toBeInTheDocument();
	});

	test("calls onChange when typing", () => {
		const handleChange = vi.fn();
		renderWithProvider(<InputNumber onChange={handleChange} />);
		const input = screen.getByRole("number");
		fireEvent.change(input, { target: { value: "123" } });
		expect(handleChange).toHaveBeenCalled();
	});

	test("renders as disabled", () => {
		renderWithProvider(<InputNumber disabled />);
		const input = screen.getByRole("number");
		expect(input).toBeDisabled();
	});

	test("shows error message when invalid", () => {
		renderWithProvider(<InputNumber invalid errorMessage="Campo obligatorio" />);
		expect(screen.getByText("Campo obligatorio")).toBeInTheDocument();
	});

	test("increments and decrements value with buttons", () => {
		renderWithProvider(<InputNumber min={0} max={10} />);
		const input = screen.getByRole("number") as HTMLInputElement;
		const incBtn = screen.getByRole("button", { name: /increase value/i });
		const decBtn = screen.getByRole("button", { name: /decrease value/i });
		fireEvent.change(input, { target: { value: "1" } });
		fireEvent.mouseDown(incBtn);
		fireEvent.mouseUp(incBtn);
		expect(input.value).toBe("2");
		fireEvent.mouseDown(decBtn);
		fireEvent.mouseUp(decBtn);
		expect(input.value).toBe("1");
	});

	test("renders currency icon for typeNumber", () => {
		const { container } = renderWithProvider(<InputNumber typeNumber="currency-USD" />);
		const icon = container.querySelector("svg.lucide-dollar-sign");
		expect(icon).toBeInTheDocument();
	});
});
