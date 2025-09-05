import { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import { DividerProps } from "./divider.types";
import { Card } from "../Card/Card";

const meta: Meta<typeof Divider> = {
	title: "Components/Divider",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Divider,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "dashed", "dotted"],
			description: "Visual style of the input",
			type: "string",
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Orientation of the divider",
			type: "string",
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "danger", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg"],
			description: "Size of the divider",
			type: "string",
		},
		type: {
			control: "select",
			options: ["full", "inset", "between"],
			description: "Type of the divider",
			type: "string",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Divider>;

const Template = (args: DividerProps) => {
	return (
		<Card>
			<div
				style={{
					height: "100px",
					width: "100px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: args.orientation === "vertical" ? "row" : "column",
					gap: "10px",
				}}
			>
				<p>Text</p>
				<Divider {...args} />
				<p>Text</p>
			</div>
		</Card>
	);
};

export const Default: Story = {
	render: Template,
	args: {
		variant: "solid",
		orientation: "horizontal",
		color: "primary",
		size: "xs",
		type: "full",
	},
};
