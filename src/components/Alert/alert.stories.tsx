import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Alert> = {
	title: "Components/Alert",
	component: Alert,
	argTypes: {
		variant: {
			table: {
				disable: true,
			},
		},
		color: {
			control: "inline-radio",
			options: ["default", "primary", "danger", "success", "warning", "info"],
			description: "Background color",
			type: "string",
			if: {
				arg: "variant",
				exists: true,
			},
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Alert size",
		},
		title: {
			control: "text",
		},
		message: {
			control: "text",
		},
		showIcon: {
			table: {
				disable: true,
			},
		},
		customIcon: {
			table: {
				disable: true,
			},
		},
		onClose: {
			table: {
				disable: true,
			},
		},
		role: {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Flat: Story = {
	render: (args) => (
		<ContainerComponent
			title="Alert"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
		>
			<Alert {...args} />
		</ContainerComponent>
	),
	args: {
		color: "primary",
		variant: "flat",
		size: "medium",
		title: "Título del Alert",
		message: "Este es un mensaje de alerta interactivo.",
	},
};

export const Outline: Story = {
	render: (args) => (
		<ContainerComponent
			title="Alert"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
		>
			<Alert {...args} />
		</ContainerComponent>
	),
	args: {
		color: "primary",
		variant: "outline",
		size: "medium",
		title: "Título del Alert",
		message: "Este es un mensaje de alerta interactivo.",
	},
};

export const Solid: Story = {
	render: (args) => (
		<ContainerComponent
			title="Alert"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
		>
			<Alert {...args} />
		</ContainerComponent>
	),
	args: {
		color: "primary",
		variant: "solid",
		size: "medium",
		title: "Título del Alert",
		message: "Este es un mensaje de alerta interactivo.",
	},
};
