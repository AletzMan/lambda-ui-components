import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { DividerFeatures } from "./DividerFeatures";
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

export const baseDividerProps: TableProps[] = [
	{
		prop: "variant",
		type: `"solid" | "dashed" | "dotted"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Variant of the divider.",
	},
	{
		prop: "orientation",
		type: `"horizontal" | "vertical"`,
		default: `"horizontal"`,
		typePrimitive: "string",
		tooltip: "Orientation of the divider.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "white" | "black"`,
		default: `"neutral"`,
		typePrimitive: "string",
		tooltip: "Color of the divider.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"tiny"`,
		typePrimitive: "string",
		tooltip: "Size of the divider.",
	},
	{
		prop: "spacing",
		type: "number",
		default: "5",
		typePrimitive: "number",
		tooltip: "Spacing of the divider in pixels.",
	},
	{
		prop: "contentPosition",
		type: `"center" | "start" | "end"`,
		default: `"center"`,
		typePrimitive: "string",
		tooltip: "Content position of the divider.",
	},
];


export default async function DividerPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Divider"
			description="Divider component separates content with a line."
			buttonLeft={{ href: "/docs/components/layout/card", text: "Card" }}
			buttonRight={{ href: "/docs/components/layout/flex", text: "Flex" }}
			menuData={dataFeatures}
		>
			<DividerFeatures />
			<TableProps props={baseDividerProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
