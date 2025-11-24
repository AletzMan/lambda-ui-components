import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { InputFeatures } from "./InputFeatures";
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

export const inputProps: TableProps[] = [
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Adjusts the input’s height, spacing, and font size to match different UI scales.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls how rounded the input’s corners are, from sharp edges to fully pill-shaped.",
	},
	{
		prop: "variant",
		type: `"outlined" | "soft"`,
		default: `"outlined"`,
		typePrimitive: "string",
		tooltip:
			"Defines the input’s visual style, such as a bordered appearance or a subtle filled background.",
	},
	{
		prop: "invalid",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Marks the input as invalid and applies its error styling and messaging.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Prevents interaction with the input, visually indicating it cannot be edited.",
	},
	{
		prop: "type",
		type: `"text" | "password" | "email" | string`,
		default: `"text"`,
		typePrimitive: "string",
		tooltip: "Sets the underlying HTML input type (e.g., text, password, email, etc.).",
	},
	{
		prop: "label",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Adds a label describing the purpose of the input.",
	},
	{
		prop: "errorMessage",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Message shown below the input when it's invalid or fails validation.",
	},
	{
		prop: "floatingLabel",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Enables a floating label that animates above the input when focused or filled.",
	},
	{
		prop: "helperText",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Extra descriptive text displayed under the input to guide the user.",
	},
	{
		prop: "required",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates that the input must be filled out before submitting a form.",
	},
	{
		prop: "prefix",
		type: `ReactNode | string`,
		default: `undefined`,
		typePrimitive: "ReactNode | string",
		tooltip:
			"Element displayed before the input value, commonly used for icons, symbols, or short text.",
	},
	{
		prop: "suffix",
		type: `ReactNode | string`,
		default: `undefined`,
		typePrimitive: "ReactNode | string",
		tooltip: "Element displayed after the input value, such as icons, units, or actions.",
	},
	{
		prop: "onChange",
		type: `(value: string) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Callback fired whenever the input’s value is updated by the user.",
	},
	{
		prop: "value",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Represents the current value of the input (for controlled usage).",
	},
	{
		prop: "placeholder",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Hint text shown when the input has no value.",
	},
	{
		prop: "joinposition",
		type: `"first" | "last" | "middle"`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip:
			"Indicates the input’s position when visually grouped with other inputs (e.g., input addons or grouped fields).",
	},
];

export default function InputPage() {
	return (
		<ComponentsLayout
			title="Input"
			description="Input component is a form element that allows users to enter text"
			buttonLeft={{ href: "/docs/components/forms/file-upload", text: "File Upload" }}
			buttonRight={{ href: "/docs/components/forms/input-number", text: "Input Number" }}
			menuData={dataFeatures}
		>
			<InputFeatures />
			<TableProps props={inputProps} id="props" title="API Reference" subtitle="Props"/>
		</ComponentsLayout>
	);
}
