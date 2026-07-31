
import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { StepperFeatures } from "./StepperFeatures";
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

export const baseStepperProps: TableProps[] = [
	{
		prop: "steps",
		type: "StepperStep[]",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Array of step objects defining the stepper structure. Required.",
	},
	{
		prop: "defaultActiveStep",
		type: "number",
		default: "0",
		typePrimitive: "number",
		tooltip: "The initial active step index.",
	},
	{
		prop: "orientation",
		type: `"horizontal" | "vertical"`,
		default: `"horizontal"`,
		typePrimitive: "string",
		tooltip: "Defines the orientation of the stepper.",
	},
	{
		prop: "variant",
		type: `"bordered" | "soft"`,
		default: `"bordered"`,
		typePrimitive: "string",
		tooltip: "Defines the visual style of the stepper.",
	},
	{
		prop: "onStepCompleted",
		type: "(stepIndex: number) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback fired when a step is completed.",
	},
	{
		prop: "className",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Additional CSS class for the stepper.",
	},
	{
		prop: "style",
		type: "CSSProperties",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Inline styles for the stepper.",
	},
];

export default async function StepperPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	return (
		<ComponentsLayout
			title="Stepper"
			description="Stepper component displays progress through a sequence of logical and numbered steps."
			buttonLeft={{ href: "/docs/components/navigation/pagination", text: "Pagination" }}
			buttonRight={{ href: "/docs/components/navigation/tabs", text: "Tabs" }}
			menuData={dataFeatures}
		>
			<StepperFeatures />
			<TableProps props={baseStepperProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
