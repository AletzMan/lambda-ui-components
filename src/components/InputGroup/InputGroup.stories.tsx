import type { Meta, StoryObj } from "@storybook/react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { Input } from "../Input/Input";
import InputGroup, { InputGroupProps } from "./InputGroup";
import { Button } from "../Button/Button";
import { Filter, Search, Settings } from "lucide-react";

const meta: Meta<typeof InputGroup> = {
	title: "Components/InputGroup",
	component: InputGroup,
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

type Story = StoryObj<typeof InputGroup>;

const Template = (args: InputGroupProps) => {
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
				<div style={{ display: "flex", flexDirection: "column", gap: "40px", width: "300px" }}>
					<InputGroup {...args} prefixElement={<span>www.</span>} suffixElement={<span>.com</span>}>
						<Input type="text" placeholder="Text input example" label="Text" />
					</InputGroup>
					<InputGroup
						{...args}
						prefixElement={
							<Button color="warning" variant="soft">
								Button
							</Button>
						}
						suffixElement={<Button color="info" icon={<Search />}></Button>}
					>
						<Input type="text" placeholder="Text input example" label="Button" />
					</InputGroup>
					<InputGroup {...args} prefixElement={<Settings />} suffixElement={<Filter />}>
						<Input type="text" placeholder="Text input example" label="Icon" />
					</InputGroup>
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
		label: "Text",
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
		prefixElement: <span>@</span>,
		suffixElement: <span>€</span>,
	},
};
