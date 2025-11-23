import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { RadioFeatures } from "./RadioFeatures";
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

export const radioProps: TableProps[] = [
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
		type: `"solid" | "soft" | "outline"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip:
			"Defines the input’s visual style, such as a bordered appearance or a subtle filled background.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "warning" | "error"`,
		default: `"primary"`,
		typePrimitive: "string",
		tooltip:
			"Defines the input’s visual style, such as a bordered appearance or a subtle filled background.",
	},
	{
		prop: "orientation",
		type: `"horizontal" | "vertical"`,
		default: `"horizontal"`,
		typePrimitive: "string",
		tooltip:
			"Defines the layout direction for the radio buttons within the group (e.g., horizontal or vertical).",
	},
	{
		prop: "showRadio",
		type: `boolean`,
		default: `true`,
		typePrimitive: "boolean",
		tooltip:
			"(Only for Radio.Button and Radio.Card)Controls the visibility of the radio input circle/dot itself.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Prevents interaction with the input, visually indicating it cannot be edited.",
	},
	{
		prop: "onChangeOption",
		type: `(value: string) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Callback fired whenever the selected option is updated by the user.",
	},
	{
		prop: "selectedOption",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Represents the current value of the input (for controlled usage).",
	},
];

export default async function RadioPage(params: {
	params: { id: string };
	searchParams: { type: string };
}) {
	const searchParams = await params.searchParams;
	const typeRadio: "radio" | "button" | "card" =
		(searchParams.type as "radio" | "button" | "card") || "radio";

	return (
		<ComponentsLayout
			title={typeRadio === "radio" ? "Radio" : typeRadio === "button" ? "Radio.Button" : "Radio.Card"}
			description={
				typeRadio === "radio"
					? "Radio component is a form element that allows users to select one option from a set of choices."
					: typeRadio === "button"
						? "Radio.Button component is a form element that allows users to select one option from a set of choices."
						: "Radio.Card component is a form element that allows users to select one option from a set of choices."
				}
			buttonLeft={{ href: "/docs/components/forms/input-number", text: "Input Number" }}
			buttonRight={{ href: "/docs/components/forms/select", text: "Select" }}
			menuData={dataFeatures}
		>
			<RadioFeatures typeRadio={typeRadio} />
			<TableProps props={radioProps} />
		</ComponentsLayout>
	);
}
