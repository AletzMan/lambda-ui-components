import { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
	title: "Components/ColorPicker",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: ColorPicker,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "flat", "outline"],
			description: "Visual style of the input",
			type: "string",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "select",
			options: ["none", "small", "medium", "circle"],
			description: "Corner shape",
			type: "string",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		showText: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
	},
};

export default meta;

export type Story = StoryObj<typeof ColorPicker>;

export const Solid: Story = {
	args: {
		variant: "solid",
		size: "medium",
		radius: "small",
		disabled: false,
		showText: false,
	},
};
