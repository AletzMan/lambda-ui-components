import { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";
import { ProgressProps } from "./progress.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Progress> = {
	title: "Components/Progress",
	component: Progress,
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
		indeterminate: { control: "boolean" },
	},
	args: {
		value: 60,
		size: "small",
		color: "primary",
		variant: "bar",
		showValue: true,
		label: "Progreso",
		indeterminate: false,
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

export const IndeterminateBar: Story = {
	render: (args) => Template({ ...args }),
	args: {
		variant: "bar",
		indeterminate: true,
		value: 0,
		label: "Indeterminado",
	},
};

export const Circle: Story = {
	render: (args) => Template(args),
	args: {
		variant: "circle",
	},
};

export const IndeterminateCircle: Story = {
	render: (args) => Template({ ...args }),
	args: {
		variant: "circle",
		indeterminate: true,
		value: 0,
		label: "Indeterminado",
	},
};

export const AllColors: Story = {
	render: (args) => (
		<ContainerComponent title="Progress" subtitle="All Colors">
			<div
				style={{
					display: args.variant === "bar" ? "flex" : "grid",
					flexDirection: "column",
					gap: 30,
					width: "100%",
					gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
				}}
			>
				{["primary", "secondary", "neutral", "success", "danger", "warning", "info"].map(
					(color) => (
						<Progress
							key={color}
							{...args}
							color={color as ProgressProps["color"]}
							label={color
								.split("")
								.map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
								.join("")}
						/>
					)
				)}
			</div>
		</ContainerComponent>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<ContainerComponent title="Progress" subtitle="Sizes">
			<div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "center" }}>
				{["xs", "sm", "md", "lg"].map((size) => (
					<Progress key={size} {...args} size={size as ProgressProps["size"]} label={size} />
				))}
			</div>
		</ContainerComponent>
	),
};
