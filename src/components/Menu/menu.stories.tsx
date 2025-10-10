import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import type { MenuNode } from "./menu.types.";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import {
	Users,
	Settings,
	Briefcase,
	TrendingUp,
	DollarSign,
	BookOpen,
	UserCheck,
	Scale,
} from "lucide-react";
import { MenuProps } from "./menu.types.";

const meta: Meta<typeof Menu> = {
	title: "Components/Menu",
	component: Menu,
	argTypes: {
		data: { table: { disable: true } },
		defaultExpanded: { table: { disable: true } },
		selectedId: { table: { disable: true } },
		onNodeSelect: { table: { disable: true } },
		renderLabel: { table: { disable: true } },
		size: { control: "inline-radio", options: ["small", "medium", "large"] },
		isDirectory: { control: "boolean" },
		showLines: { control: "boolean" },
		styleLines: { control: "inline-radio", options: ["solid", "dashed", "dotted"] },
	},
};

export default meta;

type Story = StoryObj<typeof Menu>;

const treeData: MenuNode[] = [
	{
		id: "corp",
		label: "Corporativo Global (CEO)",
		children: [
			{
				id: "vp-tech",
				label: "VP de Tecnología",
				children: [
					{
						id: "dir-dev",
						label: "Director de Ingeniería",
						children: [
							// Proyectos o Sub-equipos
							{ id: "team-a", label: "Equipo Alpha (Plataforma Core)" },
							{ id: "team-b", label: "Equipo Beta (Aplicaciones Móviles)" },
							{ id: "team-c", label: "Equipo Gamma (Servicios de Pago)" },
						],
					},
					{
						id: "dir-ops",
						label: "Director de Operaciones",
						children: [
							{ id: "ops-1", label: "Soporte Nivel 1" },
							{ id: "ops-2", label: "Mantenimiento Cloud" },
						],
					},
				],
			},
			{
				id: "vp-mkt",
				label: "VP de Marketing",
				children: [
					{
						id: "mkt-digital",
						label: "Marketing Digital",
						children: [
							{ id: "mkt-sem", label: "Campaña SEM 2024" },
							{ id: "mkt-social", label: "Redes Sociales" },
						],
					},
					{ id: "mkt-branding", label: "Branding y Diseño" },
				],
			},
			{
				id: "legal",
				label: "Departamento Legal",
				disabled: true, // Ejemplo de nodo deshabilitado
			},
		],
	},
	{
		id: "rrhh",
		label: "Recursos Humanos",
		children: [
			{
				id: "rrhh-talento",
				label: "Adquisición de Talento",
				children: [{ id: "rrhh-ta-it", label: "Reclutamiento IT" }],
			},
			{ id: "rrhh-payroll", label: "Nóminas y Beneficios" },
		],
	},
];

const treeDataDirectory: MenuNode[] = [
	{
		id: "root",
		label: "Components",
		children: [
			{
				id: "1",
				label: "UI Components",
				children: [
					{ id: "1-1", label: "Button.tsx" },
					{ id: "1-2", label: "Input.tsx" },
					// Componentes adicionales
					{ id: "1-3", label: "Checkbox.tsx" },
					{ id: "1-4", label: "Modal.tsx" },
				],
			},
			{
				id: "2",
				label: "Layout Components",
				children: [
					{ id: "2-1", label: "PageLayout.tsx" },
					{ id: "2-2", label: "Sidebar.tsx" },
					// Componente anidado
					{ id: "2-3", label: "Header", children: [{ id: "2-3-1", label: "Logo.tsx" }] },
				],
			},
			{ id: "3", label: "AppRouter.tsx" },
		],
	},
	{
		id: "hooks",
		label: "Hooks",
		children: [
			{
				id: "hooks-1",
				label: "Data Management", // Renombrado a un tema específico
				children: [
					{ id: "hooks-1-1", label: "useFetch.ts" }, // Hook real
					{
						id: "hooks-1-2",
						label: "State Logic", // Carpeta anidada
						children: [
							{ id: "hooks-1-2-1", label: "useCounter.ts" },
							{
								id: "hooks-1-2-2",
								label: "useTimeout.ts",
							},
						],
					},
				],
			},
			{
				id: "hooks-2", // Cambiado de 'main-2' a 'hooks-2' para consistencia
				label: "Utilities", // Carpeta de utilidades
				children: [
					{ id: "hooks-2-1", label: "useWindowSize.ts" },
					{ id: "hooks-2-2", label: "useDebounce.ts", disabled: true }, // Elemento deshabilitado
				],
			},
		],
	},
	{
		id: "styles",
		label: "Styles",
		children: [
			{ id: "styles-1", label: "variables.css" },
			{ id: "styles-2", label: "theme.scss" },
		],
	},
];

