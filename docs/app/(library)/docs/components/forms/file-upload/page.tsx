import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { FileUploadFeatures } from "./FileUploadFeatures";
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

export const fileUploadProps: TableProps[] = [
	{
		prop: "type",
		type: `"dropzone" | "button"`,
		default: `"dropzone"`,
		typePrimitive: "string",
		tooltip:
			"Determines whether the component renders a dropzone area or a button-triggered file selector.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controls the visual size of the upload area or button.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Disables file selection and drag-and-drop interactions.",
	},
	{
		prop: "invalid",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Marks the component as invalid and applies error styles.",
	},
	{
		prop: "multiple",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Allows selecting multiple files at once when enabled.",
	},
	{
		prop: "accept",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Specifies acceptable file types (e.g. 'image/*', '.pdf').",
	},
	{
		prop: "required",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Indicates that file selection is required.",
	},
	{
		prop: "label",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Label text appearing above the uploader.",
	},
	{
		prop: "errorMessage",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Error message displayed below the component when invalid or file rejected.",
	},
	{
		prop: "helperText",
		type: `string`,
		default: `""`,
		typePrimitive: "string",
		tooltip: "Additional text displayed below the component.",
	},
	{
		prop: "maxSize",
		type: `number`,
		default: `undefined`,
		typePrimitive: "number",
		tooltip: "Maximum allowed file size in bytes. Files exceeding this are rejected.",
	},
	{
		prop: "onChange",
		type: `(event: React.ChangeEvent<HTMLInputElement>) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Triggered when files are selected through the dialog.",
	},
	{
		prop: "onDragOver",
		type: `(event: React.DragEvent<HTMLElement>) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Fired when draggable items enter the dropzone.",
	},
	{
		prop: "onDragLeave",
		type: `(event: React.DragEvent<HTMLElement>) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Fired when draggable items leave the dropzone.",
	},
	{
		prop: "onDrop",
		type: `(event: React.DragEvent<HTMLElement>) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Triggered when files are dropped into the dropzone.",
	},
	{
		prop: "name",
		type: `string`,
		default: `undefined`,
		typePrimitive: "string",
		tooltip: "Native input name attribute.",
	},
	{
		prop: "onFilesRejected",
		type: `(files: File[]) => void`,
		default: `undefined`,
		typePrimitive: "callback",
		tooltip: "Triggered when files are rejected due to type or size restrictions.",
	},
	{
		prop: "viewFileSize",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Shows the file size next to each selected file.",
	},
	{
		prop: "displayMode",
		type: `"list" | "thumbnail"`,
		default: `"list"`,
		typePrimitive: "string",
		tooltip: "Controls how selected files are visually displayed.",
	},
];

export default function FileUploadPage() {
	return (
		<ComponentsLayout
			title="File Upload"
			description="File Upload component is a form element that allows users to select a file"
			buttonLeft={{ href: "/docs/components/forms/date-picker", text: "Date Picker" }}
			buttonRight={{ href: "/docs/components/forms/input", text: "Input" }}
			menuData={dataFeatures}
		>
			<FileUploadFeatures />
			<TableProps props={fileUploadProps} />
		</ComponentsLayout>
	);
}
