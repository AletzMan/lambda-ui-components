import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { RadioGroup, Radio } from "./Radio";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("RadioGroup/Radio", () => {
	test("renders radios with labels", () => {
		renderWithProvider(
			<RadioGroup name="grupo">
				<Radio value="a" label="Opción A" />
				<Radio value="b" label="Opción B" />
			</RadioGroup>
		);
		expect(screen.getByLabelText("Opción A")).toBeInTheDocument();
		expect(screen.getByLabelText("Opción B")).toBeInTheDocument();
	});

	test("calls onChange when selecting option", () => {
		const handleChange = vi.fn();
		renderWithProvider(
			<RadioGroup name="grupo" onChangeOption={handleChange}>
				<Radio value="a" label="A" />
				<Radio value="b" label="B" />
			</RadioGroup>
		);
		const radioB = screen.getByLabelText("B");
		fireEvent.click(radioB);
		expect(handleChange).toHaveBeenCalled();
	});

	test("renders as checked", () => {
		renderWithProvider(
			<RadioGroup name="grupo" defaultValue="b">
				<Radio value="a" label="A" />
				<Radio value="b" label="B" />
			</RadioGroup>
		);
		const radioB = screen.getByLabelText("B") as HTMLInputElement;
		expect(radioB.checked).toBe(true);
	});

	test("renders as disabled", () => {
		renderWithProvider(
			<RadioGroup name="grupo">
				<Radio value="a" disabled label="A" />
			</RadioGroup>
		);
		const radioA = screen.getByLabelText("A");
		expect(radioA).toBeDisabled();
	});
});
