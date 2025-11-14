import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { TableProps } from "../../components/TableProps";
import { CheckboxFeatures } from "./CheckboxFeatures";

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
						id: "colors",
						label: "Colors",
						path: "#colors",
						target: "_top",
					},
					{
						id: "position-label",
						label: "Position Label",
						path: "#position-label",
						target: "_top",
					},
					{
						id: "disabled",
						label: "Disabled",
						path: "#disabled",
						target: "_top",
					},
					{
						id: "required",
						label: "Required",
						path: "#required",
						target: "_top",
					},
					{
						id: "invalid",
						label: "Invalid",
						path: "#invalid",
						target: "_top",
					},
					{
						id: "custom-icon",
						label: "Custom Icon",
						path: "#custom-icon",
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
		tooltip: "Adjusts the visual size of the checkbox by modifying its height.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"tiny"`,
		typePrimitive: "string",
		tooltip:
			"Controls the border curvature of the checkbox, defining how rounded the corners appear.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"primary"`,
		typePrimitive: "string",
		tooltip: "Controls the color of the checkbox.",
	},
	{
		prop: "variant",
		type: `"solid" | "outline" | "soft"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip:
			"Controls the visual style of the checkbox, such as the border color or background color.",
	},
	{
		prop: "positionLabel",
		type: `"left" | "right" | "top" | "bottom"`,
		default: `"right"`,
		typePrimitive: "string",
		tooltip: "Controls the position of the label relative to the checkbox.",
	},
	{
		prop: "invalid",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip:
			"Indicates whether the checkbox is in an invalid state, typically due to validation errors.",
	},
	{
		prop: "label",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Adds a descriptive text label associated with the checkbox.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates whether the checkbox is disabled, making it non-interactive.",
	},
	{
		prop: "required",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Marks the field as required for form validation.",
	},
	{
		prop: "defaultChecked",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates whether the checkbox is checked by default.",
	},
	{
		prop: "checked",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates whether the checkbox is checked.",
	},
	{
		prop: "onCheckedChange",
		type: `(checked: boolean) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Callback function that is triggered when the checkbox state changes.",
	},
];

export default function CheckboxPage() {
	return (
		<ComponentsLayout
			title="Checkbox"
			description="Checkbox component is a form element that allows users to select one or more options from a list of choices."
			buttonLeft={{ href: "/docs/theming/dark-mode", text: "Dark Mode" }}
			buttonRight={{ href: "/docs/components/forms/color-picker", text: "Color Picker" }}
			menuData={dataFeatures}
		>
			<CheckboxFeatures />
			<TableProps props={inputProps} />
		</ComponentsLayout>
	);
}
