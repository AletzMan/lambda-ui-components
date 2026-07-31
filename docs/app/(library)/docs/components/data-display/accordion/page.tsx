
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { AccordionFeatures } from "./AccordionFeatures";
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
						id: "disabled",
						label: "Disabled Items",
						path: "#disabled",
						target: "_top",
					},
					{
						id: "controlled",
						label: "Controlled Accordion",
						path: "#controlled",
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

export const baseAccordionProps: TableProps[] = [
	{
		prop: "value",
		type: "string | number | null",
		default: "undefined",
		typePrimitive: "string | number | null",
		tooltip: "Controlled value of the currently open item.",
	},
	{
		prop: "defaultValue",
		type: "string | number | null",
		default: "undefined",
		typePrimitive: "string | number | null",
		tooltip: "Default value of the open item (uncontrolled).",
	},
	{
		prop: "onValueChange",
		type: "(value: string | number | null) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback when the open item changes.",
	},
	{
		prop: "variant",
		type: `"default" | "bordered" | "separated"`,
		default: `"default"`,
		typePrimitive: "string",
		tooltip: "Visual style of the accordion.",
	},
	{
		prop: "size",
		type: `"small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the accordion.",
	},
];

export const accordionItemProps: TableProps[] = [
	{
		prop: "value",
		type: "string | number",
		default: "undefined",
		typePrimitive: "string | number",
		tooltip: "Unique identifier for this accordion item. Required.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, the item cannot be expanded or collapsed.",
	},
];

export default async function AccordionPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {

	return (
		<ComponentsLayout
			title="Accordion"
			description="Accordion component displays collapsible content panels for organizing information."
			buttonLeft={{ href: "/docs/components/feedback/tooltip", text: "Tooltip" }}
			buttonRight={{ href: "/docs/components/data-display/avatar", text: "Avatar" }}
			menuData={dataFeatures}
		>
			<AccordionFeatures />
			<TableProps props={baseAccordionProps} title="Accordion Props" subtitle="Props" id="props" />
			<TableProps props={accordionItemProps} title="Accordion.Item Props" subtitle="Props" id="item-props" />
		</ComponentsLayout>
	);
}
