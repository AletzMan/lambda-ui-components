import { ComponentsLayout } from "../../components/ComponentsLayout";
import { List } from "lucide-react";
import { DatePickerFeatures } from "./DatePickerFeatures";
import { TableProps } from "../../components/TableProps";

export const dataFeatures = [
	{
		id: "on-this-page",
		label: "En esta página",
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
						id: "sizes",
						label: "Sizes",
						path: "#sizes",
						target: "_top",
					},
					{
						id: "displayFormat",
						label: "Display Format",
						path: "#displayFormat",
						target: "_top",
					},
					{
						id: "minDate",
						label: "Min Date",
						path: "#minDate",
						target: "_top",
					},
					{
						id: "maxDate",
						label: "Max Date",
						path: "#maxDate",
						target: "_top",
					},
					{
						id: "isDateDisabled",
						label: "Is Date Disabled",
						path: "#isDateDisabled",
						target: "_top",
					},
					{
						id: "helperText",
						label: "Helper Text",
						path: "#helperText",
						target: "_top",
					},
					{
						id: "invalid",
						label: "Invalid State",
						path: "#invalid",
						target: "_top",
					},
					{
						id: "errorMessage",
						label: "Error Message",
						path: "#errorMessage",
						target: "_top",
					},
					{
						id: "disabled",
						label: "Disabled",
						path: "#disabled",
						target: "_top",
					},
					{
						id: "controlled",
						label: "Controlled Component",
						path: "#controlled",
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

export const datePickerProps: TableProps[] = [
	{
		prop: "minDate",
		type: `Date`,
		default: `undefined`,
		typePrimitive: "object",
		tooltip: "The earliest date the user can select. Dates prior to this will be disabled.",
	},
	{
		prop: "maxDate",
		type: `Date`,
		default: `undefined`,
		typePrimitive: "object",
		tooltip: "The furthest (future) date the user can select. Dates after this will be disabled.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Completely disables the input field and the calendar, preventing user interaction.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Defines the visual size of the component (e.g., `sm`, `md`, `lg`).",
	},
	{
		prop: "type",
		type: `"dropdown" | "modal" | "inline"`,
		default: `"dropdown"`,
		typePrimitive: "string",
		tooltip: "Specifies the selection mode for the calendar (day, month, or year).",
	},
	{
		prop: "variant",
		type: `"solid" | "soft"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "The visual style (variant) of the component.",
	},
	{
		prop: "isDateDisabled",
		type: `(date: Date) => boolean`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip:
			"Custom function to disable specific dates in the calendar (e.g., weekends or holidays).",
	},
	{
		prop: "label",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Label text that appears above the input field.",
	},
	{
		prop: "displayFormat",
		type: `"full" | "long" | "medium" | "short"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the format of the date shown in the input field.",
	},
	{
		prop: "helperText",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Helper text displayed below the input field to provide additional information.",
	},
	{
		prop: "errorMessage",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Error message displayed below the input field when a validation issue occurs.",
	},
	{
		prop: "invalid",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip:
			"Forces the component into an error (invalid) state, applying corresponding error styles.",
	},
	{
		prop: "value",
		type: `Date`,
		default: `undefined`,
		typePrimitive: "object",
		tooltip:
			"The currently selected date value in the calendar. If not provided, the field will be empty (uncontrolled component).",
	},
	{
		prop: "onChange",
		type: `(date: Date | undefined) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Callback function that is triggered when the user selects a new date.",
	},
];

export default function ColorPickerPage() {
	return (
		<ComponentsLayout
			title="Color Picker"
			description="Color Picker component is a form element that allows users to select a color"
			buttonLeft={{ href: "/docs/components/forms/color-picker", text: "Color Picker" }}
			buttonRight={{ href: "/docs/components/forms/file-upload", text: "File Upload" }}
			menuData={dataFeatures}
		>
			<DatePickerFeatures />
			<TableProps props={datePickerProps} />
		</ComponentsLayout>
	);
}
