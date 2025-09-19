import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { InputNumber } from "./InputNumber";
import { InputNumberProps } from "./inputnumber.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof InputNumber> = {
	title: "Components/InputNumber",
	component: InputNumber,
	argTypes: {
		variant: {
			control: "select",
			options: ["outline", "flat"],
			description: "Visual style of the input",
			type: "string",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		label: {
			control: "text",
			type: "string",
			description: "Text to display as the label for the component",
		},
		helperText: {
			control: "text",
			type: "string",
			description: "Displays helper text beneath the input.",
		},
		typeNumber: {
			control: "select",
			type: "string",
			options: ["default", "currency-USD", "currency-EUR", "currency-GBP", "percentage", "decimal"],
		},
		invalid: {
			control: "boolean",
			type: "boolean",
			description: "Applies error styles when true",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		onChange: { action: "onChange" },
	},
};

export default meta;

type Story = StoryObj<typeof InputNumber>;

const Template = (args: InputNumberProps) => {
	return (
		<ContainerComponent
			title="InputNumber"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "40px",
					justifyContent: "center",
					width: "250px",
				}}
			>
				<InputNumber {...args} typeNumber="default" label="Default" />
				<InputNumber {...args} typeNumber="currency-USD" label="Currency USD" />
				<InputNumber {...args} typeNumber="currency-EUR" label="Currency EUR" />
				<InputNumber {...args} typeNumber="currency-GBP" label="Currency GBP" />
				<InputNumber {...args} typeNumber="percentage" label="Percentage" />
				<InputNumber {...args} typeNumber="decimal" label="Decimal" />
			</div>
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: Template,
	args: {
		variant: "outline",
		size: "medium",
		step: 1,
		min: 0,
		max: 100,
		typeNumber: "default",
		label: "Label",
		helperText: "Must be between 8 and 10 characters long.",
		required: false,
		invalid: false,
		errorMessage: "This is a sample error message for demonstration",
		placeholder: "0",
		disabled: false,
		onChange: action("onChange"),
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		size: "medium",
		step: 1,
		min: 0,
		max: 100,
		typeNumber: "default",
		label: "Label",
		helperText: "Must be between 8 and 10 characters long.",
		required: false,
		invalid: false,
		errorMessage: "This is a sample error message for demonstration",
		placeholder: "0",
		disabled: false,
		onChange: action("onChange"),
	},
};
