import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Carousel } from "./Carousel";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

const slides = [
	<div key="slide-1">Slide 1</div>,
	<div key="slide-2">Slide 2</div>,
	<div key="slide-3">Slide 3</div>,
];

describe("Carousel", () => {
	test("renders all slides and navigation buttons", () => {
		renderWithProvider(
			<Carousel showNavigationButtons showPagination>
				{slides}
			</Carousel>
		);
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
		expect(screen.getByText("Slide 2")).toBeInTheDocument();
		expect(screen.getByText("Slide 3")).toBeInTheDocument();
		expect(screen.getByLabelText("Anterior")).toBeInTheDocument();
		expect(screen.getByLabelText("Siguiente")).toBeInTheDocument();
	});

	test("shows only the first slide by default in single mode", () => {
		renderWithProvider(<Carousel slideMode="single">{slides}</Carousel>);
		const visible1 = screen
			.getAllByText(/Slide 1/i, { exact: false })
			.filter((el) => el.closest('[aria-hidden="false"]'));
		const hidden2 = screen
			.getAllByText(/Slide 2/i, { exact: false })
			.filter((el) => el.closest('[aria-hidden="true"]'));
		const hidden3 = screen
			.getAllByText(/Slide 3/i, { exact: false })
			.filter((el) => el.closest('[aria-hidden="true"]'));
		expect(visible1.length).toBe(1);
		expect(hidden2.length).toBeGreaterThan(0);
		expect(hidden3.length).toBeGreaterThan(0);
	});

	test("navigates to next and previous slides", async () => {
		renderWithProvider(<Carousel slideMode="single">{slides}</Carousel>);
		const nextBtn = screen.getByLabelText("Siguiente");
		// Click y espera Slide 2
		fireEvent.click(nextBtn);
		await waitFor(() => {
			const visibles2 = screen
				.getAllByText(/Slide 2/i, { exact: false })
				.filter((el) => el.closest('[aria-hidden="false"]'));
			expect(visibles2.length).toBe(1);
		});
		// Click y espera Slide 3
		fireEvent.click(nextBtn);
		await waitFor(() => {
			const visibles3 = screen
				.getAllByText(/Slide 3/i, { exact: false })
				.filter((el) => el.closest('[aria-hidden="false"]'));
			expect(visibles3.length).toBe(1);
		});
		// Click y espera Slide 2 de regreso
		const prevBtn = screen.getByLabelText("Anterior");
		fireEvent.click(prevBtn);
		await waitFor(() => {
			const visibles2 = screen
				.getAllByText(/Slide 2/i, { exact: false })
				.filter((el) => el.closest('[aria-hidden="false"]'));
			expect(visibles2.length).toBe(1);
		});
	});

	test("renders pagination dots and allows direct navigation", async () => {
		renderWithProvider(
			<Carousel slideMode="single" showPagination>
				{slides}
			</Carousel>
		);
		// Busca los botones de paginación (dots)
		const dots = screen.getAllByRole("button", { name: /Ir a la diapositiva/i });
		expect(dots.length).toBe(3);
		fireEvent.click(dots[2]);
		await waitFor(() => {
			const visibles3 = screen
				.getAllByText(/Slide 3/i, { exact: false })
				.filter((el) => el.closest('[aria-hidden="false"]'));
			expect(visibles3.length).toBe(1);
		});
	});

	test("loop navigation works if loop=true", async () => {
		renderWithProvider(
			<Carousel slideMode="single" loop>
				{slides}
			</Carousel>
		);
		const nextBtn = screen.getByLabelText("Siguiente");
		// Click y espera Slide 2
		fireEvent.click(nextBtn);
		waitFor(() => {
			const visibles2 = screen
				.getAllByText(/Slide 2/i, { exact: false })
				.filter((el) => el.closest('[aria-hidden="false"]'));
			expect(visibles2.length).toBe(1);
		});
		// Click y espera Slide 3
		fireEvent.click(nextBtn);
		waitFor(() => {
			const visibles3 = screen
				.getAllByText(/Slide 3/i, { exact: false })
				.filter((el) => el.closest('[aria-hidden="false"]'));
			expect(visibles3.length).toBe(1);
		});
		// Click y espera Slide 1 (loop)
		fireEvent.click(nextBtn);
		await waitFor(() => {
			const visibles1 = screen
				.getAllByText(/Slide 1/i, { exact: false })
				.filter((el) => el.closest('[aria-hidden="false"]'));
			expect(visibles1.length).toBe(1);
		});
		const prevBtn = screen.getByLabelText("Anterior");
		fireEvent.click(prevBtn);
		await waitFor(() => {
			const visibles3 = screen
				.getAllByText(/Slide 3/i, { exact: false })
				.filter((el) => el.closest('[aria-hidden="false"]'));
			expect(visibles3.length).toBe(1);
		});
	});
});
