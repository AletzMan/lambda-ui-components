import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
	title: "Components/Link",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Link,
	argTypes: {
		type: {
			control: "select",
			options: ["default", "button"],
		},
		variant: {
			control: "select",
			options: ["classic", "solid", "outline", "dashed", "soft", "text"],
			description: "Visual style of the button",
			type: "string",
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "danger", "success", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Link size",
		},
		radius: {
			control: "select",
			options: ["none", "small", "medium", "large", "pill", "circle"],
			description: "Corner shape",
		},
		iconPosition: {
			control: "select",
			options: ["left", "right"],
			description: "Icon position",
		},
		loading: {
			control: "boolean",
			description: "Shows a loading spinner",
		},
		disabled: {
			control: "boolean",
			description: "Disables the button and makes it inactive.",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
	args: {
		type: "default",
		color: "secondary",
		variant: "solid",
		size: "medium",
		radius: "small",
		loading: false,
		disabled: false,
		iconPosition: "left",
		label: "Link",
	},
};

export const Primary: Story = {
	args: {
		type: "default",
		color: "primary",
		variant: "solid",
		size: "medium",
		radius: "small",
		loading: false,
		disabled: false,
		iconPosition: "left",
		label: "Link",
	},
};

export const Danger: Story = {
	args: {
		type: "default",
		color: "danger",
		variant: "solid",
		size: "medium",
		radius: "small",
		loading: false,
		disabled: false,
		iconPosition: "left",
		label: "Link",
	},
};

export const Success: Story = {
	args: {
		type: "default",
		color: "success",
		variant: "solid",
		size: "medium",
		radius: "small",
		loading: false,
		disabled: false,
		iconPosition: "left",
		label: "Link",
	},
};

export const Warning: Story = {
	args: {
		type: "default",
		color: "warning",
		variant: "solid",
		size: "medium",
		radius: "small",
		loading: false,
		disabled: false,
		iconPosition: "left",
		label: "Link",
	},
};
