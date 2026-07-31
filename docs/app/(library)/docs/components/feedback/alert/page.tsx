
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { AlertFeatures } from "./AlertFeatures";
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
						id: "custom-icon",
						label: "Custom Icon",
						path: "#custom-icon",
						target: "_top",
					},
					{
						id: "with-close",
						label: "With Close Button",
						path: "#with-close",
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

export const baseAlertProps: TableProps[] = [
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"`,
		default: `"neutral"`,
		typePrimitive: "string",
		tooltip: "Controls the color scheme of the alert. Required.",
	},
	{
		prop: "message",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The content of the alert message. Required.",
	},
	{
		prop: "title",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The title of the alert.",
	},
	{
		prop: "variant",
		type: `"outline" | "soft" | "solid"`,
		default: `"soft"`,
		typePrimitive: "string",
		tooltip: "Defines the visual style of the alert.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the size of the alert.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Defines the border radius of the alert.",
	},
	{
		prop: "showIcon",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "If true, displays an icon based on the color.",
	},
	{
		prop: "customIcon",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Custom icon to display instead of the default icon.",
	},
	{
		prop: "onClose",
		type: "() => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when the close button is clicked. If provided, a close button will be shown.",
	},
	{
		prop: "role",
		type: `"alert" | "status"`,
		default: `"status"`,
		typePrimitive: "string",
		tooltip: "ARIA role for the alert. Use 'alert' for critical messages.",
	},
];

export default async function AlertPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {

	return (
		<ComponentsLayout
			title="Alert"
			description="Alert component displays important messages to users in a prominent way."
			buttonLeft={{ href: "/docs/components/navigation/tabs", text: "Tabs" }}
			buttonRight={{ href: "/docs/components/feedback/dialog", text: "Dialog" }}
			menuData={dataFeatures}
		>
			<AlertFeatures />
			<TableProps props={baseAlertProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
