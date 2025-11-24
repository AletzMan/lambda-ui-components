import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { FlexFeatures } from "./FlexFeatures";
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

export const baseFlexProps: TableProps[] = [
	{
		prop: "direction",
		type: `"row" | "row-reverse" | "column" | "column-reverse"`,
		default: `"row"`,
		typePrimitive: "string",
		tooltip: "Direction of the flex items.",
	},
	{
		prop: "justify",
		type: `"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"`,
		default: `"flex-start"`,
		typePrimitive: "string",
		tooltip: "Alignment along the main axis.",
	},
	{
		prop: "align",
		type: `"flex-start" | "center" | "flex-end" | "stretch" | "baseline"`,
		default: `"flex-start"`,
		typePrimitive: "string",
		tooltip: "Alignment along the cross axis.",
	},
	{
		prop: "wrap",
		type: `"nowrap" | "wrap" | "wrap-reverse"`,
		default: `"nowrap"`,
		typePrimitive: "string",
		tooltip: "Whether flex items are forced onto one line or can wrap onto multiple lines.",
	},
	{
		prop: "gap",
		type: "string | number",
		default: "0",
		typePrimitive: "string",
		tooltip: "Gap between flex items.",
	},
	{
		prop: "children",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "The content of the flex container.",
	},
];


export default async function FlexPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Flex"
			description="Flex component is a layout container that allows you to arrange items in rows or columns."
			buttonLeft={{ href: "/docs/components/layout/divider", text: "Divider" }}
			buttonRight={{ href: "/docs/components/layout/splitter", text: "Splitter" }}
			menuData={dataFeatures}
		>
			<FlexFeatures />
			<TableProps props={baseFlexProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
