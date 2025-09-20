import type { Meta, StoryObj } from "@storybook/react";
import { Range } from "./Range";
import { useState } from "react";
import { RangeProps, RangeValue } from "./range.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { Input } from "../Input/Input";

const meta: Meta<typeof Range> = {
	title: "Components/Range",
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

const RangeSingle = (args: RangeProps) => {
	const [valueRange, setValueRange] = useState<RangeValue>(50);
	return (
		<ContainerComponent title="Range" subtitle="Single">
			<div style={{ width: "130px", padding: "20px" }}>
				<Input
					value={valueRange.toString()}
					disabled
					style={{ textAlign: "center" }}
					label="Value"
				/>
			</div>
			<div style={{ width: "100%", maxWidth: "700px", padding: "20px" }}>
				<Range
					{...args}
					value={valueRange}
					onInput={(e) => setValueRange(e)}
					onChange={(e) => setValueRange(e)}
				/>
			</div>
		</ContainerComponent>
	);
};

const RangeDouble = (args: RangeProps & React.RefAttributes<HTMLDivElement>) => {
	const [valueRange, setValueRange] = useState<RangeValue>([10, 80]);
	return (
		<ContainerComponent title="Range" subtitle="Double">
			<div style={{ display: "flex", gap: "var(--gap-lg)", width: "150px", padding: "20px" }}>
				<Input
					value={valueRange.toString().split(",")[0]}
					disabled
					style={{ textAlign: "center" }}
					label="Min"
				/>
				<Input
					value={valueRange.toString().split(",")[1]}
					disabled
					style={{ textAlign: "center" }}
					label="Max"
				/>
			</div>
			<div style={{ width: "100%", maxWidth: "700px", padding: "20px" }}>
				<Range
					{...args}
					value={valueRange}
					onInput={(e) => setValueRange(e)}
					onChange={(e) => setValueRange(e)}
				/>
			</div>
		</ContainerComponent>
	);
};

export const Single: StoryObj<typeof Range> = {
	render: (args) => <RangeSingle {...args} />,
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
		marks: [
			{ value: 0, label: "0" },
			{ value: 10, label: "" },
			{ value: 25, label: "25" },
			{ value: 50, label: "50" },
			{ value: 75, label: "75" },
			{ value: 100, label: "100" },
		],
	},
};

export const Double: StoryObj<typeof Range> = {
	render: (args) => <RangeDouble {...args} />,
	args: {
		min: 0,
		max: 100,
		step: 25,
		disabled: false,
		size: "medium",
		label: "",
		ariaLabel: "",
		viewValue: true,
		viewBar: true,
		marks: [
			{ value: 0, label: "0" },
			{ value: 25, label: "25" },
			{ value: 50, label: "50" },
			{ value: 75, label: "75" },
			{ value: 100, label: "100" },
		],
	},
};
