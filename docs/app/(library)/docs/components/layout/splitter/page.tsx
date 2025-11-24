import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { SplitterFeatures } from "./SplitterFeatures";
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

export const baseSplitterProps: TableProps[] = [
	{
		prop: "direction",
		type: `"horizontal" | "vertical"`,
		default: `"horizontal"`,
		typePrimitive: "string",
		tooltip: "Direction of the splitter.",
	},
	{
		prop: "min",
		type: "number | string",
		default: "100",
		typePrimitive: "number",
		tooltip: "Minimum size of the first panel (px or %).",
	},
	{
		prop: "max",
		type: "number | string",
		default: "600",
		typePrimitive: "number",
		tooltip: "Maximum size of the first panel (px or %).",
	},
	{
		prop: "initial",
		type: "number | string",
		default: "200",
		typePrimitive: "number",
		tooltip: "Initial size of the first panel (px or %).",
	},
	{
		prop: "children",
		type: "ReactNode[] | ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "The panels to split (must be 2 children).",
	},
];


export default async function SplitterPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Splitter"
			description="Splitter component allows you to resize two panels."
			buttonLeft={{ href: "/docs/components/layout/flex", text: "Flex" }}
			buttonRight={{ href: "/docs/components/navigation/button", text: "Button" }}
			menuData={dataFeatures}
		>
			<SplitterFeatures />
			<TableProps props={baseSplitterProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
