import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { AlertProps } from "./alert.types";
import { AlertVariants } from "./alert.variants";

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
			table: {
				disable: true,
			},
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Alert size",
		},
		radius: {
			control: "inline-radio",
			options: ["default", "none", "tiny", "small", "medium", "large"],
			description: "Alert radius",
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

const colors = ["neutral", "primary", "secondary", "danger", "success", "warning", "info"];

const Template = (args: AlertProps) => {

	return (
		<ContainerComponent
			title="Alert"
			subtitle={args.variant?.toString() || ""}
			color={args.size?.toString() || ""}
		>
			<div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: "1rem" }}>
				{colors.map((color) => (
					<div style={{ width: "400px" }}>
						<label
							style={{
								fontSize: "12px",
								fontWeight: "bold",
								marginBottom: "0.5rem",
								textTransform: "capitalize",
								color: `${color === "neutral"
									? "var(--lambda-color-neutral-500)"
									: `var(--lambda-color-${color}-500)`
									}`,
							}}
						>
							{color}
						</label>
						<Alert
							{...args}
							key={color}
							color={color as AlertVariants["color"]}
							message="Este es un mensaje de alerta interactivo."
						/>
					</div>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Soft: Story = {
	render: (args) => <Template {...args} />,
	args: {
		color: "primary",
		variant: "soft",
		size: "medium",
		radius: "small",
		title: "Título del Alert",
		message: "Este es un mensaje de alerta interactivo.",
	},
};

export const Outline: Story = {
	render: (args) => <Template {...args} />,
	args: {
		color: "primary",
		variant: "outline",
		size: "medium",
		radius: "small",
		title: "Título del Alert",
		message: "Este es un mensaje de alerta interactivo.",
	},
};

export const Solid: Story = {
	render: (args) => <Template {...args} />,
	args: {
		color: "primary",
		variant: "solid",
		size: "medium",
		radius: "small",
		title: "Título del Alert",
		message: "Este es un mensaje de alerta interactivo.",
	},
};
