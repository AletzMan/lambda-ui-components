import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { NavigationMenuFeatures } from "./NavigationMenuFeatures";
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
						id: "render-label",
						label: "Custom Label Rendering",
						path: "#render-label",
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

export const baseNavigationMenuProps: TableProps[] = [
	{
		prop: "data",
		type: "NavigationMenuData[]",
		default: "[]",
		typePrimitive: "object",
		tooltip: "Array of menu items to render. Required.",
	},
	{
		prop: "currentPath",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The current active path for highlighting.",
	},
	{
		prop: "size",
		type: `"small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the size of the menu items.",
	},
	{
		prop: "showLines",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, displays connecting lines between parent and child items.",
	},
	{
		prop: "styleLines",
		type: `"solid" | "dashed" | "dotted"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Style of the connecting lines (if shown).",
	},
	{
		prop: "alwaysOpen",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, keeps all menu items expanded by default.",
	},
	{
		prop: "selectedStyle",
		type: `"highlight" | "border"`,
		default: `"highlight"`,
		typePrimitive: "string",
		tooltip: "Visual style for the selected item.",
	},
	{
		prop: "defaultExpanded",
		type: "string[]",
		default: "[]",
		typePrimitive: "object",
		tooltip: "Array of item IDs that should be expanded by default.",
	},
	{
		prop: "onNodeSelect",
		type: "(id: string) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when a node is selected.",
	},
	{
		prop: "renderLabel",
		type: "(node: NavigationMenuData) => ReactNode",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Custom renderer for the menu item label.",
	},
];


export default async function NavigationMenuPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Navigation Menu"
			description="Navigation Menu component displays a hierarchical list of links for site navigation."
			buttonLeft={{ href: "/docs/components/navigation/link", text: "Link" }}
			buttonRight={{ href: "/docs/components/navigation/pagination", text: "Pagination" }}
			menuData={dataFeatures}
		>
			<NavigationMenuFeatures />
			<TableProps props={baseNavigationMenuProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
