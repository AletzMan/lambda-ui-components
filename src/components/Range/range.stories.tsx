import type { Meta, StoryObj } from "@storybook/react";
import { Range } from "./Range";
import { useState } from "react";
import { RangeProps, RangeValue } from "./range.types";

const meta: Meta<typeof Range> = {
	title: "Components/Range",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Range,
	argTypes: {
		onChange: {
			action: "changed",
			description: "Callback function when the value changes",
			table: {
				type: { summary: "(value: number | [number, number]) => void" },
			},
		},
		value: {
			control: "range",
			type: "number",
			description:
				"Value of the range, can be a single number or an array of two numbers for a range",
			defaultValue: 0,
			table: {
				type: { summary: "number | [number, number]" },
			},
		},
		min: {
			control: "number",
			type: "number",
			description: "Minimum value of the range",
			defaultValue: 0,
		},
		max: {
			control: "number",
			type: "number",
			description: "Maximum value of the range",
			defaultValue: 100,
		},
		step: {
			control: "number",
			type: "number",
			description: "Step value for the range",
			defaultValue: 1,
		},
		disabled: {
			control: "boolean",
			description: "Disable the range slider",
			defaultValue: false,
		},
		size: {
			control: "select",
			options: ["small", "medium", "large"],
			description: "Size of the card",
		},
		viewValue: {
			control: "boolean",
			description: "Show the value of the range",
			defaultValue: true,
		},
		viewBar: {
			control: "boolean",
			description: "Show the bar of the range",
			defaultValue: true,
		},
	},
};

export default meta;

const RangeWithControls = (args: RangeProps & React.RefAttributes<HTMLDivElement>) => {
	const [valueRange, setValueRange] = useState<RangeValue>([10, 80]);
	return (
		<div style={{ width: "300px", padding: "20px" }}>
			<Range
				{...args}
				value={valueRange}
				onInput={(e) => setValueRange(e)}
				onChange={(e) => setValueRange(e)}
			/>
		</div>
	);
};

export const Default: StoryObj<typeof Range> = {
	render: (args) => <RangeWithControls {...args} />,
	args: {
		min: 0,
		max: 100,
		step: 1,
		disabled: false,
		size: "medium",
		label: "",
		ariaLabel: "",
		viewValue: true,
		viewBar: true,
	},
};
