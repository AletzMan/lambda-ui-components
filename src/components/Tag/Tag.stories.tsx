import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { BadgeCheck } from "lucide-react";

const meta: Meta<typeof Tag> = {
	title: "Components/Tag",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Tag,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "outline", "flat", "dashed", "subtle"],
			description: "Visual style of the input",
			type: "string",
			defaultValue: "subtle",
			table: {
				defaultValue: {
					summary: "subtle",
				},
			},
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
		text: {
			control: "text",
			description: "Input text",
		},
		onClose: {
			control: "boolean",
			description: "Input onClose",
		},
	},
};

export default meta;

export const Outline: StoryObj = {
	args: {
		variant: "outline",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
		onClose: false,
	},
};

export const Solid: StoryObj = {
	args: {
		variant: "solid",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
		onClose: false,
	},
};

export const Flat: StoryObj = {
	args: {
		variant: "flat",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
		onClose: false,
	},
};

export const Dashed: StoryObj = {
	args: {
		variant: "dashed",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
		onClose: false,
	},
};

export const Subtle: StoryObj = {
	args: {
		variant: "subtle",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
		onClose: false,
	},
};
