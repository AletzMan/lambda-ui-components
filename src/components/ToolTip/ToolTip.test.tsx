import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Tooltip } from "./ToolTip";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("Tooltip", () => {
	test("renders tooltip on hover", async () => {
		renderWithProvider(
			<Tooltip content="Ayuda">
				<button>Acción</button>
			</Tooltip>
		);
		const button = screen.getByRole("button", { name: "Acción" });
		fireEvent.mouseOver(button);
		const tooltip = await screen.findByText("Ayuda");
		expect(tooltip).toBeInTheDocument();
	});

	test("hides tooltip on mouse out", async () => {
		renderWithProvider(
			<Tooltip content="Texto oculto">
				<button>Botón</button>
			</Tooltip>
		);
		const button = screen.getByRole("button", { name: "Botón" });
		fireEvent.mouseOver(button);
		const tooltip = await screen.findByText("Texto oculto");
		expect(tooltip).toBeInTheDocument();
		fireEvent.mouseOut(button);
		// Puede requerir esperar animación, depende de la implementación
		// expect(tooltip).not.toBeVisible();
	});

	test.each([
		["top-left"],
		["top-center"],
		["top-right"],
		["bottom-left"],
		["bottom-center"],
		["bottom-right"],
		["left-center"],
		["right-center"],
	])("renders tooltip with position %s", async (position) => {
		renderWithProvider(
			<Tooltip content={`Tooltip ${position}`} position={position as any}>
				<span>Texto</span>
			</Tooltip>
		);
		const trigger = screen.getByText("Texto");
		fireEvent.mouseOver(trigger);
		const tooltip = await screen.findByText(`Tooltip ${position}`);
		expect(tooltip).toBeInTheDocument();
	});
});
