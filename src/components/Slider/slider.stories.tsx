import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";
import { useState } from "react";
import { SliderProps } from "./slider.types";
import { Input } from "../Input/Input";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Slider> = {
	title: "Components/Slider",
	component: Slider,
	argTypes: {
		orientation: {
			control: "inline-radio",
			options: ["horizontal", "vertical"],
			description: "Orientation of the range slider",
			defaultValue: "horizontal",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Radius of the range slider",
			defaultValue: "medium",
		},
		onChangeValue: {
			table: {
				disabled: true,
			},
		},
		value: {
			table: {
				disabled: true,
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
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
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

const SliderSingle = (args: SliderProps) => {
	const [valueSlider, setValueSlider] = useState<number>(50);
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("local");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { defaultValue, ...restArgs } = args;

	return (
		<ContainerComponent
			title="Slider"
			subtitle="Single"
			onChangeStyleSource={(e) => setCurrentStyle(e)}
			styleSource={currentStyle}
		>
			<div style={{ width: "130px", padding: "20px" }}>
				<Input
					value={valueSlider.toString()}
					disabled
					style={{ textAlign: "center" }}
					label="Value"
				/>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					maxWidth: "700px",
					height: "25em",
					padding: "20px",
				}}
			>
				<Slider
					{...restArgs}
					value={valueSlider}
					onChangeValue={(e) => setValueSlider(e)}
					radius={currentStyle === "local" ? args.radius : undefined}
				/>
			</div>
		</ContainerComponent>
	);
};

const SliderDouble = (args: SliderProps & React.RefAttributes<HTMLDivElement>) => {
	const [valueSlider, setValueSlider] = useState<[number, number]>([10, 80]);
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("local");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { defaultValue, ...restArgs } = args;

	return (
		<ContainerComponent
			title="Slider"
			subtitle="Double"
			onChangeStyleSource={(e) => setCurrentStyle(e)}
			styleSource={currentStyle}
		>
			<div style={{ display: "flex", gap: "var(--gap-lg)", width: "150px", padding: "20px" }}>
				<Input
					value={valueSlider.toString().split(",")[0]}
					disabled
					style={{ textAlign: "center" }}
					label="Min"
				/>
				<Input
					value={valueSlider.toString().split(",")[1]}
					disabled
					style={{ textAlign: "center" }}
					label="Max"
				/>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					maxWidth: "700px",
					height: "25em",
					padding: "20px",
				}}
			>
				<Slider.Range
					{...restArgs}
					value={valueSlider}
					radius={currentStyle === "local" ? args.radius : undefined}
					onChangeValue={(e) => setValueSlider(e)}
				/>
			</div>
		</ContainerComponent>
	);
};

export const Single: StoryObj<typeof Slider> = {
	render: (args) => <SliderSingle {...args} />,
	args: {
		min: 0,
		max: 100,
		step: 25,
		radius: "full",
		disabled: false,
		orientation: "horizontal",
		size: "medium",
		label: "",
		viewValue: true,
		viewBar: true,
		marks: [
			{ value: 0, label: "0%" },
			{ value: 25, label: "25%" },
			{ value: 50, label: "50%" },
			{ value: 75, label: "75%" },
			{ value: 100, label: "100%" },
		],
	},
};

export const Double: StoryObj<typeof Slider> = {
	render: (args) => <SliderDouble {...args} />,
	args: {
		min: 0,
		max: 100,
		step: 5,
		radius: "full",
		disabled: false,
		orientation: "horizontal",
		size: "medium",
		label: "",
		viewValue: true,
		viewBar: true,
		marks: [
			{ value: 0, label: "0" },
			{ value: 10, label: "" },
			{ value: 15, label: "" },
			{ value: 20, label: "" },
			{ value: 25, label: "25" },
			{ value: 50, label: "50" },
			{ value: 75, label: "75" },
			{ value: 100, label: "100" },
		],
	},
};
