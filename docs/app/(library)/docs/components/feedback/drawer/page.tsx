
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { DrawerFeatures } from "./DrawerFeatures";
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
						id: "placement",
						label: "Placement Options",
						path: "#placement",
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

export const baseDrawerProps: TableProps[] = [
	{
		prop: "isOpen",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Controls whether the drawer is visible. Required.",
	},
	{
		prop: "onClose",
		type: "() => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when the drawer should close. Required.",
	},
	{
		prop: "children",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "The main content of the drawer. Required.",
	},
	{
		prop: "title",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Content for the drawer header/title.",
	},
	{
		prop: "footer",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Content for the drawer footer (typically action buttons).",
	},
	{
		prop: "placement",
		type: `"left" | "right" | "top" | "bottom"`,
		default: `"left"`,
		typePrimitive: "string",
		tooltip: "Side from which the drawer slides in.",
	},
	{
		prop: "width",
		type: `"xsmall" | "small" | "medium" | "half" | "full"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Width of the drawer (for left/right placement).",
	},
	{
		prop: "backdropType",
		type: `"dark" | "blur" | "transparent"`,
		default: `"dark"`,
		typePrimitive: "string",
		tooltip: "Style of the backdrop overlay.",
	},
	{
		prop: "size",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Custom size (width for left/right, height for top/bottom).",
	},
	{
		prop: "showCloseButton",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "If true, displays a close button in the header.",
	},
	{
		prop: "closeOnOverlayClick",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "If true, clicking the overlay closes the drawer.",
	},
	{
		prop: "closeOnEscape",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "If true, pressing Escape closes the drawer.",
	},
];

export default async function DrawerPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Drawer"
			description="Drawer component is a slide-out panel that overlays content, commonly used for navigation menus or additional content."
			buttonLeft={{ href: "/docs/components/feedback/dialog", text: "Dialog" }}
			buttonRight={{ href: "/docs/components/feedback/modal", text: "Modal" }}
			menuData={dataFeatures}
		>
			<DrawerFeatures />
			<TableProps props={baseDrawerProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
