import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { TooltipFeatures } from "./TooltipFeatures";
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
						id: "positions",
						label: "Positions",
						path: "#positions",
						target: "_top",
					},
					{
						id: "colors",
						label: "Colors",
						path: "#colors",
						target: "_top",
					},
					{
						id: "delay",
						label: "With Delay",
						path: "#delay",
						target: "_top",
					},
					{
						id: "disabled",
						label: "Disabled",
						path: "#disabled",
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
				]
			}
		],
	}
]

export const baseTooltipProps: TableProps[] = [
	{
		prop: "content",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "The content to display inside the tooltip. Required.",
	},
	{
		prop: "children",
		type: "ReactElement",
		default: "undefined",
		typePrimitive: "ReactElement",
		tooltip: "The element that triggers the tooltip. Must be a single React element. Required.",
	},
	{
		prop: "position",
		type: `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" | "left-center" | "right-center"`,
		default: `"top-center"`,
		typePrimitive: "string",
		tooltip: "Position of the tooltip relative to the target element.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"secondary"`,
		typePrimitive: "string",
		tooltip: "Color scheme of the tooltip.",
	},
	{
		prop: "delayShow",
		type: "number",
		default: "100",
		typePrimitive: "number",
		tooltip: "Delay in milliseconds before showing the tooltip.",
	},
	{
		prop: "delayHide",
		type: "number",
		default: "100",
		typePrimitive: "number",
		tooltip: "Delay in milliseconds before hiding the tooltip.",
	},
	{
		prop: "offset",
		type: "number",
		default: "8",
		typePrimitive: "number",
		tooltip: "Distance in pixels between the tooltip and the target element.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, the tooltip will not appear.",
	},
	{
		prop: "ariaLabel",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Additional ARIA label for the tooltip.",
	},
];

export default async function TooltipPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Tooltip"
			description="Tooltip component displays informative text when users hover over or focus on an element."
			buttonLeft={{ href: "/docs/components/feedback/skeleton", text: "Skeleton" }}
			buttonRight={{ href: "/docs/components/data-display/accordion", text: "Accordion" }}
			menuData={dataFeatures}
		>
			<TooltipFeatures />
			<TableProps props={baseTooltipProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
