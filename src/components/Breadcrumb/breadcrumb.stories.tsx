import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
	title: "Components/Breadcrumb",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Breadcrumb,
	argTypes: {
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Size of the breadcrumb",
			type: "string",
		},
		variant: {
			control: "select",
			options: ["outline", "flat", "none"],
			description: "Variant of the breadcrumb",
			type: "string",
		},
		separator: {
			control: "select",
			options: ["chevron", "slash", "dot", "arrow"],
			description: "Separator of the breadcrumb",
			type: "string",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
	args: {
		size: "medium",
		variant: "none",
		separator: "chevron",
	},
};
