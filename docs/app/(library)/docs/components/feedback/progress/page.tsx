import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { ProgressFeatures } from "./ProgressFeatures";
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
						id: "circle",
						label: "Circle Variant",
						path: "#circle",
						target: "_top",
					},
					{
						id: "with-label",
						label: "With Label",
						path: "#with-label",
						target: "_top",
					},
					{
						id: "indeterminate",
						label: "Indeterminate",
						path: "#indeterminate",
						target: "_top",
					},
					{
						id: "sizes",
						label: "Different Sizes",
						path: "#sizes",
						target: "_top",
					},
					{
						id: "colors",
						label: "Different Colors",
						path: "#colors",
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

export const baseProgressProps: TableProps[] = [
	{
		prop: "value",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "The progress value (0-100). Required.",
	},
	{
		prop: "variant",
		type: `"bar" | "circle"`,
		default: `"bar"`,
		typePrimitive: "string",
		tooltip: "Visual style of the progress indicator.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"primary"`,
		typePrimitive: "string",
		tooltip: "Color scheme of the progress.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Size of the progress indicator.",
	},
	{
		prop: "showValue",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, displays the percentage value.",
	},
	{
		prop: "indeterminate",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, shows an indeterminate loading animation.",
	},
	{
		prop: "label",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Optional label to display with the progress.",
	},
];

export default async function ProgressPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	return (
		<ComponentsLayout
			title="Progress"
			description="Progress component displays the completion status of a task or process."
			buttonLeft={{ href: "/docs/components/feedback/notification", text: "Notification" }}
			buttonRight={{ href: "/docs/components/feedback/skeleton", text: "Skeleton" }}
			menuData={dataFeatures}
		>
			<ProgressFeatures />
			<TableProps props={baseProgressProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
