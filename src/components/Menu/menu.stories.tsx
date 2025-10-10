import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import type { MenuNode } from "./menu.types.";
import { useState } from "react";
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

const treeDataAppNav: MenuNode[] = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: <LayoutDashboard size={16} />,
		path: "/app/dashboard",
	},
	{
		id: "data",
		label: "Datos y Modelos",
		icon: <Database size={16} />,
		children: [
			{ id: "data-models", label: "Modelos", path: "/app/data/models" },
			{ id: "data-sources", label: "Fuentes de Datos", path: "/app/data/sources" },
			{
				id: "data-import",
				label: "Importar",
				path: "/app/data/import",
				disabled: true, // Deshabilitado hasta que se configure
			},
		],
	},
	{
		id: "reports",
		label: "Reportes",
		icon: <BarChart3 size={16} />,
		children: [
			{ id: "reports-general", label: "Reporte General", path: "/app/reports/general" },
			{ id: "reports-finance", label: "Financieros", path: "/app/reports/finance" },
			{ id: "reports-performance", label: "Rendimiento", path: "/app/reports/performance" },
		],
	},
	{
		id: "admin",
		label: "Administración",
		icon: <Shield size={16} />,
		children: [
			{ id: "admin-users", label: "Usuarios y Roles", path: "/app/admin/users" },
			{ id: "admin-settings", label: "Configuración Global", path: "/app/admin/settings" },
		],
	},
];

const treeDataUserSettings: MenuNode[] = [
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
	render: (args) => <Template {...args} data={treeDataAppNav} />,
	args: {
		size: "medium",
		isDirectory: false,
		showLines: false,
		styleLines: "solid",
	},
};

export const CustomIcon: Story = {
	render: (args) => <Template {...args} data={treeDataUserSettings} />,
	args: {
		size: "medium",
		isDirectory: false,
		showLines: false,
		styleLines: "solid",
	},
};
