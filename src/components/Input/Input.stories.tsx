import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { InputProps } from "./input.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Input> = {
	title: "Components/Input",
	component: Input,
	argTypes: {
		variant: {
			control: "select",
			options: ["outline", "flat", "underline"],
			description: "Visual style of the input",
			type: "string",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		type: {
			control: "select",
			options: ["text", "email", "password", "search"],
			description: "Input size",
		},
		radius: {
			control: "select",
			options: ["none", "small", "medium", "large", "pill"],
			description: "Corner shape",
		},
		label: {
			control: "text",
			type: "string",
			description: "Text to display as the label for the component",
		},
		floatingLabel: {
			control: "boolean",
			type: "boolean",
			description:
				"If true, the label will act as a placeholder when the input is empty and move above the input when it has focus or a value.            * The native input placeholder will be disabled.",
		},
		helperText: {
			control: "text",
			type: "string",
			description: "Displays helper text beneath the input.",
		},
		required: {
			control: "boolean",
			type: "boolean",
			description:
				"Indica si el campo de entrada es obligatorio.Si es `true`, se mostrará un indicador visual y/o se aplicará validación.",
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
	},
};

export default meta;

type Story = StoryObj<typeof Input>;

const Template = (args: InputProps) => {
	return (
		<ContainerComponent title="Input" subtitle={args.variant?.toString() || ""}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "var(--gap-lg)",
					padding: "var(--padding-lg)",
				}}
			>
				<div
					style={{ display: "flex", flexDirection: "column", gap: "var(--gap-xl", width: "300px" }}
				>
					<Input {...args} type="text" placeholder="Text input example" label="Text" />
					<Input {...args} type="password" placeholder="Password input example" label="Password" />
					<Input {...args} type="email" placeholder="Email input example" label="Email" />
					<Input {...args} type="search" placeholder="Search input example" label="Search" />
				</div>
			</div>
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: Template,
	args: {
		variant: "outline",
		radius: "small",
		size: "medium",
		label: "Password",
		floatingLabel: false,
		invalid: false,
		required: false,
		type: "password",
		helperText: "",
		errorMessage: "This is a sample error message for demonstration",
		placeholder: "Text input example",
		disabled: false,
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		radius: "small",
		size: "medium",
		label: "Passwword",
		floatingLabel: false,
		invalid: false,
		required: false,
		type: "password",
		helperText: "",
		errorMessage: "This is a sample error message for demonstration",
		placeholder: "Enter your password",
		disabled: false,
	},
};

export const Underline: Story = {
	render: Template,
	args: {
		variant: "underline",
		radius: "small",
		size: "medium",
		label: "Search",
		floatingLabel: false,
		invalid: false,
		required: false,
		type: "search",
		helperText: "",
		placeholder: "Search here...",
		disabled: false,
	},
};
