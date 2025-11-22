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
						id: "variants",
						label: "Variants",
						path: "#variants",
						target: "_top",
					},
					{
						id: "sizes",
						label: "Sizes",
						path: "#sizes",
						target: "_top",
					},
					{
						id: "radius",
						label: "Radius",
						path: "#radius",
						target: "_top",
					}, 
					{
						id: "disabled",
						label: "Disabled",
						path: "#disabled",
						target: "_top",
					},
					{
						id: "whit-label",
						label: "Whit Label",
						path: "#whit-label",
						target: "_top",
					},  
					{
						id: "required",
						label: "Required",
						path: "#required",
						target: "_top",
					},
					{
						id: "error-message",
						label: "Error Message",
						path: "#error-message",
						target: "_top",
					},
					{
						id: "helper-text",
						label: "Helper Text",
						path: "#helper-text",
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
						id: "props",
						label: "Props",
						path: "#props",
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



export default function SliderPage() {
	return (
		<ComponentsLayout
			title="Slider"
			description="Slider is a form component that lets users select a numeric value by dragging a handle along a track." 
			buttonLeft={{ href: "/docs/components/forms/select", text: "Select" }}
			buttonRight={{ href: "/docs/components/forms/switch", text: "Switch" }}
			menuData={dataFeatures}
		>
			<SliderFeatures />
			<TableProps props={baseSliderProps} title="API Reference" subtitle="Base Slider Props" />
			<TableProps props={sliderSingleProps} subtitle="Slider Single Props" />
			<TableProps props={sliderRangeProps} subtitle="Slider Range Props" />
		</ComponentsLayout>
	);
}
