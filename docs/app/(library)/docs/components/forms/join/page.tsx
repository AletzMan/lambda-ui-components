import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { JoinFeatures } from "./JoinFeatures";
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
						id: "size",
						label: "Sizes",
						path: "#size",
						target: "_top",
					},
					{
						id: "radius",
						label: "Radius",
						path: "#radius",
						target: "_top",
					},
					{
						id: "disabled",
						label: "Disabled",
						path: "#disabled",
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

export const joinProps: TableProps[] = [
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Sets the visual size of the input, adjusting padding and text size.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"tiny"`,
		typePrimitive: "string",
		tooltip: "Defines the border radius of the input.",
	},
	{
		prop: "disabled",
		type: `boolean`,
		default: `false`,
		typePrimitive: "boolean",
		tooltip: "Disables the input and prevents user interaction.",
	},
];

export default function JoinPage() {
	return (
		<ComponentsLayout
			title="Join"
			description="Join component is a form element that allows users to select a number"
			buttonLeft={{ href: "/docs/components/forms/input-number", text: "InputNumber" }}
			buttonRight={{ href: "/docs/components/forms/radio", text: "Radio" }}
			menuData={dataFeatures}
		>
			<JoinFeatures />
			<TableProps props={joinProps} />
			<div className="mb-20"></div>
		</ComponentsLayout>
	);
}
