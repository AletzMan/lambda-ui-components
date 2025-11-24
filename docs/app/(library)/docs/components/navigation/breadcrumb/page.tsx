import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { BreadcrumbFeatures } from "./BreadcrumbFeatures";
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

export const baseBreadcrumbProps: TableProps[] = [
	{
		prop: "items",
		type: "BreadcrumbItem[]",
		default: "[]",
		typePrimitive: "object",
		tooltip: "Array of breadcrumb items.",
	},
	{
		prop: "variant",
		type: `"chevron" | "slash" | "dot" | "arrow" | "stepped"`,
		default: `"chevron"`,
		typePrimitive: "string",
		tooltip: "Defines the visual style of the separator.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"primary"`,
		typePrimitive: "string",
		tooltip: "Controls the color scheme of the breadcrumb items.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Controls the size of the breadcrumb.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Defines the border radius of the breadcrumb items.",
	},
	{
		prop: "maxItems",
		type: "number",
		default: "0",
		typePrimitive: "number",
		tooltip: "Maximum number of items to show before collapsing (0 to show all).",
	},
];


export default async function BreadcrumbPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Breadcrumb"
			description="Breadcrumb component indicates the current page's location within a navigational hierarchy."
			buttonLeft={{ href: "/docs/components/layout/splitter", text: "Splitter" }}
			buttonRight={{ href: "/docs/components/navigation/button", text: "Button" }}
			menuData={dataFeatures}
		>
			<BreadcrumbFeatures />
			<TableProps props={baseBreadcrumbProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
