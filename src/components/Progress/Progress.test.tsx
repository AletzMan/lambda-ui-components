import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Progress } from "./Progress";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("Progress", () => {
	test("renders with value", () => {
		renderWithProvider(<Progress value={50} showValue />);
		const bar = screen.getByRole("progressbar");
		expect(bar).toBeInTheDocument();
		expect(bar).toHaveAttribute("aria-valuenow", "50");
		const valueSpan = screen.getByLabelText("progress-value");
		expect(valueSpan).toHaveTextContent("50%");
	});

	test("renders with label", () => {
		renderWithProvider(<Progress value={30} label="Cargando..." />);
		expect(screen.getByText("Cargando...")).toBeInTheDocument();
	});

	test("renders as indeterminate", () => {
		renderWithProvider(<Progress indeterminate value={0} />);
		const bar = screen.getByRole("progressbar");
		expect(bar).toBeInTheDocument();
		// En modo indeterminado no debe tener aria-valuenow
		expect(bar).not.toHaveAttribute("aria-valuenow");
	});

	test("applies custom className and style", () => {
		renderWithProvider(
			<Progress value={70} className="my-progress" style={{ backgroundColor: "red" }} />
		);
		const bar = screen.getByRole("progressbar");
		expect(bar).toHaveClass("my-progress");
		expect(
			bar.style.backgroundColor === "red" || bar.style.backgroundColor === "rgb(255, 0, 0)"
		).toBe(true);
	});

	test("renders circle with value and label", () => {
		renderWithProvider(<Progress value={75} variant="circle" label="Progreso" showValue />);
		const bar = screen.getByRole("progressbar");
		expect(bar).toBeInTheDocument();
		expect(screen.getByText("Progreso")).toBeInTheDocument();
		const svg = bar.querySelector("svg");
		expect(svg).toBeInTheDocument();
		// Busca el valor mostrado con %
		const valueSpan = bar.querySelector("div div span");
		expect(valueSpan).toHaveTextContent("75");
	});

	test("renders circle as indeterminate", () => {
		renderWithProvider(<Progress variant="circle" indeterminate value={0} />);
		const bar = screen.getByRole("progressbar");
		const svg = bar.querySelector("svg");
		expect(svg).toBeInTheDocument();
		const indeterminateCircle = Array.from(bar.querySelectorAll("circle")).find((el) =>
			(el.className.baseVal || "").includes("lambda-progress-indeterminate-circle")
		);
		expect(indeterminateCircle).toBeDefined();
	});
});
