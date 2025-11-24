import { ComponentsLayout } from "../../components/ComponentsLayout";
import { NavigationMenuData } from "lambda-ui-components";
import { List } from "lucide-react";
import { SwitchFeatures } from "./SwitchFeatures";
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

export const baseSwitchProps: TableProps[] = [
	{
		prop: "checked",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Controla si el interruptor está activado o desactivado.",
	},
	{
		prop: "onCheckedChange",
		type: "(checked: boolean) => void",
		default: "undefined",
		typePrimitive: "function",
		tooltip: "Callback que se ejecuta cuando cambia el estado del interruptor.",
	},
	{
		prop: "label",
		type: "string",
		default: "undefined",
		typePrimitive: "string",
		tooltip: "Texto opcional que se muestra junto al interruptor.",
	},
	{
		prop: "positionLabel",
		type: `"left" | "right" | "top" | "bottom"`,
		default: `"right"`,
		typePrimitive: "string",
		tooltip: "Controla la posición de la etiqueta relativa al interruptor.",
	},
	{
		prop: "size",
		type: `"tiny" | "small" | "medium" | "large"`,
		default: `"medium"`,
		typePrimitive: "string",
		tooltip: "Controla el tamaño visual del interruptor.",
	},
	{
		prop: "color",
		type: `"neutral" | "primary" | "secondary" | "danger" | "success" | "warning" | "info"`,
		default: `"primary"`,
		typePrimitive: "string",
		tooltip: "Establece el esquema de color del interruptor.",
	},
	{
		prop: "variant",
		type: `"solid" | "soft" | "outline"`,
		default: `"solid"`,
		typePrimitive: "string",
		tooltip: "Define el estilo visual del interruptor.",
	},
	{
		prop: "shape",
		type: `"square" | "subtle" | "rounded"`,
		default: `"rounded"`,
		typePrimitive: "string",
		tooltip: "Define la forma del interruptor.",
	},
	{
		prop: "disabled",
		type: "boolean",
		default: "false",
		typePrimitive: "boolean",
		tooltip: "Deshabilita la interacción con el interruptor.",
	},
];


export default async function SliderPage(params: {
	params: { id: string };
	searchParams: { mode: string };
}) {
	const searchParams = await params.searchParams;
	console.log(searchParams.mode);
	return (
		<ComponentsLayout
			title="Switch"
			description="Switch is a form component that lets users select a boolean value."
			buttonLeft={{ href: "/docs/components/forms/slider", text: "Slider" }}
			buttonRight={{ href: "/docs/components/forms/text-area", text: "Text Area" }}
			menuData={dataFeatures}
		>
			<SwitchFeatures />
			<TableProps props={baseSwitchProps} title="API Reference" subtitle="Props" id="props" />
		</ComponentsLayout>
	);
}
