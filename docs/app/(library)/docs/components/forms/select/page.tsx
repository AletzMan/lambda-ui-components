import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { SelectFeatures } from "./SelectFeatures";
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
export const selectProps: TableProps[] = [
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip:
			"Adjusts the select’s height, spacing, and font size to match different UI scales.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls how rounded the select’s corners are.",
	},
	{
		prop: "variant",
		type: `"outlined" | "soft"`,
		default: `"outlined"`,
		typePrimitive: "string",
		tooltip: "Determines whether the select has a bordered look or a subtle filled style.",
	},
	{
		prop: "invalid",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Marks the select as invalid and applies error styles.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Disables interaction and dims the component visually.",
	},
	{
		prop: "label",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Adds a text label describing the purpose of the select.",
	},
	{
		prop: "helperText",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Additional explanatory text displayed below the select.",
	},
	{
		prop: "required",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates that a value must be selected before submitting a form.",
	},
	{
		prop: "onChange",
		type: `(value: string) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Callback fired whenever the selected option changes.",
	},
	{
		prop: "value",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Represents the currently selected value (controlled mode).",
	},
	{
		prop: "placeholder",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Text shown when no option has been selected.",
	},
	{
		prop: "options",
		type: `IListCollection[]`,
		default: `undefined`,
		typePrimitive: "array",
		tooltip: "Array of option objects available for selection.",
	},
	{
		prop: "joinposition",
		type: `"first" | "last" | "middle"`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip:
			"Defines the select’s position when visually grouped with other form controls.",
	},
];


export default function InputPage() {
	return (
		<ComponentsLayout
			title="Select"
			description="Select is a form component that lets users choose a value from a list of options." 
			buttonLeft={{ href: "/docs/components/forms/radio", text: "Radio" }}
			buttonRight={{ href: "/docs/components/forms/slider", text: "Slider" }}
			menuData={dataFeatures}
		>
			<SelectFeatures />
			<TableProps props={selectProps} />
		</ComponentsLayout>
	);
}
