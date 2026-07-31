
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData, NotificationProvider } from "lambda-ui-components";
import { List } from "lucide-react";
import { NotificationFeatures } from "./NotificationFeatures";
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
						id: "setup",
						label: "Setup",
						path: "#setup",
						target: "_top",
					},
					{
						id: "usage",
						label: "Usage",
						path: "#usage",
						target: "_top",
					},
					{
						id: "types",
						label: "Different Types",
						path: "#types",
						target: "_top",
					},
					{
						id: "variants",
						label: "Variants",
						path: "#variants",
						target: "_top",
					},
					{
						id: "with-actions",
						label: "With Actions",
						path: "#with-actions",
						target: "_top",
					},
					{
						id: "placement",
						label: "Custom Placement",
						path: "#placement",
						target: "_top",
					},
					{
						id: "duration",
						label: "Custom Duration",
						path: "#duration",
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

export const baseNotificationProps: TableProps[] = [
	{
		prop: "title",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The title of the notification.",
	},
	{
		prop: "message",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "The content of the notification message.",
	},
	{
		prop: "notificationType",
		type: `"neutral" | "info" | "success" | "warning" | "danger"`,
		default: `"neutral"`,
		typePrimitive: "string",
		tooltip: "The type/color scheme of the notification.",
	},
	{
		prop: "variant",
		type: `"themed" | "solid" | "soft" | "darkened" | "lightened"`,
		default: `"themed"`,
		typePrimitive: "string",
		tooltip: "Visual style of the notification.",
	},
	{
		prop: "placement",
		type: `"top-left" | "top-right" | "bottom-left" | "bottom-right"`,
		default: `"top-right"`,
		typePrimitive: "string",
		tooltip: "Position where the notification appears.",
	},
	{
		prop: "closable",
		type: "boolean",
		default: "true",
		typePrimitive: "boolean",
		tooltip: "If true, shows a close button.",
	},
	{
		prop: "duration",
		type: "number",
		default: "5000",
		typePrimitive: "number",
		tooltip: "Duration in milliseconds before auto-closing (0 = no auto-close).",
	},
	{
		prop: "icon",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "ReactNode",
		tooltip: "Custom icon to display instead of the default.",
	},
	{
		prop: "onClose",
		type: "() => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when the notification is closed.",
	},
	{
		prop: "onConfirm",
		type: "() => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback for confirm action button.",
	},
	{
		prop: "onCancel",
		type: "() => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback for cancel action button.",
	},
	{
		prop: "confirmText",
		type: "string",
		default: `"Confirm"`,
		typePrimitive: "string",
		tooltip: "Text for the confirm button.",
	},
	{
		prop: "cancelText",
		type: "string",
		default: `"Cancel"`,
		typePrimitive: "string",
		tooltip: "Text for the cancel button.",
	},
];

export default async function NotificationPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	return (
		<ComponentsLayout
			title="Notification"
			description="Notification component displays temporary messages to users, commonly used for alerts, confirmations, and status updates."
			buttonLeft={{ href: "/docs/components/feedback/dropdown", text: "Dropdown" }}
			buttonRight={{ href: "/docs/components/feedback/progress", text: "Progress" }}
			menuData={dataFeatures}
		>
			<NotificationProvider maxNotifications={5} placement="top-right" duration={5000}>
				<NotificationFeatures />
			</NotificationProvider>
			<TableProps props={baseNotificationProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
