// Archivo renombrado, el contenido está en menu.stories.tsx (ahora navigationMenu.stories.tsx).
import type { Meta, StoryObj } from "@storybook/react";
import { NavigationMenu } from "./NavigationMenu";
import type { NavigationMenuNode } from "./navigationMenu.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import {
	Users,
	Settings,
	Scale,
	LayoutDashboard,
	Database,
	BarChart3,
	Shield,
	Bell,
	HelpCircle,
	TrendingUp,
	DollarSign,
	FileText,
	GitBranch,
	Zap,
	Upload,
} from "lucide-react";
import { NavigationMenuProps } from "./navigationMenu.types";

const meta: Meta<typeof NavigationMenu> = {
	title: "Components/NavigationMenu",
	component: NavigationMenu,
	argTypes: {
		data: { table: { disable: true } },
		defaultExpanded: { table: { disable: true } },
		onNodeSelect: { table: { disable: true } },
		alwaysOpen: { control: "boolean" },
		renderLabel: { table: { disable: true } },
		size: { control: "inline-radio", options: ["small", "medium", "large"] },
		showLines: { control: "boolean" },
		styleLines: { control: "inline-radio", options: ["solid", "dashed", "dotted"] },
		selectedStyle: { control: "inline-radio", options: ["highlight", "border"] },
	},
};

export default meta;

type Story = StoryObj<typeof NavigationMenu>;

const treeDataAppNav: NavigationMenuNode[] = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: <LayoutDashboard size={16} />,
		path: "/app/dashboard",
		target: "_self",
	},
	{
		id: "data",
		label: "Datos y Modelos",
		icon: <Database size={16} />,
		children: [
			// Iconos para "Datos y Modelos"
			{
				id: "data-models",
				label: "Modelos",
				icon: <GitBranch size={16} />,
				path: "/app/data/models",
				target: "_self",
			},
			{
				id: "data-sources",
				label: "Fuentes de Datos",
				icon: <Zap size={16} />,
				path: "/app/data/sources",
				target: "_self",
			},
			{
				id: "data-import",
				label: "Importar",
				icon: <Upload size={16} />, // Icono para la acción de importar
				path: "/app/data/import",
				disabled: true,
				target: "_self",
			},
		],
	},
	{
		id: "reports",
		label: "Reportes",
		icon: <BarChart3 size={16} />,
		path: "/app/reports",
		target: "_self",
		children: [
			// Iconos para "Reportes"
			{
				id: "reports-general",
				label: "Reporte General",
				icon: <FileText size={16} />,
				path: "/app/reports/general",
				target: "_self",
			},
			{
				id: "reports-finance",
				label: "Financieros",
				icon: <DollarSign size={16} />,
				path: "/app/reports/finance",
				target: "_self",
			},
			{
				id: "reports-performance",
				label: "Rendimiento",
				icon: <TrendingUp size={16} />,
				path: "/app/reports/performance",
				target: "_self",
			},
		],
	},
	{
		id: "admin",
		label: "Administración",
		icon: <Shield size={16} />,
		path: "/app/admin",
		target: "_self",
		children: [
			// Iconos para "Administración"
			{
				id: "admin-users",
				label: "Usuarios y Roles",
				icon: <Users size={16} />,
				path: "/app/admin/users",
				target: "_self",
			},
			{
				id: "admin-settings",
				label: "Configuración Global",
				icon: <Settings size={16} />,
				path: "/app/admin/settings",
				target: "_blank",
			},
		],
	},
];

const treeDataUserSettings: NavigationMenuNode[] = [
	{
		id: "profile",
		label: "Mi Perfil",
		icon: <Users size={16} />,
		path: "/profile",
	},
	{
		id: "settings",
		label: "Ajustes",
		icon: <Settings size={16} />,
		path: "/settings",
		children: [
			{ id: "settings-general", label: "General", path: "/settings/general" },
			{ id: "settings-billing", label: "Facturación", path: "/settings/billing" },
			{ id: "settings-security", label: "Seguridad y API", path: "/settings/security" },
		],
	},
	{
		id: "notifications",
		label: "Notificaciones",
		icon: <Bell size={16} />,
		path: "/notifications",
	},
	{
		id: "help-center",
		label: "Centro de Ayuda",
		icon: <HelpCircle size={16} />,
		path: "/help-center",
		children: [
			{ id: "help-docs", label: "Documentación", path: "/help/docs" },
			{ id: "help-contact", label: "Contactar Soporte", path: "/help/contact" },
		],
	},
	// Elemento que podría ser un separador o una acción directa sin hijos
	{
		id: "logout",
		label: "Cerrar Sesión",
		icon: <Scale size={16} />,
		path: "/auth/logout", // Un path que dispara una acción
	},
];

const Template = (args: NavigationMenuProps) => {
	return (
		<ContainerComponent title="NavigationMenu">
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
				<NavigationMenu {...args} />
			</div>
		</ContainerComponent>
	);
};

export const Default: Story = {
	render: (args) => <Template {...args} data={treeDataAppNav} />,
	args: {
		size: "medium",
		showLines: false,
		styleLines: "solid",
		alwaysOpen: false,
		selectedStyle: "highlight",
	},
};

export const CustomIcon: Story = {
	render: (args) => <Template {...args} data={treeDataUserSettings} />,
	args: {
		size: "medium",
		showLines: false,
		styleLines: "solid",
		alwaysOpen: false,
		selectedStyle: "highlight",
	},
};
