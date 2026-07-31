import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { TextAreaFeatures } from "./TextAreaFeatures";
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
						id: "controlled",
						label: "Controlled",
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

export const baseTextAreaProps: TableProps[] = [
	{
		prop: "label",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Texto opcional que se muestra sobre el área de texto.",
	},
	{
		prop: "placeholder",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Texto de marcador de posición.",
	},
	{
		prop: "value",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "El valor del área de texto.",
	},
	{
		prop: "onChange",
		type: "(e: React.ChangeEvent<HTMLTextAreaElement>) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback que se ejecuta cuando cambia el valor.",
	},
	{
		prop: "variant",
		type: `"solid" | "soft" | "outline"`,
		default: `"outline"`,
		typePrimitive: "string",
		tooltip: "Define el estilo visual del área de texto.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controla el tamaño visual del área de texto.",
	},
	{
		prop: "radius",
		type: `"none" | "tiny" | "small" | "medium" | "large" | "full"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controla la redondez de las esquinas.",
	},
	{
		prop: "invalid",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Indica si el campo tiene un error.",
	},
	{
		prop: "errorMessage",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Mensaje de error que se muestra cuando invalid es true.",
	},
	{
		prop: "helperText",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Texto de ayuda que se muestra debajo del área de texto.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Deshabilita la interacción con el área de texto.",
	},
	{
		prop: "required",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Indica si el campo es obligatorio.",
	},
];


export default async function TextAreaPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	return (
		<ComponentsLayout
			title="TextArea"
			description="TextArea component allows users to enter multi-line text."
			buttonLeft={{ href: "/docs/components/forms/switch", text: "Switch" }}
			buttonRight={{ href: "/docs/components/layout/card", text: "Card" }}
			menuData={dataFeatures}
		>
			<TextAreaFeatures />
			<TableProps props={baseTextAreaProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
