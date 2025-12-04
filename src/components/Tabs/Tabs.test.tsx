import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Tabs } from "./Tabs";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<LambdaConfigProvider lang="es" >
		{children}
	</LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
	return render(ui, { wrapper: Wrapper });
}

describe("Tabs", () => {
	test("renders tabs and panels", () => {
		renderWithProvider(
			<Tabs>
				<Tabs.List>
					<Tabs.Tab title="Tab 1" />
					<Tabs.Tab title="Tab 2" />
					<Tabs.Tab title="Tab 3" />
				</Tabs.List>
				<Tabs.Panels>
					<Tabs.Panel>Contenido 1</Tabs.Panel>
					<Tabs.Panel>Contenido 2</Tabs.Panel>
					<Tabs.Panel>Contenido 3</Tabs.Panel>
				</Tabs.Panels>
			</Tabs>
		);
		expect(screen.getByText("Tab 1")).toBeInTheDocument();
		expect(screen.getByText("Tab 2")).toBeInTheDocument();
		expect(screen.getByText("Tab 3")).toBeInTheDocument();
		// Por default, debe mostrar el contenido del primer tab
		expect(screen.getByText("Contenido 1")).toBeInTheDocument();
	});

	test("changes panel on tab click", () => {
		renderWithProvider(
			<Tabs>
				<Tabs.List>
					<Tabs.Tab title="Tab 1" />
					<Tabs.Tab title="Tab 2" />
					<Tabs.Tab title="Tab 3" />
				</Tabs.List>
				<Tabs.Panels>
					<Tabs.Panel>Contenido 1</Tabs.Panel>
					<Tabs.Panel>Contenido 2</Tabs.Panel>
					<Tabs.Panel>Contenido 3</Tabs.Panel>
				</Tabs.Panels>
			</Tabs>
		);
		const tab2 = screen.getByText("Tab 2");
		fireEvent.click(tab2);
		expect(screen.getByText("Contenido 2")).toBeInTheDocument();
		const tab3 = screen.getByText("Tab 3");
		fireEvent.click(tab3);
		expect(screen.getByText("Contenido 3")).toBeInTheDocument();
	});
});
