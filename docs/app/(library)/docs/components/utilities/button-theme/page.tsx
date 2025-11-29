import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { ButtonThemeFeatures } from "./ButtonThemeFeatures";
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
						id: "animations",
						label: "Animations",
						path: "#animations",
						target: "_top",
					},
					{
						id: "sizes",
						label: "Sizes",
						path: "#sizes",
						target: "_top",
					},
					{
						id: "colors",
						label: "Colors",
						path: "#colors",
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

export const baseButtonThemeProps: TableProps[] = [
	{
		prop: "animation",
		type: `"fade" | "rotate" | "scale" | "flip" | "slide" | "none"`,
		default: `"scale"`,
		typePrimitive: "string",
		tooltip: "Animation type when toggling between light and dark theme icons.",
	},
	{
		prop: "color",
		type: `ButtonProps["color"]`,
		default: `"neutral"`,
		typePrimitive: "string",
		tooltip: "Color scheme of the button (inherits from Button component).",
	},
	{
		prop: "size",
		type: `ButtonProps["size"]`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the button (inherits from Button component).",
	},
	{
		prop: "...rest",
		type: "ButtonProps",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "All other props from the Button component are supported.",
	},
];

export default async function ButtonThemePage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="ButtonTheme"
			description="A theme toggle button component with animated icon transitions between light and dark modes."
			buttonLeft={{ href: "/docs/components/data-display/tree-view", text: "Tree View" }}
			buttonRight={{ href: "/docs/components/utilities/switch-theme", text: "Switch Theme" }}
			menuData={dataFeatures}
		>
			<ButtonThemeFeatures />
			<TableProps props={baseButtonThemeProps} title="ButtonTheme Props" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
