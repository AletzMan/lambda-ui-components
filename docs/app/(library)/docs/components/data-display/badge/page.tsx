import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { BadgeFeatures } from "./BadgeFeatures";
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
						id: "count",
						label: "With Count",
						path: "#count",
						target: "_top",
					},
					{
						id: "max-count",
						label: "With Max Count",
						path: "#max-count",
						target: "_top",
					},
					{
						id: "colors",
						label: "Colors",
						path: "#colors",
						target: "_top",
					},
					{
						id: "sizes",
						label: "Sizes",
						path: "#sizes",
						target: "_top",
					},
					{
						id: "with-icons",
						label: "With Icons",
						path: "#with-icons",
						target: "_top",
					},
					{
						id: "radius",
						label: "Radius Variants",
						path: "#radius",
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

export const baseBadgeProps: TableProps[] = [
	{
		prop: "text",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Text to display in the badge.",
	},
	{
		prop: "count",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "Numeric count to display. If provided, takes precedence over text.",
	},
	{
		prop: "maxCount",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "Maximum count to display. Values exceeding this will show as 'max+'.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"danger"`,
		typePrimitive: "string",
		tooltip: "Color scheme of the badge.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the badge.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"full"`,
		typePrimitive: "string",
		tooltip: "Border radius of the badge.",
	},
];

export default async function BadgePage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Badge"
			description="Badge component displays small count or status indicators."
			buttonLeft={{ href: "/docs/components/data-display/avatar", text: "Avatar" }}
			buttonRight={{ href: "/docs/components/data-display/calendar", text: "Calendar" }}
			menuData={dataFeatures}
		>
			<BadgeFeatures />
			<TableProps props={baseBadgeProps} title="Badge Props" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
