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
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Button radius",
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
		block: {
			control: "boolean",
			description: "Makes the button block.",
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
					flexDirection: "column",
					gap: "1rem",
					width: "100%",
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
						style={{ textTransform: "capitalize", minWidth: "130px" }}
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
		radius: "small",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		block: false,
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
		radius: "small",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		block: false,
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
		radius: "small",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		block: false,
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
		radius: "small",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		block: false,
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
		radius: "small",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		block: false,
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
		radius: "small",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		block: false,
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
		radius: "small",
		loading: false,
		loadingText: "Loading",
		disabled: false,
		iconPosition: "left",
		label: "Button",
		block: false,
		isCircle: false,
		icon: <CircleCheck />,
	},
};
