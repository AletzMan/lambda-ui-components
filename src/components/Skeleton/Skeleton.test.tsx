import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";
import { describe, expect, it } from "vitest";

describe("Skeleton", () => {
	it("renders with default props", () => {
		render(<Skeleton data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toBeInTheDocument();
	});

	it("applies custom width and height", () => {
		render(<Skeleton width={123} height={45} data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton).toHaveStyle({ width: "123px", height: "45px" });
	});

	it("renders as a circle when shape='circle'", () => {
		render(<Skeleton shape="circle" data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton.className).toMatch(/circle/i);
	});

	it("renders with wave animation", () => {
		render(<Skeleton animationType="wave" data-testid="skeleton" />);
		const skeleton = screen.getByTestId("skeleton");
		expect(skeleton.className).toMatch(/wave/i);
	});
});
