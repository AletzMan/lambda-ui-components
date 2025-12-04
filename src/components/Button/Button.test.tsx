import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Button } from "./Button";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("Button", () => {
	test("renders with label", () => {
		renderWithProvider(<Button label="Click me" />);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	test("calls onClick when clicked", () => {
		const handleClick = vi.fn();
		renderWithProvider(<Button label="Click" onClick={handleClick} />);
		fireEvent.click(screen.getByText("Click"));
		expect(handleClick).toHaveBeenCalled();
	});

	test("renders as disabled", () => {
		renderWithProvider(<Button label="Disabled" disabled />);
		const btn = screen.getByRole("button");
		expect(btn).toBeDisabled();
	});

	test("renders with icon", () => {
		renderWithProvider(<Button label="Icon" icon={<span data-testid="icon">★</span>} />);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	test("renders loading state", () => {
		renderWithProvider(<Button label="Loading" loading loadingText="Cargando..." />);
		expect(screen.getByText("Cargando...")).toBeInTheDocument();
		const btn = screen.getByRole("button");
		expect(btn).toHaveAttribute("aria-busy", "true");
	});

	test("applies custom className and style", () => {
		renderWithProvider(
			<Button label="Estilo" className="my-btn" style={{ backgroundColor: "red" }} />
		);
		const btn = screen.getByRole("button");
		expect(btn).toHaveClass("my-btn");
		expect(
			btn.style.backgroundColor === "red" ||
			btn.style.backgroundColor === "rgb(255, 0, 0)"
		).toBe(true);
	});
});
