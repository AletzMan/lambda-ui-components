import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { TreeViewFeatures } from "./TreeViewFeatures";
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
						id: "directory",
						label: "Directory Mode",
						path: "#directory",
						target: "_top",
					},
					{
						id: "lines",
						label: "With Lines",
						path: "#lines",
						target: "_top",
					},
					{
						id: "custom-icons",
						label: "Custom Icons",
						path: "#custom-icons",
						target: "_top",
					},
					{
						id: "selection",
						label: "Selection",
						path: "#selection",
						target: "_top",
					},
					{
						id: "default-expanded",
						label: "Default Expanded",
						path: "#default-expanded",
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

export const baseTreeViewProps: TableProps[] = [
	{
		prop: "data",
		type: "TreeNode[]",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Hierarchical data to render.",
	},
	{
		prop: "defaultExpanded",
		type: "string[]",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Array of node IDs to expand by default.",
	},
	{
		prop: "selectedId",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "ID of the currently selected node.",
	},
	{
		prop: "onNodeSelect",
		type: "(id: string) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when a node is selected.",
	},
	{
		prop: "size",
		type: `"small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the tree items.",
	},
	{
		prop: "isDirectory",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, renders folder icons for parent nodes.",
	},
	{
		prop: "showLines",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, shows connection lines between nodes.",
	},
	{
		prop: "styleLines",
		type: `"solid" | "dashed" | "dotted"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Style of the connection lines.",
	},
	{
		prop: "renderLabel",
		type: "(node: TreeNode) => ReactNode",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Custom render function for node labels.",
	},
];

export default async function TreeViewPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	
	return (
		<ComponentsLayout
			title="TreeView"
			description="TreeView component for displaying hierarchical data, such as file systems or organizational charts."
			buttonLeft={{ href: "/docs/components/data-display/tag", text: "Tag" }}
			buttonRight={{ href: "/docs/components/utilities/button-theme", text: "Button Theme" }}
			menuData={dataFeatures}
		>
			<TreeViewFeatures />
			<TableProps props={baseTreeViewProps} title="TreeView Props" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
