import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { SliderFeatures } from "./SliderFeatures";
import { TableProps } from "../../components/TableProps";

const dataFeatures: NavigationMenuData[] = [
	{
		id: "on-this-page",
		label: "On this page",
		path: "#on-this-page",
		icon: <List />,
		children: [
			{
				id: "features",
				label: "Features",
				path: "#features",
				target: "_top",
				children: [
					{
						id: "playground",
						label: "Playground",
						path: "#playground",
						target: "_top",
					},
					{
						id: "usage",
						label: "Usage",
						path: "#usage",
						target: "_top",
					}, 
					{
						id: "controlled",
						label: "Controlled",
						path: "#controlled",
						target: "_top",
					},
				],
			},
			{
				id: "api-reference",
				label: "API Reference",
				children: [
					{
						id: "base-slider-props",
						label: "Base Slider Props",
						path: "#base-slider-props",
						target: "_top",
					},
					{
						id: "slider-single-props",
						label: "Slider Single Props",
						path: "#slider-single-props",
						target: "_top",
					},
					{
						id: "slider-range-props",
						label: "Slider Range Props",
						path: "#slider-range-props",
						target: "_top",
					},
				],
			},
		],
	},
];

export const baseSliderProps: TableProps[] = [
	{
		prop: "min",
		type: "number",
		default: "0",
		typePrimitive: "number",
		tooltip: "The minimum allowed value of the slider.",
	},
	{
		prop: "max",
		type: "number",
		default: "100",
		typePrimitive: "number",
		tooltip: "The maximum allowed value of the slider.",
	},
	{
		prop: "step",
		type: "number",
		default: "1",
		typePrimitive: "number",
		tooltip: "Defines the increment when adjusting the slider.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Disables user interaction with the slider.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the overall track and thumb size.",
	},
	{
		prop: "label",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Optional text label for the slider.",
	},
	{
		prop: "viewValue",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "Shows the current value (e.g., tooltip or display).",
	},
	{
		prop: "viewBar",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "Shows the progress bar inside the slider track.",
	},
	{
		prop: "marks",
		type: "SliderMarks[]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Adds labeled or unlabeled markers along the slider track.",
	},
	{
		prop: "orientation",
		type: `"horizontal" | "vertical"`,
		default: `"horizontal"`,
		typePrimitive: "string",
		tooltip: "Sets the slider direction.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the roundness of the track and thumb.",
	},
	{
		prop: "formatValue",
		type: "(value: number) => string | number",
		default: "undefined",
		typePrimitive: "callback",
		tooltip: "Formats how the slider value is displayed.",
	},
];

export const sliderSingleProps: TableProps[] = [
	{
		prop: "defaultValue",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "The default value for the slider.",
	},
	{
		prop: "value",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "The selected value for the slider.",
	},
	{
		prop: "onChangeValue",
		type: "(value: number) => void",
		default: "undefined",
		typePrimitive: "callback",
		tooltip: "Callback fired when the slider value changes.",
	},
];

export const sliderRangeProps: TableProps[] = [
	{
		prop: "defaultValue",
		type: "[number, number]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "The default value range [min, max] for the slider.",
	},
	{
		prop: "value",
		type: "[number, number]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "The selected value range [min, max] for the slider.",
	},
	{
		prop: "onChangeValue",
		type: "(value: [number, number]) => void",
		default: "undefined",
		typePrimitive: "callback",
		tooltip: "Callback fired when the slider value range changes.",
	},
];



export default async function SliderPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Slider"
			description="Slider is a form component that lets users select a numeric value by dragging a handle along a track." 
			buttonLeft={{ href: "/docs/components/forms/select", text: "Select" }}
			buttonRight={{ href: "/docs/components/forms/switch", text: "Switch" }}
			menuData={dataFeatures}
		>
			<SliderFeatures mode={searchParams.mode as "single" | "range" || "single"} />
			<TableProps props={baseSliderProps} title="API Reference" subtitle="Base Slider Props" id="base-slider-props" />
			{searchParams.mode === "single" ? <TableProps props={sliderSingleProps} subtitle="Slider Single Props" id="slider-single-props" /> : <TableProps props={sliderRangeProps} subtitle="Slider Range Props" id="slider-range-props" />}
		</ComponentsLayout>
	);
}
