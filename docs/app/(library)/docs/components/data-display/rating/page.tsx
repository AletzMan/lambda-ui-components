import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { RatingFeatures } from "./RatingFeatures";
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
						id: "closable",
						label: "Closable Tags",
						path: "#closable",
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

export const baseTagProps: TableProps[] = [
	{
		prop: "text",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Text to display in the tag.",
	},
	{
		prop: "icon",
		type: "React.ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Icon to display in the tag.",
	},
	{
		prop: "onClose",
		type: "() => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback function when the close button is clicked. If not provided, the close button won't be displayed.",
	},
	{
		prop: "variant",
		type: `"solid" | "soft" | "outlined" | "ghost"`,
		default: `"soft"`,
		typePrimitive: "string",
		tooltip: "Visual style variant of the tag.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"neutral"`,
		typePrimitive: "string",
		tooltip: "Color scheme of the tag.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the tag.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Border radius of the tag.",
	},
];

export default async function TagPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {

	return (
		<ComponentsLayout
			title="Tag"
			description="Tag component for categorizing and labeling content with various styles and interactive features."
			buttonLeft={{ href: "/docs/components/data-display/code-block", text: "CodeBlock" }}
			buttonRight={{ href: "/docs/components/data-display/table", text: "Table" }}
			menuData={dataFeatures}
		>
			<RatingFeatures />
			<TableProps props={baseTagProps} title="Tag Props" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
