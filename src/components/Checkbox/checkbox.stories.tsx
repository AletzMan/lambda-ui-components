import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import { CheckBoxProps } from "./checkbox.types";
import { useState } from "react";
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
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
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
		required: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		invalid: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
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

const Template = (args: CheckBoxProps) => {
	const [currentStyles, setCurrentStyles] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="Checkbox"
			subtitle={args.variant?.toString() || ""}
			onChangeStyleSource={(value) => setCurrentStyles(value)}
			styleSource={currentStyles}
		>
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
						radius={currentStyles === "local" ? args.radius : undefined}
						onCheckedChange={(checked) => console.log(checked)}
						onChange={(e) => console.log(e.target.checked)}
					/>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Solid: Story = {
	render: Template,
	args: {
		variant: "solid",
		color: "primary",
		size: "medium",
		label: "Label",
		positionLabel: "right",
		radius: "small",
		disabled: false,
		required: false,
		invalid: false,
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
		radius: "small",
		disabled: false,
		required: false,
		invalid: false,
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
		radius: "small",
		disabled: false,
		required: false,
		invalid: false,
	},
};
