import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { ClientOnlyFeatures } from "./ClientOnlyFeatures";
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
						id: "usage",
						label: "Usage",
						path: "#usage",
						target: "_top",
					},
					{
						id: "with-fallback",
						label: "With Fallback",
						path: "#with-fallback",
						target: "_top",
					},
					{
						id: "use-cases",
						label: "Use Cases",
						path: "#use-cases",
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

export const clientOnlyProps: TableProps[] = [
	{
		prop: "children",
		type: "React.ReactNode",
		default: "undefined",
		typePrimitive: "node",
		tooltip: "Content to render only on the client side.",
	},
	{
		prop: "fallback",
		type: "React.ReactNode",
		default: "null",
		typePrimitive: "node",
		tooltip: "Optional content to display during server-side rendering or before client hydration.",
	},
];

export default async function ClientOnlyPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	
	return (
		<ComponentsLayout
			title="ClientOnly"
			description="A utility component that renders its children only on the client side, preventing SSR hydration mismatches."
			buttonLeft={{ href: "/docs/components/theming/button-theme", text: "Button Theme" }}
			buttonRight={{ href: "/docs/components/utilities/hooks", text: "Utility Hooks" }}
			menuData={dataFeatures}
		>
			<ClientOnlyFeatures />
			<TableProps props={clientOnlyProps} title="ClientOnly Props" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
