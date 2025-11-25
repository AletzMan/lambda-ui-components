
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { DropdownFeatures } from "./DropdownFeatures";
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
						id: "icon-only",
						label: "With Icons Only",
						path: "#icon-only",
						target: "_top",
					},
					{
						id: "shortcuts",
						label: "With Keyboard Shortcuts",
						path: "#shortcuts",
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
						id: "item-props",
						label: "Dropdown.Item Props",
						path: "#item-props",
						target: "_top",
					},
				],
			},
		],
	},
];

export const baseDropdownProps: TableProps[] = [
	{
		prop: "text",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The text displayed on the dropdown button.",
	},
	{
		prop: "icon",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "An icon to display on the dropdown button.",
	},
	{
		prop: "variant",
		type: `"solid" | "outline" | "text" | "soft"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Visual style of the dropdown button.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the dropdown button.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Border radius of the dropdown button.",
	},
];

export const dropdownItemProps: TableProps[] = [
	{
		prop: "text",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The text displayed in the dropdown item.",
	},
	{
		prop: "icon",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "An icon to display in the dropdown item.",
	},
	{
		prop: "shortcutKeys",
		type: "string[]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Keyboard shortcut keys to display.",
	},
	{
		prop: "url",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "If provided, renders the item as a link.",
	},
	{
		prop: "onSelectOption",
		type: "() => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when the item is selected.",
	},
];

export default async function DropdownPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Dropdown"
			description="Dropdown component displays a menu of options when triggered, commonly used for actions and navigation."
			buttonLeft={{ href: "/docs/components/feedback/drawer", text: "Drawer" }}
			buttonRight={{ href: "/docs/components/feedback/notification", text: "Notification" }}
			menuData={dataFeatures}
		>
			<DropdownFeatures />
			<TableProps props={baseDropdownProps} title="API Reference" subtitle="Dropdown Props" id="props" />
			<TableProps props={dropdownItemProps} title="" subtitle="Dropdown.Item Props" id="item-props" />
		</ComponentsLayout>
	);
}
