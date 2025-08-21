import { Table } from "./Table";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Table> = {
	title: "Components/Table",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Table,
	argTypes: {
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
		},
		variant: {
			control: "select",
			options: ["flat", "underlined", "striped", "bordered"],
		},
	},
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Bordered: Story = {
	args: {
		variant: "bordered",
		size: "medium",
	},
};

export const Flat: Story = {
	args: {
		variant: "flat",
		size: "medium",
	},
};

export const Underlined: Story = {
	args: {
		variant: "underlined",
		size: "medium",
	},
};

export const Striped: Story = {
	args: {
		variant: "striped",
		size: "medium",
	},
};
