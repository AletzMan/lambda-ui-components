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
		count: {
			control: "number",
			type: "number",
			description: "Add a count to the badge",
		},
	},
};

export default meta;

export const Outline: StoryObj = {
	args: {
		variant: "outline",
		color: "primary",
		size: "small",
		text: "Badge",
		radius: "small",
		count: -1,
	},
};

export const Solid: StoryObj = {
	args: {
		variant: "solid",
		color: "primary",
		size: "small",
		text: "Badge",
		radius: "small",
		count: -1,
	},
};

export const Flat: StoryObj = {
	args: {
		variant: "flat",
		color: "primary",
		size: "small",
		text: "Badge",
		radius: "small",
		count: -1,
	},
};

export const Dashed: StoryObj = {
	args: {
		variant: "dashed",
		color: "primary",
		size: "small",
		text: "Badge",
		radius: "small",
		count: -1,
	},
};

export const Subtle: StoryObj = {
	args: {
		variant: "subtle",
		color: "primary",
		size: "small",
		text: "Badge",
		radius: "small",
		count: -1,
	},
};
