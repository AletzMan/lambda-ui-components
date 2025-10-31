import { render as rtlRender, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Accordion } from "./Accordion";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const items = [
	{ value: "panel1", header: "Header 1", content: "Content 1" },
	{ value: "panel2", header: "Header 2", content: "Content 2" },
	{ value: "panel3", header: "Header 3", content: "Content 3" },
];

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
		{children}
	</LambdaConfigProvider>
);

function render(ui: React.ReactElement) {
	return rtlRender(ui, { wrapper: Wrapper });
}

describe("Accordion", () => {
	test("renders all headers", () => {
		render(
			<Accordion>
				{items.map((item) => (
					<Accordion.Item value={item.value} key={item.value}>
						<Accordion.Header>{item.header}</Accordion.Header>
						<Accordion.Content>{item.content}</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion>
		);
		items.forEach((item) => {
			expect(screen.getByText(item.header)).toBeInTheDocument();
		});
	});

	test("opens and closes content on header click (uncontrolled)", async () => {
		render(
			<Accordion defaultValue={"panel1"}>
				{items.map((item) => (
					<Accordion.Item value={item.value} key={item.value}>
						<Accordion.Header>{item.header}</Accordion.Header>
						<Accordion.Content>{item.content}</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion>
		);
		// El primer panel debe estar abierto
		expect(screen.getByText("Content 1")).toBeVisible();
		// Los otros cerrados
		{
			const content2Panel = screen.getByText("Content 2").closest("div[aria-labelledby]");
			const content3Panel = screen.getByText("Content 3").closest("div[aria-labelledby]");
			expect(content2Panel).toHaveStyle({ height: "0px" });
			expect(content2Panel).toHaveAttribute("aria-hidden", "true");
			expect(content3Panel).toHaveStyle({ height: "0px" });
			expect(content3Panel).toHaveAttribute("aria-hidden", "true");
		}
		// Abrir el segundo panel
		fireEvent.click(screen.getByText("Header 2"));
		await waitFor(() => {
			const content2Panel = screen
				.getByText("Content 2")
				.closest("div[aria-labelledby]") as HTMLElement | null;
			// El panel abierto debe tener aria-hidden distinto de "true"
			expect(content2Panel).not.toHaveAttribute("aria-hidden", "true");
		});
		// Espera explícitamente a que el panel cerrado tenga aria-hidden="true" (después de la animación)
		const content1Panel = screen
			.getByText("Content 1")
			.closest("div[aria-labelledby]") as HTMLElement | null;
		// Simula el fin de la transición para que aria-hidden se actualice
		fireEvent.transitionEnd(content1Panel!);
		await waitFor(() => {
			expect(content1Panel).toHaveAttribute("aria-hidden", "true");
		});
	});

	test("calls onValueChange when controlled", () => {
		const handleChange = vi.fn();
		render(
			<Accordion value={"panel1"} onValueChange={handleChange}>
				{items.map((item) => (
					<Accordion.Item value={item.value} key={item.value}>
						<Accordion.Header>{item.header}</Accordion.Header>
						<Accordion.Content>{item.content}</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion>
		);
		fireEvent.click(screen.getByText("Header 2"));
		expect(handleChange).toHaveBeenCalledWith("panel2");
	});

	test("does not open disabled item", async () => {
		render(
			<Accordion defaultValue={"panel1"}>
				<Accordion.Item value="panel1">
					<Accordion.Header>Header 1</Accordion.Header>
					<Accordion.Content>Content 1</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="panel2" disabled>
					<Accordion.Header>Header 2</Accordion.Header>
					<Accordion.Content>Content 2</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		);
		fireEvent.click(screen.getByText("Header 2"));
		await waitFor(() => {
			const content2Panel = screen.getByText("Content 2").closest("div[aria-labelledby]");
			expect(content2Panel).toHaveStyle({ height: "0px" });
			expect(content2Panel).toHaveAttribute("aria-hidden", "true");
		});
	});

	test("has correct aria attributes for accessibility", () => {
		render(
			<Accordion defaultValue={"panel1"}>
				<Accordion.Item value="panel1">
					<Accordion.Header>Header 1</Accordion.Header>
					<Accordion.Content>Content 1</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		);
		const header = screen.getByRole("button", { name: "Header 1" });
		const content = screen.getByText("Content 1").closest("div[aria-labelledby]");
		expect(header).toHaveAttribute("aria-expanded", "true");
		expect(header).toHaveAttribute("aria-controls");
		expect(content).toHaveAttribute("aria-labelledby");
	});
});
