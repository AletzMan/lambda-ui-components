import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";
import { describe, expect, test } from "vitest";

describe("Skeleton", () => {
	test("renders with default props", () => {
		render(<Skeleton data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toBeInTheDocument();
	});

	test("applies custom width and height", () => {
		render(<Skeleton width={123} height={45} data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveStyle({ width: "123px", height: "45px" });
	});

	test("renders as a circle when shape='circle'", () => {
		render(<Skeleton shape="circle" data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton.className).toMatch(/circle/i);
	});

	test("renders as a square when shape='rect'", () => {
		render(<Skeleton shape="rect" data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton.className).toMatch(/rect/i);
	});

	test("renders whit rounded border in shape='rect' when roundedBorder is true", () => {
		render(<Skeleton shape="rect" rounded data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton.className).toMatch(/rounded/i);
	});

	test("renders with wave animation", () => {
		render(<Skeleton animationType="wave" data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton.className).toMatch(/wave/i);
	});

	test("renders with fade animation", () => {
		render(<Skeleton animationType="fade" data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton.className).toMatch(/fade/i);
	});
});
