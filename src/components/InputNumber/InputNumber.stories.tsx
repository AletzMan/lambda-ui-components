import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { InputNumber } from "./InputNumber";
import { InputNumberProps } from "./inputnumber.types";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof InputNumber> = {
	title: "Components/InputNumber",
	component: InputNumber,
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["outline", "flat"],
			description: "Visual style of the input",
			type: "string",
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Input radius",
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
			control: "inline-radio",
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
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="InputNumber"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
			onChangeStyleSource={(value) => setCurrentStyle(value)}
			styleSource={currentStyle}
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
				<InputNumber
					{...args}
					typeNumber="default"
					label="Default"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
				<InputNumber
					{...args}
					typeNumber="currency-USD"
					label="Currency USD"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
				<InputNumber
					{...args}
					typeNumber="currency-EUR"
					label="Currency EUR"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
				<InputNumber
					{...args}
					typeNumber="currency-GBP"
					label="Currency GBP"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
				<InputNumber
					{...args}
					typeNumber="percentage"
					label="Percentage"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
				<InputNumber
					{...args}
					typeNumber="decimal"
					label="Decimal"
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
			</div>
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: Template,
	args: {
		variant: "outline",
		size: "medium",
		radius: "tiny",
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
		radius: "tiny",
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
