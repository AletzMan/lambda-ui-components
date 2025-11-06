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
						id: "type",
						label: "Type",
						path: "#type",
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
						id: "floating-label",
						label: "Floating Label",
						path: "#floating-label",
						target: "_top",
					},
					{
						id: "prefix",
						label: "Prefix",
						path: "#prefix",
						target: "_top",
					},
					{
						id: "suffix",
						label: "Suffix",
						path: "#suffix",
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

interface InputProps {
	prop: string;
	type: string;
	default: string;
	typePrimitive: string;
	tooltip: string;
}

export const inputProps: InputProps[] = [
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip:
			"Controls the visual size of the input by modifying its height, padding, and text size.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the border curvature of the input, defining how rounded the corners appear.",
	},
	{
		prop: "variant",
		type: `"outlined" | "soft"`,
		default: `"outlined"`,
		typePrimitive: "string",
		tooltip:
			"Controls the visual style of the input, such as the border color or background color.",
	},
	{
		prop: "invalid",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip:
			"Indicates whether the input is in an invalid state, typically due to validation errors.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates whether the input is disabled, making it non-interactive.",
	},
	{
		prop: "type",
		type: `"text" | "password" | "email" | string`,
		default: `"text"`,
		typePrimitive: "string",
		tooltip: "Specifies the native HTML input type (e.g., 'text', 'password', 'email').",
	},
	{
		prop: "label",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Adds a descriptive text label associated with the input field.",
	},
	{
		prop: "errorMessage",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Displays an error message below the input when it's marked as invalid.",
	},
	{
		prop: "floatingLabel",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Enables a floating label animation that moves and shrinks when focused or filled.",
	},
	{
		prop: "helperText",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Displays additional information below the input.",
	},
	{
		prop: "required",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Marks the field as required for form validation.",
	},
	{
		prop: "prefix",
		type: `ReactNode | string`,
		default: `undefined`,
		typePrimitive: "ReactNode | string",
		tooltip: "Displays an element before the input value, such as an icon or text.",
	},
	{
		prop: "suffix",
		type: `ReactNode | string`,
		default: `undefined`,
		typePrimitive: "ReactNode | string",
		tooltip: "Displays an element after the input value, such as an icon or text.",
	},
	{
		prop: "onChange",
		type: `(value: string) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Callback function that is triggered when the input value changes.",
	},
	{
		prop: "value",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "The current value of the input field.",
	},
	{
		prop: "placeholder",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "The placeholder text displayed when the input is empty.",
	},
	{
		prop: "joinposition",
		type: `"first" | "last" | "middle"`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Controls the position of the prefix and suffix elements relative to the input value.",
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
			<TableProps props={inputProps} />
		</ComponentsLayout>
	);
}
