import { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";
import { DividerProps } from "./divider.types";
import { Card } from "../Card/Card";
import { Switch } from "../Switch/Switch";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Divider> = {
	title: "Components/Divider",
	component: Divider,
	argTypes: {
		variant: {
			if: {
				arg: "variant",
			},
		},
		orientation: {
			control: "inline-radio",
			options: ["horizontal", "vertical"],
			description: "Orientation of the divider",
			type: "string",
		},
		color: {
			control: "inline-radio",
			options: [
				"neutral",
				"primary",
				"secondary",
				"success",
				"danger",
				"warning",
				"info",
				"white",
				"black",
			],
			description: "Background color",
		},
		contentPosition: {
			control: "inline-radio",
			options: ["start", "center", "end"],
			description: "Content position of the divider",
			type: "string",
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Size of the divider",
			type: "string",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Divider>;

const Template = (args: DividerProps) => {
	const [hasContent, setHasContent] = useState(false);
	return (
		<ContainerComponent title="Divider" subtitle={args.variant?.toString() || ""}>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
				<Switch
					label="Has Content"
					checked={hasContent}
					onChange={(e) => setHasContent(e.target.checked)}
				/>
				<Card>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							padding: "10px",
							height: "250px",
							width: "250px",
							alignItems: "center",
							flexDirection: args.orientation === "vertical" ? "row" : "column",
						}}
					>
						<p
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "var(--surface-c)",
								padding: "10px",
								width: "100%",
								height: "100%",
								borderRadius: "var(--border-radius-sm)",
							}}
						>
							Content
						</p>
						<Divider {...args}>{hasContent ? "Label" : ""}</Divider>
						<p
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "var(--surface-c)",
								padding: "10px",
								width: "100%",
								height: "100%",
								borderRadius: "var(--border-radius-sm)",
							}}
						>
							Content
						</p>
					</div>
				</Card>
			</div>
		</ContainerComponent>
	);
};

export const Solid: Story = {
	render: (args) => <Template {...args} variant="solid" />,
	args: {
		orientation: "horizontal",
		color: "neutral",
		size: "tiny",
		contentPosition: "center",
	},
};

export const Dashed: Story = {
	render: (args) => <Template {...args} variant="dashed" />,
	args: {
		orientation: "horizontal",
		color: "neutral",
		size: "tiny",
		contentPosition: "center",
	},
};

export const Dotted: Story = {
	render: (args) => <Template {...args} variant="dotted" />,
	args: {
		orientation: "horizontal",
		color: "neutral",
		size: "tiny",
		contentPosition: "center",
	},
};
