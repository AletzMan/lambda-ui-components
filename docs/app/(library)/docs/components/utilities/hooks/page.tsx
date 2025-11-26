import { ComponentsLayout } from "../../components/ComponentsLayout";
import { ClientOnly, NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { HooksFeatures } from "./HooksFeatures";
import { TableProps } from "../../components/TableProps";

const dataFeatures: NavigationMenuData[] = [
	{
		id: "on-this-page",
		label: "On this page",
		path: "#on-this-page",
		icon: <List />,
		children: [
			{
				id: "hooks",
				label: "Hooks",
				path: "#hooks",
				target: "_top",
				children: [
					{
						id: "use-notification",
						label: "useNotification",
						path: "#use-notification",
						target: "_top",
					},
					{
						id: "use-path-observer",
						label: "usePathObserver",
						path: "#use-path-observer",
						target: "_top",
					},
					{
						id: "use-popover",
						label: "usePopover",
						path: "#use-popover",
						target: "_top",
					},
					{
						id: "use-active-section-observer",
						label: "useActiveSectionObserver",
						path: "#use-active-section-observer",
						target: "_top",
					},
				],
			},
			{
				id: "api-reference",
				label: "API Reference",
				children: [
					{
						id: "use-notification-api",
						label: "useNotification API",
						path: "#use-notification-api",
						target: "_top",
					},
					{
						id: "use-path-observer-api",
						label: "usePathObserver API",
						path: "#use-path-observer-api",
						target: "_top",
					},
					{
						id: "use-popover-api",
						label: "usePopover API",
						path: "#use-popover-api",
						target: "_top",
					},
					{
						id: "use-active-section-observer-api",
						label: "useActiveSectionObserver API",
						path: "#use-active-section-observer-api",
						target: "_top",
					},
				],
			},
		],
	},
];

export const useNotificationAPI: TableProps[] = [
	{
		prop: "showNotification",
		type: "(props: NotificationProps) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Function to display a notification. Accepts notification configuration object.",
	},
];

export const usePathObserverAPI: TableProps[] = [
	{
		prop: "Returns",
		type: "string",
		default: '""',
		typePrimitive: "string",
		tooltip: "The current URL pathname. Updates automatically on navigation.",
	},
];

export const usePopoverAPI: TableProps[] = [
	{
		prop: "offset",
		type: "{ x?: number; y?: number }",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Optional offset for popover positioning.",
	},
	{
		prop: "itemCallbacks",
		type: "Array<(() => void) | undefined>",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Optional array of callbacks for navigable items.",
	},
];

export const usePopoverReturn: TableProps[] = [
	{
		prop: "isOpen",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Whether the popover is currently open.",
	},
	{
		prop: "setIsOpen",
		type: "(open: boolean) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Function to control popover open state.",
	},
	{
		prop: "menuPosition",
		type: "{ top: number; left: number; position: 'below' | 'above'; width: number }",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Calculated position for the popover element.",
	},
	{
		prop: "triggerRef",
		type: "RefObject<T>",
		default: "null",
		typePrimitive: "ref",
		tooltip: "Ref to attach to the trigger element.",
	},
	{
		prop: "contentRef",
		type: "RefObject<U>",
		default: "null",
		typePrimitive: "ref",
		tooltip: "Ref to attach to the popover content element.",
	},
	{
		prop: "handleKeyDown",
		type: "(e: React.KeyboardEvent) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Keyboard event handler for accessibility.",
	},
	{
		prop: "selectedOptionIndex",
		type: "number | null",
		default: "null",
		typePrimitive: "number",
		tooltip: "Index of the currently selected option.",
	},
	{
		prop: "highlightedIndex",
		type: "number",
		default: "-1",
		typePrimitive: "number",
		tooltip: "Index of the currently highlighted option.",
	},
];

export const useActiveSectionObserverAPI: TableProps[] = [
	{
		prop: "selectors",
		type: "string",
		default: '"h2"',
		typePrimitive: "string",
		tooltip: "CSS selector for sections to observe (e.g., 'h2, h3, h4').",
	},
	{
		prop: "rootMargin",
		type: "string",
		default: '"-20% 0px -70% 0px"',
		typePrimitive: "string",
		tooltip: "Intersection Observer root margin (top, right, bottom, left).",
	},
];

export const useActiveSectionObserverReturn: TableProps[] = [
	{
		prop: "Returns",
		type: "string | null",
		default: "null",
		typePrimitive: "string",
		tooltip: "The ID of the currently active section, or null if none is active.",
	},
];

export default async function UtilityHooksPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Utility Hooks"
			description="A collection of utility hooks for common UI patterns including notifications, path observation, popover management, and section tracking."
			buttonLeft={{ href: "/docs/components/utilities/client-only", text: "Client Only" }}
			buttonRight={{ href: "/docs/components/utilities/motion", text: "Motion & Transitions" }}
			menuData={dataFeatures}
		>
			<ClientOnly>
				<HooksFeatures />
			</ClientOnly>

			<TableProps
				props={useNotificationAPI}
				title="useNotification API"
				subtitle="Returns"
				id="use-notification-api"
			/>

			<TableProps
				props={usePathObserverAPI}
				title="usePathObserver API"
				subtitle="Returns"
				id="use-path-observer-api"
			/>

			<TableProps
				props={usePopoverAPI}
				title="usePopover API"
				subtitle="Parameters"
				id="use-popover-api"
			/>
			<TableProps
				props={usePopoverReturn}
				title="usePopover Return Value"
				subtitle="Returns"
				id="use-popover-return"
			/>

			<TableProps
				props={useActiveSectionObserverAPI}
				title="useActiveSectionObserver API"
				subtitle="Parameters"
				id="use-active-section-observer-api"
			/>
			<TableProps
				props={useActiveSectionObserverReturn}
				title="useActiveSectionObserver Return Value"
				subtitle="Returns"
				id="use-active-section-observer-return"
			/>
		</ComponentsLayout>
	);
}
