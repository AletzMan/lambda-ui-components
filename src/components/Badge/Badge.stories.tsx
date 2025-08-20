import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
	title: "Components/Badge",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Badge,
	argTypes: {
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "danger", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "select",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Input radius",
		},
		count: {
			control: "number",
			type: "number",
			description: "Add a count to the badge",
		},
		maxCount: {
			control: "number",
			type: "number",
			description: "Add a max count to the badge",
		},
	},
};

export default meta;

export const Default: StoryObj = {
	args: {
		size: "small",
		text: "Badge",
		radius: "small",
		count: -1,
		maxCount: -1,
	},
};