const treeDataOrganization: MenuNode[] = [
	{
		id: "corp",
		label: "Corporativo Global (CEO)",
		icon: <Users size={16} />, // Icono para el nivel más alto
		children: [
			{
				id: "vp-tech",
				label: "VP de Tecnología",
				icon: <Settings size={16} />, // Icono para Tecnología
				children: [
					{
						id: "dir-dev",
						label: "Director de Ingeniería",
						icon: <Briefcase size={16} />,
						children: [
							{
								id: "team-a",
								label: "Equipo Alpha (Plataforma Core)",
								icon: <Briefcase size={16} />,
							},
							{
								id: "team-b",
								label: "Equipo Beta (Aplicaciones Móviles)",
								icon: <Briefcase size={16} />,
							},
							{
								id: "team-c",
								label: "Equipo Gamma (Servicios de Pago)",
								icon: <Briefcase size={16} />,
							},
						],
					},
					{
						id: "dir-ops",
						label: "Director de Operaciones",
						icon: <TrendingUp size={16} />, // Icono para Operaciones
						children: [
							{ id: "ops-1", label: "Soporte Nivel 1", icon: <UserCheck size={16} /> },
							{ id: "ops-2", label: "Mantenimiento Cloud", icon: <Settings size={16} /> },
						],
					},
				],
			},
			{
				id: "vp-mkt",
				label: "VP de Marketing",
				icon: <DollarSign size={16} />, // Icono para Marketing
				children: [
					{
						id: "mkt-digital",
						label: "Marketing Digital",
						icon: <BookOpen size={16} />,
						children: [
							{ id: "mkt-sem", label: "Campaña SEM 2024", icon: <TrendingUp size={16} /> },
							{ id: "mkt-social", label: "Redes Sociales", icon: <BookOpen size={16} /> },
						],
					},
					{ id: "mkt-branding", label: "Branding y Diseño", icon: <Scale size={16} /> },
				],
			},
			{
				id: "legal",
				label: "Departamento Legal",
				icon: <Scale size={16} />, // Icono para Legal
				disabled: true,
			},
		],
	},
	{
		id: "rrhh",
		label: "Recursos Humanos",
		icon: <UserCheck size={16} />, // Icono para RRHH
		children: [
			{
				id: "rrhh-talento",
				label: "Adquisición de Talento",
				icon: <Users size={16} />,
				children: [{ id: "rrhh-ta-it", label: "Reclutamiento IT", icon: <Briefcase size={16} /> }],
			},
			{ id: "rrhh-payroll", label: "Nóminas y Beneficios", icon: <DollarSign size={16} /> },
		],
	},
];

const Template = (args: MenuProps) => {
	const [selectedId, setSelectedId] = useState<string | undefined>();
	return (
		<ContainerComponent title="Menu">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "flex-start",
					width: "100%",
					maxWidth: 400,
				}}
			>
				<Menu {...args} selectedId={selectedId} onNodeSelect={setSelectedId} />
				<div style={{ marginTop: 16 }}>
					<strong>Seleccionado:</strong> {selectedId || "Ninguno"}
				</div>
			</div>
		</ContainerComponent>
	);
};

export const Default: Story = {
	render: (args) => <Template {...args} data={treeData} />,
	args: {
		size: "medium",
		isDirectory: false,
		showLines: false,
		styleLines: "solid",
	},
};

export const CustomIcon: Story = {
	render: (args) => <Template {...args} data={treeDataOrganization} />,
	args: {
		size: "medium",
		isDirectory: false,
		showLines: false,
		styleLines: "solid",
	},
};

export const Directory: Story = {
	render: (args) => <Template {...args} data={treeDataDirectory} />,
	args: {
		size: "medium",
		isDirectory: true,
		showLines: false,
		styleLines: "solid",
	},
};

export const CustomLabel: Story = {
	render: (args) => (
		<Template
			{...args}
			data={treeDataOrganization}
			renderLabel={(node) => (
				<span style={{ color: node.disabled ? "#aaa" : "#0aa" }}>
					{node.label} {node.disabled ? "(Deshabilitado)" : ""}
				</span>
			)}
		/>
	),
	args: {
		size: "medium",
		isDirectory: false,
		showLines: false,
		styleLines: "solid",
	},
};
