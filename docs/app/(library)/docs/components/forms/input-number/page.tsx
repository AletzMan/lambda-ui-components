import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { InputNumberFeatures } from "./InputNumberFeatures";
import { TableProps } from "../../components/TableProps";

export const dataFeatures = [
	{
		id: "on-this-page",
		label: "En esta página",
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
						id: "variant",
						label: "Variants",
						path: "#variant",
						target: "_top",
					},
					{
						id: "size",
						label: "Sizes",
						path: "#size",
						target: "_top",
					},
					{
						id: "radius",
						label: "Radius",
						path: "#radius",
						target: "_top",
					},
					{
						id: "typeNumber",
						label: "Type Number",
						path: "#typeNumber",
						target: "_top",
					},
					{
						id: "min",
						label: "Min",
						path: "#min",
						target: "_top",
					},
					{
						id: "max",
						label: "Max",
						path: "#max",
						target: "_top",
					},
					{
						id: "step",
						label: "Step",
						path: "#step",
						target: "_top",
					},
					{
						id: "label",
						label: "Label",
						path: "#label",
						target: "_top",
					},
					{
						id: "invalid",
						label: "Invalid State",
						path: "#invalid",
						target: "_top",
					},
					{
						id: "errorMessage",
						label: "Error Message",
						path: "#errorMessage",
						target: "_top",
					},
					{
						id: "helperText",
						label: "Helper Text",
						path: "#helperText",
						target: "_top",
					},
					{
						id: "required",
						label: "Required",
						path: "#required",
						target: "_top",
					},
					{
						id: "disabled",
						label: "Disabled",
						path: "#disabled",
						target: "_top",
					},
					{
						id: "controlled",
						label: "Controlled Component",
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

export const inputNumberProps: TableProps[] = [
	{
		prop: "variant",
		type: `"outlined" | "soft" `,
		default: `"outlined"`,
		typePrimitive: "string",
		tooltip: "Controls the visual style of the numeric input, such as border or background.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Sets the visual size of the input, adjusting padding and text size.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"tiny"`,
		typePrimitive: "string",
		tooltip: "Defines the border radius of the input.",
	},
	{
		prop: "invalid",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Marks the input as invalid and applies error styles.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Disables the input and prevents user interaction.",
	},
	{
		prop: "typeNumber",
		type: `"default" | "currency-USD" | "currency-EUR" | "currency-GBP" | "percentage" | "decimal"`,
		default: `"default"`,
		typePrimitive: "string",
		tooltip: "Internal subtype defining numeric input behavior.",
	},
	{
		prop: "min",
		type: `number`,
		default: `undefined`,
		typePrimitive: "number",
		tooltip: "Specifies the minimum numeric value allowed.",
	},
	{
		prop: "max",
		type: `number`,
		default: `undefined`,
		typePrimitive: "number",
		tooltip: "Specifies the maximum numeric value allowed.",
	},
	{
		prop: "step",
		type: `number`,
		default: `1`,
		typePrimitive: "number",
		tooltip: "Defines the increment used when stepping the value.",
	},
	{
		prop: "label",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "A visible text label describing the input.",
	},
	{
		prop: "errorMessage",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Message displayed when the input is marked as invalid.",
	},
	{
		prop: "helperText",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Additional helper text displayed below the input.",
	},
	{
		prop: "required",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates that the field is required for form submission.",
	},
	{
		prop: "defaultValue",
		type: `number`,
		default: `undefined`,
		typePrimitive: "number",
		tooltip: "Initial numeric value when the input is first rendered.",
	},
	{
		prop: "onChangeValue",
		type: `(value: number) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Callback fired whenever the numeric value changes.",
	},
	{
		prop: "value",
		type: `number`,
		default: `undefined`,
		typePrimitive: "number",
		tooltip: "Current numeric value (controlled mode).",
	},
	{
		prop: "joinposition",
		type: `"first" | "last" | "middle"`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Indicates the input's position inside a joined input group.",
	},
];

export default function InputNumberPage() {
	return (
		<ComponentsLayout
			title="Input Number"
			description="Input Number component is a form element that allows users to select a number"
			buttonLeft={{ href: "/docs/components/forms/date-picker", text: "Date Picker" }}
			buttonRight={{ href: "/docs/components/forms/input", text: "Input" }}
			menuData={dataFeatures}
		>
			<InputNumberFeatures />
			<TableProps props={inputNumberProps} />
		</ComponentsLayout>
	);
}
