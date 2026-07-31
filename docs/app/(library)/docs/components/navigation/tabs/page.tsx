
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { TabsFeatures } from "./TabsFeatures";
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

export const baseTabsProps: TableProps[] = [
	{
		prop: "variant",
		type: `"underline" | "soft" | "box" | "border"`,
		default: `"underline"`,
		typePrimitive: "string",
		tooltip: "Defines the visual style of the tabs.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the size of the tabs.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"neutral"`,
		typePrimitive: "string",
		tooltip: "Controls the color scheme of the tabs.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"tiny"`,
		typePrimitive: "string",
		tooltip: "Defines the border radius of the tabs.",
	},
	{
		prop: "value",
		type: "number",
		default: "0",
		typePrimitive: "number",
		tooltip: "The index of the active tab.",
	},
	{
		prop: "onChange",
		type: "(value: number) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when the active tab changes.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Disables the tabs.",
	},
];

export default async function TabsPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	return (
		<ComponentsLayout
			title="Tabs"
			description="Tabs component organizes content into separate views where only one view can be visible at a time."
			buttonLeft={{ href: "/docs/components/navigation/stepper", text: "Stepper" }}
			buttonRight={{ href: "/docs/components/feedback/alert", text: "Alert" }}
			menuData={dataFeatures}
		>
			<TabsFeatures />
			<TableProps props={baseTabsProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
