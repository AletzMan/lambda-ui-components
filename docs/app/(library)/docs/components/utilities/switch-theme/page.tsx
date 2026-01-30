import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { SwitchThemeFeatures } from "./SwitchThemeFeatures";
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
						id: "variants",
						label: "Variants",
						path: "#variants",
						target: "_top",
					},
					{
						id: "with-label",
						label: "With Label",
						path: "#with-label",
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

export const baseSwitchThemeProps: TableProps[] = [
	{
		prop: "variant",
		type: `"solid" | "soft" | "subtle" | "text"`,
		default: `"soft"`,
		typePrimitive: "string",
		tooltip: "Visual style of the button.",
	},
	{
		prop: "size",
		type: `"small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Size of the button.",
	},
	{
		prop: "showLabel",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Whether to show the theme name next to the icon.",
	},
];

export default async function SwitchThemePage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	
	return (
		<ComponentsLayout
			title="SwitchTheme"
			description="A dropdown component to switch between all available themes (Light, Dark, Retro, Lavender, Mint, Sunset, Ocean, Midnight, etc.)."
			buttonLeft={{ href: "/docs/components/utilities/button-theme", text: "Button Theme" }}
			buttonRight={{ href: "/docs/components/utilities/client-only", text: "Client Only" }}
			menuData={dataFeatures}
		>
			<SwitchThemeFeatures />
			<TableProps props={baseSwitchThemeProps} title="SwitchTheme Props" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
