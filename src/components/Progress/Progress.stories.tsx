import { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";
import { ProgressProps } from "./progress.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Progress> = {
	title: "Components/Progress",
	component: Progress,
	tags: ["autodocs"],
	argTypes: {
		value: { control: { type: "range", min: 0, max: 100 } },
		size: { control: "radio", options: ["tiny", "small", "medium", "large"] },
		color: {
			control: "select",
			options: ["primary", "secondary", "neutral", "success", "danger", "warning", "info"],
		},
		variant: { control: "radio", options: ["bar", "circle"] },
		showValue: { control: "boolean" },
		label: { control: "text" },
	},
	args: {
		value: 60,
		size: "small",
		color: "primary",
		variant: "bar",
		showValue: true,
		label: "Progreso",
	},
};

export default meta;
type Story = StoryObj<typeof Progress>;

const Template = (args: ProgressProps) => {
	return (
		<ContainerComponent title="Progress" subtitle={args.variant?.toString()}>
			<Progress {...args} />
		</ContainerComponent>
	);
};

export const Bar: Story = {
	render: (args) => Template(args),
	args: {
		variant: "bar",
	},
};

export const Circle: Story = {
	render: (args) => Template(args),
	args: {
		variant: "circle",
	},
};

export const AllColors: Story = {
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			{["primary", "secondary", "neutral", "success", "danger", "warning", "info"].map((color) => (
				<Progress key={color} {...args} color={color as ProgressProps["color"]} label={color} />
			))}
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "center" }}>
			{["xs", "sm", "md", "lg"].map((size) => (
				<Progress key={size} {...args} size={size as ProgressProps["size"]} label={size} />
			))}
		</div>
	),
};
