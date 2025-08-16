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
		variant: {
			control: "select",
			options: ["solid", "outline", "flat", "dashed", "subtle"],
			description: "Visual style of the input",
			type: "string",
		},
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
	},
};

export default meta;

export const Outline: StoryObj = {
	args: {
		variant: "outline",
		color: "primary",
		size: "medium",
		text: "Label",
		radius: "small",
	},
};

export const Solid: StoryObj = {
	args: {
		variant: "solid",
		color: "primary",
		size: "medium",
		text: "Label",
		radius: "small",
	},
};

export const Flat: StoryObj = {
	args: {
		variant: "flat",
		color: "primary",
		size: "medium",
		text: "Label",
		radius: "small",
	},
};

export const Dashed: StoryObj = {
	args: {
		variant: "dashed",
		color: "primary",
		size: "medium",
		text: "Label",
		radius: "small",
	},
};
