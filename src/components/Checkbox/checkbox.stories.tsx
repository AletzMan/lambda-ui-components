import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { CheckBoxProps } from "./checkbox.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Checkbox> = {
	title: "Components/Checkbox",
	component: Checkbox,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "soft", "outline"],
			description: "Visual style of the input",
			type: "string",
			table: {
				disable: true,
			},
		},
		color: {
			control: "select",
			options: ["neutral", "primary", "secondary", "danger", "success", "warning", "info"],
			description: "Background color",
			table: {
				disable: true,
			},
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
		label: {
			control: "text",
			type: "string",
			description: "Text to display as the label for the component",
			table: {
				disable: true,
			},
		},
		positionLabel: {
			control: "inline-radio",
			options: ["right", "left", "top", "bottom"],
			description: "Select position label right or left",
			type: "string",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

const colors = ["Neutral", "Primary", "Secondary", "Danger", "Success", "Warning", "Info"];

const Template = (args: CheckBoxProps) => (
	<ContainerComponent title="Checkbox" subtitle={args.variant?.toString() || ""}>
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
				gap: "var(--gap-lg)",
				padding: "var(--padding-lg)",
			}}
		>
			{colors.map((color) => (
				<Checkbox
					key={color}
					{...args}
					color={color.toLowerCase() as CheckBoxProps["color"]}
					label={color}
				/>
			))}
		</div>
	</ContainerComponent>
);

export const Solid: Story = {
	render: Template,
	args: {
		variant: "solid",
		color: "primary",
		size: "medium",
		label: "Label",
		positionLabel: "right",
		radius: "medium",
		checked: false,
		disabled: false,
	},
};
export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		color: "secondary",
		size: "medium",
		label: "Label",
		positionLabel: "right",
		radius: "medium",
		checked: false,
		disabled: false,
	},
};
export const Outline: Story = {
	render: Template,
	args: {
		variant: "outline",
		color: "danger",
		size: "medium",
		label: "Label",
		positionLabel: "right",
		radius: "medium",
		checked: false,
		disabled: false,
	},
};
