
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { DialogFeatures } from "./DialogFeatures";
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
						id: "draggable",
						label: "Draggable Dialog",
						path: "#draggable",
						target: "_top",
					},
					{
						id: "modal",
						label: "Modal Dialog",
						path: "#modal",
						target: "_top",
					},
					{
						id: "close-escape",
						label: "Close on Escape",
						path: "#close-escape",
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

export const baseDialogProps: TableProps[] = [
	{
		prop: "isOpen",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Controls whether the dialog is visible. Required.",
	},
	{
		prop: "onClose",
		type: "() => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when the dialog should close. Required.",
	},
	{
		prop: "children",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "The main content of the dialog. Required.",
	},
	{
		prop: "title",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Content for the dialog header/title.",
	},
	{
		prop: "footer",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Content for the dialog footer (typically action buttons).",
	},
	{
		prop: "transitionMode",
		type: `"fade" | "scaleUp" | "unfold" | "fadeFromTop" | "fadeFromBottom" | "fadeFromLeft" | "fadeFromRight"`,
		default: `"scaleUp"`,
		typePrimitive: "string",
		tooltip: "Animation type when opening/closing the dialog.",
	},
	{
		prop: "backdropType",
		type: `"dark" | "blur" | "transparent"`,
		default: `"dark"`,
		typePrimitive: "string",
		tooltip: "Style of the backdrop overlay.",
	},
	{
		prop: "isModal",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, clicking outside won't close the dialog.",
	},
	{
		prop: "isDraggable",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "If true, the dialog can be dragged by its header.",
	},
	{
		prop: "showCloseButton",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "If true, displays a close button in the header.",
	},
	{
		prop: "closeOnEscape",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "If true, pressing Escape will close the dialog.",
	},
];

export default async function DialogPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	
	return (
		<ComponentsLayout
			title="Dialog"
			description="Dialog component displays content in a modal overlay, requiring user interaction before returning to the main content."
			buttonLeft={{ href: "/docs/components/feedback/alert", text: "Alert" }}
			buttonRight={{ href: "/docs/components/feedback/drawer", text: "Drawer" }}
			menuData={dataFeatures}
		>
			<DialogFeatures />
			<TableProps props={baseDialogProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
