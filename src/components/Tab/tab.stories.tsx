import { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";

const meta: Meta<typeof Tab> = {
	title: "Components/Tab",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Tab,
	argTypes: {
		variant: {
			control: "select",
			options: ["underline", "flat", "box", "border"],
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
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Underline: Story = {
	args: {
		items: [
			{ id: "1", label: "Products", content: "Products content" },
			{ id: "2", label: "Orders", content: "Orders content" },
			{ id: "3", label: "Customers", content: "Customers content" },
		],
		variant: "underline",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};

export const Flat: Story = {
	args: {
		items: [
			{ id: "1", label: "Products", content: "Products content" },
			{ id: "2", label: "Orders", content: "Orders content" },
			{ id: "3", label: "Customers", content: "Customers content" },
		],
		variant: "flat",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};

export const Box: Story = {
	args: {
		items: [
			{ id: "1", label: "Products", content: "Products content" },
			{ id: "2", label: "Orders", content: "Orders content" },
			{ id: "3", label: "Customers", content: "Customers content" },
		],
		variant: "box",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};

export const Border: Story = {
	args: {
		items: [
			{ id: "1", label: "Products", content: "Products content" },
			{ id: "2", label: "Orders", content: "Orders content" },
			{ id: "3", label: "Customers", content: "Customers content" },
		],
		variant: "border",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};
