
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { PaginationFeatures } from "./PaginationFeatures";
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

export const basePaginationProps: TableProps[] = [
	{
		prop: "currentPage",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "The current active page. Required.",
	},
	{
		prop: "totalPages",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "The total number of pages. Required.",
	},
	{
		prop: "onPageChange",
		type: "(page: number) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when the page changes. Required.",
	},
	{
		prop: "maxVisiblePages",
		type: "number",
		default: "5",
		typePrimitive: "number",
		tooltip: "Number of visible page buttons.",
	},
	{
		prop: "showFirstLastButtons",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "Show buttons to go to the first and last page.",
	},
	{
		prop: "showPrevNextButtons",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "Show buttons to go to the previous and next page.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Disables all pagination buttons.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the size of the buttons.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Defines the border radius of the buttons.",
	},
	{
		prop: "variant",
		type: `"outline" | "soft" | "solid" | "bordered"`,
		default: `"outline"`,
		typePrimitive: "string",
		tooltip: "Defines the visual style of the pagination buttons.",
	},
	{
		prop: "ariaLabel",
		type: "string",
		default: `"Page navigation"`,
		typePrimitive: "string",
		tooltip: "ARIA label for the navigation element.",
	},
];

export default async function PaginationPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	return (
		<ComponentsLayout
			title="Pagination"
			description="Pagination component allows users to navigate through a set of pages."
			buttonLeft={{ href: "/docs/components/navigation/navigation-menu", text: "Navigation Menu" }}
			buttonRight={{ href: "/docs/components/navigation/stepper", text: "Stepper" }}
			menuData={dataFeatures}
		>
			<PaginationFeatures />
			<TableProps props={basePaginationProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
