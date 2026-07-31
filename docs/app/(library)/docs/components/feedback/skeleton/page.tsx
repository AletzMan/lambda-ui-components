import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { SkeletonFeatures } from "./SkeletonFeatures";
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
						label: "Circle Shape",
						path: "#circle",
						target: "_top",
					},
					{
						id: "rounded",
						label: "Rounded Corners",
						path: "#rounded",
						target: "_top",
					},
					{
						id: "wave",
						label: "Wave Animation",
						path: "#wave",
						target: "_top",
					},
					{
						id: "card",
						label: "Card Skeleton",
						path: "#card",
						target: "_top",
					},
					{
						id: "profile",
						label: "User Profile Skeleton",
						path: "#profile",
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

export const baseSkeletonProps: TableProps[] = [
	{
		prop: "shape",
		type: `"rect" | "circle"`,
		default: `"rect"`,
		typePrimitive: "string",
		tooltip: "Shape of the skeleton.",
	},
	{
		prop: "animationType",
		type: `"fade" | "wave"`,
		default: `"fade"`,
		typePrimitive: "string",
		tooltip: "Type of loading animation.",
	},
	{
		prop: "rounded",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true and shape is rect, adds rounded corners.",
	},
	{
		prop: "width",
		type: "string | number",
		default: `"100%"`,
		typePrimitive: "string | number",
		tooltip: "Width of the skeleton.",
	},
	{
		prop: "height",
		type: "string | number",
		default: "16",
		typePrimitive: "string | number",
		tooltip: "Height of the skeleton.",
	},
];

export default async function SkeletonPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	return (
		<ComponentsLayout
			title="Skeleton"
			description="Skeleton component displays placeholder content while data is loading."
			buttonLeft={{ href: "/docs/components/feedback/progress", text: "Progress" }}
			buttonRight={{ href: "/docs/components/feedback/tooltip", text: "Tooltip" }}
			menuData={dataFeatures}
		>
			<SkeletonFeatures />
			<TableProps props={baseSkeletonProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
