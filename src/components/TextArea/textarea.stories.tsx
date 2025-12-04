import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";
import { TextAreaProps } from "./textarea.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof TextArea> = {
	title: "Components/TextArea",
	component: TextArea,
	argTypes: {
		variant: {
			if: {
				arg: "variant",
			},
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Size of the card",
		},
		radius: {
			control: "inline-radio",
			options: ["default", "none", "tiny", "small", "medium", "large", "full"],
			description: "Radius of the card",
		},
		invalid: {
			control: "boolean",
			description: "Invalid state of the card",
		},
		required: {
			control: "boolean",
			description: "Required state of the card",
		},
		errorMessage: {
			control: "text",
			description: "Error message of the card",
		},
		helperText: {
			control: "text",
			description: "Helper text of the card",
		},
		disabled: {
			control: "boolean",
			description: "Disabled state of the card",
		},
		onFocus: {
			table: {
				disable: true,
			},
		},
		onBlur: {
			table: {
				disable: true,
			},
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
			<div style={{ width: "300px" }}>
				<TextArea {...args} />
			</div>
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: (args) => <Template {...args} variant="outline" />,
	args: {
		size: "medium",
		radius: "small",
		invalid: false,
		disabled: false,
		required: false,
		label: "Outline",
		placeholder: "Placeholder",
		helperText: "Helper Text",
		errorMessage: "Error Message",
	},
};

export const Soft: Story = {
	render: (args) => <Template {...args} variant="soft" />,
	args: {
		size: "medium",
		radius: "small",
		invalid: false,
		disabled: false,
		required: false,
		label: "Soft",
		placeholder: "Placeholder",
		helperText: "Helper Text",
		errorMessage: "Error Message",
	},
};
