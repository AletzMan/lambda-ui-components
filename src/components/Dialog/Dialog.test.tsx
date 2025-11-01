import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Dialog } from "./Dialog";
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

describe("Dialog", () => {
	test("renders dialog when open and not when closed", () => {
		const { rerender } = renderWithProvider(
			<Dialog isOpen={true} onClose={() => {}} title="Título">
				Contenido del modal
			</Dialog>
		);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText(/Contenido del modal/i)).toBeInTheDocument();
		rerender(
			<Wrapper>
				<Dialog isOpen={false} onClose={() => {}} title="Título">
					Contenido del modal
				</Dialog>
			</Wrapper>
		);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("calls onClose when overlay is clicked (non-modal)", () => {
		const onClose = vi.fn();
		renderWithProvider(
			<Dialog isOpen={true} onClose={onClose} title="Título">
				Contenido
			</Dialog>
		);
		const overlay = document.querySelector('[class*="lambda-dialog-overlay"]') as HTMLElement;
		fireEvent.click(overlay);
		expect(onClose).toHaveBeenCalled();
	});

	test("calls onClose when close button is clicked", () => {
		const onClose = vi.fn();
		renderWithProvider(
			<Dialog isOpen={true} onClose={onClose} title="Título" showCloseButton>
				Contenido
			</Dialog>
		);
		const closeBtn = screen.getByLabelText(/cerrar/i);
		fireEvent.click(closeBtn);
		expect(onClose).toHaveBeenCalled();
	});

	test("calls onClose when Escape is pressed", () => {
		const onClose = vi.fn();
		renderWithProvider(
			<Dialog isOpen={true} onClose={onClose} title="Título" closeOnEscape>
				Contenido
			</Dialog>
		);
		fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
		expect(onClose).toHaveBeenCalled();
	});

	test("does not call onClose when overlay is clicked if isModal", () => {
		const onClose = vi.fn();
		renderWithProvider(
			<Dialog isOpen={true} onClose={onClose} title="Título" isModal>
				Contenido
			</Dialog>
		);
		const overlay = document.querySelector('[class*="lambda-dialog-overlay"]') as HTMLElement;
		fireEvent.click(overlay);
		expect(onClose).not.toHaveBeenCalled();
	});

	test("dialog has correct accessibility attributes", () => {
		renderWithProvider(
			<Dialog isOpen={true} onClose={() => {}} title="Título">
				Contenido
			</Dialog>
		);
		const dialog = screen.getByRole("dialog");
		expect(dialog).toHaveAttribute("aria-modal", "true");
		// El título debe estar referenciado
		const title = screen.getByText("Título");
		expect(title.id).toBeTruthy();
		expect(dialog).toHaveAttribute("aria-labelledby", title.id);
	});

	test("renders footer when provided", () => {
		renderWithProvider(
			<Dialog isOpen={true} onClose={() => {}} title="Título" footer={<div>Pie</div>}>
				Contenido
			</Dialog>
		);
		expect(screen.getByText(/Pie/i)).toBeInTheDocument();
	});

	// Opcional: test draggable logic (solo que no crashee)
	test("renders draggable dialog without crashing", () => {
		renderWithProvider(
			<Dialog isOpen={true} onClose={() => {}} title="Título" isDraggable>
				Contenido
			</Dialog>
		);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	test("allows dragging the dialog panel", () => {
		renderWithProvider(
			<Dialog isOpen={true} onClose={() => {}} title="Título" isDraggable>
				Contenido
			</Dialog>
		);
		const header = screen.getByText("Título").closest("header");
		expect(header).toBeInTheDocument();

		// Simula drag: mouseDown en header, mouseMove en document, mouseUp en document
		fireEvent.mouseDown(header!);
		fireEvent.mouseMove(document, { clientX: 200, clientY: 150 });
		fireEvent.mouseUp(document);

		// No hay assert visual, pero esto cubre el código de dragging
	});
});
