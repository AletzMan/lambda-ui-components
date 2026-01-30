
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { ButtonFeatures } from "./ButtonFeatures";
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

export const baseButtonProps: TableProps[] = [
	{
		prop: "variant",
		type: `"classic" | "solid" | "outline" | "dashed" | "soft" | "subtle" | "text" | "unstyled"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Defines the visual style of the button.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "danger" | "success" | "warning" | "info"`,
		default: `"primary"`,
		typePrimitive: "string",
		tooltip: "Controls the color scheme of the button.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the size of the button.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Defines the border radius of the button.",
	},
	{
		prop: "block",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, the button will take up the full width of its container.",
	},
	{
		prop: "isCircle",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Makes the button circular (useful for icons).",
	},
	{
		prop: "iconPosition",
		type: `"left" | "right"`,
		default: `"left"`,
		typePrimitive: "string",
		tooltip: "Position of the icon relative to the label.",
	},
	{
		prop: "loading",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Shows a loading spinner.",
	},
	{
		prop: "icon",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Adds an icon to the button.",
	},
	{
		prop: "label",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The text content of the button.",
	},
	{
		prop: "loadingText",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Text to show when loading is true.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Disables user interaction with the button.",
	},
];


export default async function ButtonPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	
	return (
		<ComponentsLayout
			title="Button"
			description="Button component triggers an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation."
			buttonLeft={{ href: "/docs/components/navigation/breadcrumb", text: "Breadcrumb" }}
			buttonRight={{ href: "/docs/components/navigation/link", text: "Link" }}
			menuData={dataFeatures}
		>
			<ButtonFeatures />
			<TableProps props={baseButtonProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout >
	);
}
