import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { LinkFeatures } from "./LinkFeatures";
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

export const baseLinkProps: TableProps[] = [
	{
		prop: "href",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The URL the link points to. Required.",
	},
	{
		prop: "type",
		type: `"default" | "button"`,
		default: `"default"`,
		typePrimitive: "string",
		tooltip: "Determines the visual appearance of the link.",
	},
	{
		prop: "label",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Text content of the link. Overrides children if provided.",
	},
	{
		prop: "icon",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Optional icon to display within the link.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, the link appears disabled and is not clickable.",
	},
	{
		prop: "variant",
		type: `"classic" | "solid" | "outline" | "dashed" | "soft" | "subtle" | "text" | "unstyled"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Style variant (only applies when type='button').",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"primary"`,
		typePrimitive: "string",
		tooltip: "Color scheme of the link.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the link.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Border radius (only applies when type='button').",
	},
	{
		prop: "iconPosition",
		type: `"left" | "right"`,
		default: `"left"`,
		typePrimitive: "string",
		tooltip: "Position of the icon relative to the label (only applies when type='button').",
	},
	{
		prop: "justify",
		type: `"start" | "center" | "end"`,
		default: `"center"`,
		typePrimitive: "string",
		tooltip: "Horizontal alignment (only applies when type='button').",
	},
];


export default async function LinkPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Link"
			description="Link component allows users to navigate to another page or resource."
			buttonLeft={{ href: "/docs/components/navigation/button", text: "Button" }}
			buttonRight={{ href: "/docs/components/navigation/menu", text: "Menu" }}
			menuData={dataFeatures}
		>
			<LinkFeatures />
			<TableProps props={baseLinkProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
