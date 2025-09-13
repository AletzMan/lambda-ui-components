import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";
import { TextAreaProps } from "./textarea.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof TextArea> = {
	title: "Components/TextArea",
	component: TextArea,
	argTypes: {
		variant: {
			table: {
				disabled: true,
			},
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Size of the card",
		},
		invalid: {
			control: "boolean",
			description: "Invalid state of the card",
		},
		disabled: {
			control: "boolean",
			description: "Disabled state of the card",
		},
		radius: {
			control: "select",
			options: ["none", "small", "medium", "large"],
			description: "Radius of the card",
		},
	},
};

export default meta;

type Story = StoryObj<typeof TextArea>;

const Template = (args: TextAreaProps) => {
	return (
		<ContainerComponent
			title="TextArea"
			subtitle={args.variant || ""}
			color={args.color?.toString() || ""}
		>
			<TextArea {...args} />
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: Template,
	args: {
		variant: "outline",
		size: "medium",
		radius: "small",
		invalid: false,
		disabled: false,
		label: "Outline",
		placeholder: "Placeholder",
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		size: "medium",
		radius: "small",
		invalid: false,
		disabled: false,
		label: "Soft",
		placeholder: "Placeholder",
	},
};
