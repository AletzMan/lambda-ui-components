import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { TableFeatures } from "./TableFeatures";
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
						id: "sorting",
						label: "With Sorting",
						path: "#sorting",
						target: "_top",
					},
					{
						id: "pagination",
						label: "With Pagination",
						path: "#pagination",
						target: "_top",
					},
					{
						id: "variants",
						label: "Variants",
						path: "#variants",
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
						label: "Table Props",
						path: "#props",
						target: "_top",
					},
					{
						id: "columnheader-props",
						label: "ColumnHeader Props",
						path: "#columnheader-props",
						target: "_top",
					},
					{
						id: "cell-props",
						label: "Cell Props",
						path: "#cell-props",
						target: "_top",
					},
					{
						id: "pagination-config-props",
						label: "PaginationConfig Props",
						path: "#pagination-config-props",
						target: "_top",
					},
				],
			},
		],
	},
];

export const baseTableProps: TableProps[] = [
	{
		prop: "data",
		type: "T[]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Array of data to display in the table.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the table.",
	},
	{
		prop: "variant",
		type: `"soft" | "underlined" | "bordered" | "striped"`,
		default: `"soft"`,
		typePrimitive: "string",
		tooltip: "Visual style of the table.",
	},
	{
		prop: "onSortColumn",
		type: `(column: string, direction: "asc" | "desc", type: "string" | "number" | "date" | "boolean") => void`,
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback when a sortable column is clicked.",
	},
	{
		prop: "pagination",
		type: "PaginationConfig",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Pagination configuration object.",
	},
];

export const columnHeaderProps: TableProps[] = [
	{
		prop: "sortKey",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Unique key for this column used in sorting.",
	},
	{
		prop: "isSortable",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Enable sorting for this column.",
	},
	{
		prop: "type",
		type: `"string" | "number" | "date" | "boolean"`,
		default: `"string"`,
		typePrimitive: "string",
		tooltip: "Data type of the column for proper sorting.",
	},
	{
		prop: "width",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "CSS width value for the column.",
	},
];

export const cellProps: TableProps[] = [
	{
		prop: "align",
		type: `"left" | "center" | "right"`,
		default: `"left"`,
		typePrimitive: "string",
		tooltip: "Text alignment within the cell.",
	},
];

export const paginationConfigProps: TableProps[] = [
	{
		prop: "page",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "Current page number.",
	},
	{
		prop: "totalPages",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "Total number of pages.",
	},
	{
		prop: "rowsPerPage",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "Number of rows per page.",
	},
	{
		prop: "totalRows",
		type: "number",
		default: "undefined",
		typePrimitive: "number",
		tooltip: "Total number of rows in the dataset.",
	},
	{
		prop: "onPageChange",
		type: "(page: number) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback when page changes.",
	},
];

export default async function TablePage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Table"
			description="Table component for displaying tabular data with sorting, pagination, and multiple variants."
			buttonLeft={{ href: "/docs/components/data-display/rating", text: "Rating" }}
			buttonRight={{ href: "/docs/components/data-display/tag", text: "Tag" }}
			menuData={dataFeatures}
		>
			<TableFeatures />
			<TableProps props={baseTableProps} title="Table Props" subtitle="Props" id="props" />
			<TableProps props={columnHeaderProps} title="ColumnHeader Props" subtitle="Props" id="columnheader-props" />
			<TableProps props={cellProps} title="Cell Props" subtitle="Props" id="cell-props" />
			<TableProps props={paginationConfigProps} title="PaginationConfig Type" subtitle="Props" id="pagination-props" />
		</ComponentsLayout>
	);
}
