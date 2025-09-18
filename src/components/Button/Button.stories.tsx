import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ButtonProps } from "./button.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { CircleCheck } from "lucide-react";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	argTypes: {
		variant: {
			control: "select",
			options: ["classic", "solid", "outline", "dashed", "soft", "subtle", "text"],
			description: "Visual style of the button",
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
			description: "Button size",
		},
		iconPosition: {
			control: "inline-radio",
			options: ["left", "right"],
			description: "Icon position",
		},
		loading: {
			control: "boolean",
			description: "Shows a loading spinner",
		},
		disabled: {
			control: "boolean",
			description: "Disables the button and makes it inactive.",
		},
		isCircle: {
			control: "boolean",
			description: "Makes the button circular.",
		},
		"aria-label": {
			control: "text",
			description: "Aria label for the button",
			table: {
				disable: true,
			},
		},
		icon: {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

const buttonColors = ["neutral", "primary", "secondary", "danger", "success", "warning", "info"];

const Template = (args: ButtonProps) => {
	return (
		<ContainerComponent title="Button" subtitle={args.variant?.toString() || ""}>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "center",
					gap: "1rem",
				}}
			>
				{buttonColors.map((color) => (
					<Button
						{...args}
						key={color}
						color={color as ButtonProps["color"]}
						variant={args.variant}
						size={args.size}
						loading={args.loading}
						disabled={args.disabled}
						iconPosition={args.iconPosition}
						icon={args.loading ? undefined : args.icon}
						label={args.isCircle ? "" : args.loading ? args.loadingText : color}
						style={{ textTransform: "capitalize" }}
					/>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Solid: Story = {
	render: Template,
	args: {
		color: "secondary",
		variant: "solid",
		size: "medium",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		isCircle: false,
		icon: <CircleCheck />,
	},
};

export const Classic: Story = {
	render: Template,
	args: {
		color: "primary",
		variant: "classic",
		size: "medium",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		isCircle: false,
		icon: <CircleCheck />,
	},
};

export const Outline: Story = {
	render: Template,
	args: {
		color: "danger",
		variant: "outline",
		size: "medium",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		isCircle: false,
		icon: <CircleCheck />,
	},
};

export const Dashed: Story = {
	render: Template,
	args: {
		color: "success",
		variant: "dashed",
		size: "medium",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		isCircle: false,
		icon: <CircleCheck />,
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		color: "warning",
		variant: "soft",
		size: "medium",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		isCircle: false,
		icon: <CircleCheck />,
	},
};

export const Subtle: Story = {
	render: Template,
	args: {
		color: "warning",
		variant: "subtle",
		size: "medium",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		isCircle: false,
		icon: <CircleCheck />,
	},
};

export const Text: Story = {
	render: Template,
	args: {
		color: "warning",
		variant: "text",
		size: "medium",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		isCircle: false,
		icon: <CircleCheck />,
	},
};
