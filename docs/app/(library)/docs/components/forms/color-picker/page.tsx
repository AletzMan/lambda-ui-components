import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { ColorPickerFeatures } from "./ColorPickerFeatures";
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
						id: "format",
						label: "Format",
						path: "#format",
						target: "_top",
					},
					{
						id: "showText",
						label: "Show Text",
						path: "#showText",
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
		tooltip:
			"Controls the visual size of the color picker by modifying its height, padding, and text size.",
	},
	{
		prop: "variant",
		type: `"solid" | "soft"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip:
			"Controls the visual style of the color picker, such as the border color or background color.",
	},
	{
		prop: "format",
		type: `"hex" | "rgb" | "rgba" | "hsl" | "hsla"`,
		default: `"hex"`,
		typePrimitive: "string",
		tooltip: "Controls the format of the color value, such as hex, rgb, rgba, hsl, or hsla.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates whether the color picker is disabled, making it non-interactive.",
	},
	{
		prop: "showText",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates whether the text input field is visible.",
	},
	{
		prop: "onChange",
		type: `(value: string) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Callback function that is triggered when the color value changes.",
	},
	{
		prop: "value",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "The current value of the color picker.",
	},
];

export default function ColorPickerPage() {
	return (
		<ComponentsLayout
			title="Color Picker"
			description="Color Picker component is a form element that allows users to select a color"
			buttonLeft={{ href: "/docs/components/forms/checkbox", text: "Checkbox" }}
			buttonRight={{ href: "/docs/components/forms/date-picker", text: "Date Picker" }}
			menuData={dataFeatures}
		>
			<ColorPickerFeatures />
			<TableProps props={inputProps} />
		</ComponentsLayout>
	);
}
