import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Drawer } from "./Drawer";
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

describe("Drawer", () => {
	test("renders drawer when open and not when closed", async () => {
		const { rerender } = renderWithProvider(
			<Drawer isOpen={true} onClose={() => {}} title="Título">
				Contenido del drawer
			</Drawer>
		);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText(/Contenido del drawer/i)).toBeInTheDocument();

		rerender(
			<Wrapper>
				<Drawer isOpen={false} onClose={() => {}} title="Título">
					Contenido del drawer
				</Drawer>
			</Wrapper>
		);
		await waitFor(() => {
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		});
	});

	test("calls onClose when overlay is clicked", () => {
		const onClose = vi.fn();
		renderWithProvider(
			<Drawer isOpen={true} onClose={onClose} title="Título">
				Contenido
			</Drawer>
		);
		const overlay = document.querySelector('[class*="lambda-drawer-overlay"]') as HTMLElement;
		fireEvent.click(overlay);
		expect(onClose).toHaveBeenCalled();
	});

	test("calls onClose when close button is clicked", () => {
		const onClose = vi.fn();
		renderWithProvider(
			<Drawer isOpen={true} onClose={onClose} title="Título" showCloseButton>
				Contenido
			</Drawer>
		);
		const closeBtn = screen.getByLabelText(/cerrar/i);
		fireEvent.click(closeBtn);
		expect(onClose).toHaveBeenCalled();
	});

	test("calls onClose when Escape is pressed", async () => {
		const onClose = vi.fn();
		renderWithProvider(
			<Drawer isOpen={true} onClose={onClose} title="Título" closeOnEscape>
				Contenido
			</Drawer>
		);
		// Espera a que Drawer esté completamente abierto (animación terminada)
		await waitFor(() => {
			const drawer = screen.getByRole("dialog");
			// Puedes afinar este selector si tienes una clase específica para el estado entered
			expect(drawer).toBeInTheDocument();
		});
		// Espera un poco más para asegurar que el handler esté activo
		await new Promise((res) => setTimeout(res, 60));
		fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
		expect(onClose).toHaveBeenCalled();
	});

	test("drawer has correct accessibility attributes", () => {
		renderWithProvider(
			<Drawer isOpen={true} onClose={() => {}} title="Título">
				Contenido
			</Drawer>
		);
		const drawer = screen.getByRole("dialog");
		expect(drawer).toHaveAttribute("aria-modal", "true");
		const title = screen.getByText("Título");
		expect(title.id).toBeTruthy();
		expect(drawer).toHaveAttribute("aria-labelledby", title.id);
	});

	test("renders footer when provided", () => {
		renderWithProvider(
			<Drawer isOpen={true} onClose={() => {}} title="Título" footer={<div>Pie</div>}>
				Contenido
			</Drawer>
		);
		expect(screen.getByText(/Pie/i)).toBeInTheDocument();
	});

	test("renders with different placements and sizes", () => {
		renderWithProvider(
			<Drawer isOpen={true} onClose={() => {}} title="T" placement="left" size="300px">
				L
			</Drawer>
		);
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		// Limpia el DOM antes del siguiente render
		// O usa un test independiente para cada placement
	});
});
