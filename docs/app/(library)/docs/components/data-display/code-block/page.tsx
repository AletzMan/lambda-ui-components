import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { CodeBlockFeatures } from "./CodeBlockFeatures";
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
						id: "highlight-lines",
						label: "With Highlighted Lines",
						path: "#highlight-lines",
						target: "_top",
					},
					{
						id: "tabs",
						label: "With Tabs",
						path: "#tabs",
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
					{
						id: "codetab-props",
						label: "CodeTab Type",
						path: "#codetab-props",
						target: "_top",
					},
				],
			},
		],
	},
];

export const baseCodeBlockProps: TableProps[] = [
	{
		prop: "code",
		type: "string",
		default: '""',
		typePrimitive: "string",
		tooltip: "The code to be displayed.",
	},
	{
		prop: "language",
		type: "string",
		default: '"javascript"',
		typePrimitive: "string",
		tooltip: "Programming language for syntax highlighting (e.g., 'javascript', 'python', 'typescript').",
	},
	{
		prop: "theme",
		type: `"light" | "dark"`,
		default: `"dark"`,
		typePrimitive: "string",
		tooltip: "Color theme of the code block.",
	},
	{
		prop: "showLineNumbers",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Display line numbers.",
	},
	{
		prop: "buttonCopy",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Show copy to clipboard button.",
	},
	{
		prop: "highlightLines",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Lines to highlight. Format: '2,4-6' highlights lines 2, 4, 5, and 6.",
	},
	{
		prop: "tabs",
		type: "CodeTab[]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Array of code tabs to display multiple code snippets.",
	},
	{
		prop: "className",
		type: "string",
		default: '""',
		typePrimitive: "string",
		tooltip: "Additional CSS classes.",
	},
];

export const codeTabTypeProps: TableProps[] = [
	{
		prop: "label",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Label for the tab.",
	},
	{
		prop: "language",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Programming language for this tab's code.",
	},
	{
		prop: "code",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Code content for this tab.",
	},
	{
		prop: "icon",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Optional icon to display in the tab.",
	},
];

export default async function CodeBlockPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="CodeBlock"
			description="CodeBlock component for displaying syntax-highlighted code with line numbers, copy functionality, and tabs."
			buttonLeft={{ href: "/docs/components/data-display/carousel", text: "Carousel" }}
			buttonRight={{ href: "/docs/components/data-display/table", text: "Table" }}
			menuData={dataFeatures}
		>
			<CodeBlockFeatures />
			<TableProps props={baseCodeBlockProps} title="CodeBlock Props" subtitle="Props" id="props" />
			<TableProps props={codeTabTypeProps} title="CodeTab Type" subtitle="Props" id="codetab-props" />
		</ComponentsLayout>
	);
}
