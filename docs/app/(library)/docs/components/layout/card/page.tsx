import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { CardFeatures } from "./CardFeatures";
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

export const baseCardProps: TableProps[] = [
	{
		prop: "image",
		type: "ICardImage",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Configuración para la sección de imagen de la tarjeta.",
	},
	{
		prop: "header",
		type: "ICardHeader",
		default: "undefined",
		typePrimitive: "object",
		tooltip: "Configuración para la sección de encabezado de la tarjeta.",
	},
	{
		prop: "actions",
		type: "ICardActions[]",
		default: "undefined",
		typePrimitive: "array",
		tooltip: "Array de objetos que definen las acciones en el pie de la tarjeta.",
	},
	{
		prop: "variant",
		type: `"solid" | "outline" | "soft"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Define la variante visual principal de la tarjeta.",
	},
	{
		prop: "size",
		type: `"small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Define el tamaño de la tarjeta.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Define el radio de los bordes de la tarjeta.",
	},
	{
		prop: "children",
		type: "ReactNode",
		default: "undefined",
		typePrimitive: "node",
		tooltip: "El contenido principal de la tarjeta.",
	},
];


export default async function CardPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	
	return (
		<ComponentsLayout
			title="Card"
			description="Card component is a container for text, photos, and actions in the context of a single subject."
			buttonLeft={{ href: "/docs/components/forms/text-area", text: "TextArea" }}
			buttonRight={{ href: "/docs/components/layout/divider", text: "Divider" }}
			menuData={dataFeatures}
		>
			<CardFeatures />
			<TableProps props={baseCardProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
