import { Meta, StoryObj } from "@storybook/react-vite";
import { Splitter } from "./Splitter";
import type { SplitterDirection } from "./splitter.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const directionOptions: SplitterDirection[] = ["horizontal", "vertical"];

const meta: Meta<typeof Splitter> = {
	title: "Components/Splitter",
	component: Splitter,
	argTypes: {
		direction: { control: "inline-radio", options: directionOptions },
		min: { control: "number" },
		max: { control: "number" },
		initial: { control: "number" },
	},
	args: {
		direction: "horizontal",
		min: 100,
		max: 600,
		initial: 200,
	},
};

export default meta;
type Story = StoryObj<typeof Splitter>;

export const Playground: Story = {
	render: (args) => (
		<ContainerComponent title="Splitter" subtitle={args.direction}>
			<div style={{ minHeight: 220, minWidth: 320, height: "100%", width: "100%" }}>
				<Splitter {...args}>
					<div
						style={{
							padding: 16,
							backgroundSize: "10px 10px",
							backgroundImage:
								"repeating-linear-gradient(45deg, var(--surface-b) 0, var(--surface-b) 1px, var(--surface-a) 0, var(--surface-a) 50%)",
							borderRadius: "var(--border-radius-xs) 0 0 var(--border-radius-xs)",
							border: "1px solid var(--border-color)",
							height: "100%",
						}}
					>
						<strong>Panel 1</strong>
						<p>Contenido del panel izquierdo/arriba.</p>
					</div>
					<div
						style={{
							padding: 16,
							backgroundSize: "10px 10px",
							backgroundImage:
								"repeating-linear-gradient(45deg, var(--surface-b) 0, var(--surface-b) 1px, var(--surface-a) 0, var(--surface-a) 50%)",
							borderRadius: "0 var(--border-radius-xs) var(--border-radius-xs) 0",
							border: "1px solid var(--border-color)",
							height: "100%",
						}}
					>
						<strong>Panel 2</strong>
						<p>Contenido del panel derecho/abajo.</p>
					</div>
				</Splitter>
			</div>
		</ContainerComponent>
	),
};
