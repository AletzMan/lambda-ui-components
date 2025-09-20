import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Switch } from "./Switch";
import { SwitchProps } from "./switch.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Switch> = {
	title: "Components/Switch",
	component: Switch,
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["solid", "soft", "outline"],
			description: "Visual style of the input",
			type: "string",
		},
		color: {
			control: "inline-radio",
			options: ["neutral", "primary", "secondary", "success", "danger", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		label: {
			control: "text",
			type: "string",
			description: "Text to display as the label for the component",
		},
		position_label: {
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

type Story = StoryObj<typeof Switch>;

const colors = ["neutral", "primary", "secondary", "success", "danger", "warning", "info"];

const Template = (args: SwitchProps) => {
	return (
		<ContainerComponent title="Switch" subtitle={args.variant?.toString() || ""}>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					gap: "2em",
					padding: "var(--padding-lg)",
				}}
			>
				{colors.map((color) => (
					<Switch
						key={color}
						{...args}
						color={color as SwitchProps["color"]}
						label={color}
						style={{
							textTransform: "capitalize",
						}}
						position_label="top"
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
		position_label: "right",
		disabled: false,
		onChange: action("onChange"),
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		color: "primary",
		size: "medium",
		label: "Label",
		position_label: "right",
		disabled: false,
		onChange: action("onChange"),
	},
};

export const Outline: Story = {
	render: Template,
	args: {
		variant: "outline",
		color: "primary",
		size: "medium",
		label: "Label",
		position_label: "right",
		disabled: false,
		onChange: action("onChange"),
	},
};
