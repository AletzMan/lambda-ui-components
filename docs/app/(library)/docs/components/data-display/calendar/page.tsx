import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { CalendarFeatures } from "./CalendarFeatures";
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
						id: "min-max",
						label: "With Min and Max Dates",
						path: "#min-max",
						target: "_top",
					},
					{
						id: "custom-disabled",
						label: "With Custom Disabled Dates",
						path: "#custom-disabled",
						target: "_top",
					},
					{
						id: "events",
						label: "With Events",
						path: "#events",
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

export const baseCalendarProps: TableProps[] = [
	{
		prop: "value",
		type: "Date",
		default: "undefined",
		typePrimitive: "Date",
		tooltip: "Currently selected date.",
	},
	{
		prop: "onChange",
		type: "(date: Date) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback when the selected date changes.",
	},
	{
		prop: "minDate",
		type: "Date",
		default: "undefined",
		typePrimitive: "Date",
		tooltip: "Minimum selectable date.",
	},
	{
		prop: "maxDate",
		type: "Date",
		default: "undefined",
		typePrimitive: "Date",
		tooltip: "Maximum selectable date.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Disables the entire calendar.",
	},
	{
		prop: "variant",
		type: `"solid" | "outline"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Visual style of the calendar.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large"`,
		default: `"small"`,
		typePrimitive: "string",
		tooltip: "Border radius of the calendar.",
	},
	{
		prop: "isDateDisabled",
		type: "(date: Date) => boolean",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Function to determine if a specific date should be disabled.",
	},
	{
		prop: "events",
		type: "CalendarEvents[]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Array of events to display on the calendar.",
	},
];

export const calendarEventsProps: TableProps[] = [
	{
		prop: "date",
		type: "Date",
		default: "undefined",
		typePrimitive: "Date",
		tooltip: "Date of the event.",
	},
	{
		prop: "label",
		type: "string[]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Array of event labels to display.",
	},
	{
		prop: "status",
		type: `("success" | "warning" | "danger")[]`,
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Array of status colors for each label.",
	},
];

export default async function CalendarPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Calendar"
			description="Calendar component for date selection with navigation, events, and date constraints."
			buttonLeft={{ href: "/docs/components/data-display/badge", text: "Badge" }}
			buttonRight={{ href: "/docs/components/data-display/carousel", text: "Carousel" }}
			menuData={dataFeatures}
		>
			<CalendarFeatures />
			<TableProps props={baseCalendarProps} title="Calendar Props" subtitle="Props" id="props" />
			<TableProps props={calendarEventsProps} title="CalendarEvents Type" subtitle="Props" id="events-props" />
		</ComponentsLayout>
	);
}
