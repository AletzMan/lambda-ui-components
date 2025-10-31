import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./Drawer";
import { DrawerProps } from "./drawer.types";
import { Button } from "../Button/Button";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { NavigationMenuNode } from "../NavigationMenu/navigationMenu.types";
import {
	BarChart3,
	Clock,
	Database,
	DollarSign,
	FileText,
	GitBranch,
	LayoutDashboard,
	Library,
	MessageSquare,
	PackageCheck,
	Settings,
	Shield,
	Terminal,
	TrendingUp,
	Upload,
	Users,
	Workflow,
	Zap,
} from "lucide-react";
import { NavigationMenu } from "../NavigationMenu/NavigationMenu";

const meta: Meta<typeof Drawer> = {
	title: "Components/Drawer",
	component: Drawer,
	argTypes: {
		width: {
			control: "inline-radio",
			options: ["xsmall", "small", "medium", "half", "full"],
		},
		showCloseButton: {
			control: "boolean",
		},
		backdropType: {
			control: "inline-radio",
			options: ["dark", "blur", "transparent"],
		},
		isOpen: {
			if: {
				arg: "isOpen",
			},
		},
		title: {
			if: {
				arg: "title",
			},
		},
		footer: {
			if: {
				arg: "footer",
			},
		},
		children: {
			if: {
				arg: "children",
			},
		},
		placement: {
			if: {
				arg: "placement",
			},
		},
		onClose: {
			if: {
				arg: "onClose",
			},
		},
		size: {
			if: {
				arg: "size",
			},
		},
	},
};

export default meta;

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
				icon: <Upload size={16} />,
				path: "/app/data/import",
				disabled: true,
				target: "_self",
			},
		],
	},
	// --- NUEVA SECCIÓN: PROCESOS Y TAREAS (Automation/CI/CD) ---
	{
		id: "processes",
		label: "Procesos y Tareas",
		icon: <Workflow size={16} />,
		children: [
			{
				id: "processes-workflows",
				label: "Flujos de Trabajo",
				icon: <PackageCheck size={16} />,
				path: "/app/processes/workflows",
				target: "_self",
			},
			{
				id: "processes-schedules",
				label: "Programación",
				icon: <Clock size={16} />,
				path: "/app/processes/schedules",
				target: "_self",
			},
			{
				id: "processes-logs",
				label: "Registro de Logs",
				icon: <Terminal size={16} />,
				path: "/app/processes/logs",
				target: "_self",
			},
		],
	},
	// --- FIN NUEVA SECCIÓN ---
	{
		id: "reports",
		label: "Reportes",
		icon: <BarChart3 size={16} />,
		children: [
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
		children: [
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
	// --- NUEVA SECCIÓN: SOPORTE Y DOCUMENTACIÓN ---
	{
		id: "help",
		label: "Ayuda y Soporte",
		icon: <Library size={16} />,
		children: [
			{
				id: "help-docs",
				label: "Documentación",
				icon: <Library size={16} />,
				path: "/app/help/docs",
				target: "_blank", // Abrir documentación externa en nueva pestaña
			},
			{
				id: "help-tickets",
				label: "Tickets de Soporte",
				icon: <MessageSquare size={16} />,
				path: "/app/help/tickets",
				target: "_self",
			},
		],
	},
	// --- FIN NUEVA SECCIÓN ---
];

const DrawerTemplate = (args: DrawerProps & React.RefAttributes<HTMLDivElement>) => {
	const [openDrawer, setOpenDrawer] = useState(false);
	return (
		<ContainerComponent title="Drawer" subtitle={args.placement?.toString() || ""}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: "2em",
					padding: "1em",
				}}
			>
				<Drawer
					{...args}
					isOpen={openDrawer}
					onClose={() => setOpenDrawer(false)}
					footer={
						<>
							<Button
								color="neutral"
								size="small"
								onClick={() => {
									setOpenDrawer(false);
								}}
							>
								Accept
							</Button>
							<Button
								color="neutral"
								variant="outline"
								size="small"
								onClick={() => {
									setOpenDrawer(false);
								}}
								style={{ marginLeft: "8px" }}
							>
								Cancel
							</Button>
						</>
					}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<NavigationMenu data={treeDataAppNav} alwaysOpen />
					</div>
				</Drawer>
				<Button
					label="Open Drawer"
					onClick={() => {
						setOpenDrawer(true);
					}}
				/>
			</div>
		</ContainerComponent>
	);
};

export const Left: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} placement="left" />,
	args: {
		width: "small",
		showCloseButton: true,
		backdropType: "dark",
	},
};

export const Right: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} placement="right" />,
	args: {
		width: "small",
		showCloseButton: true,
		backdropType: "dark",
	},
};

export const Top: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} placement="top" />,
	args: {
		width: "small",
		showCloseButton: true,
		backdropType: "dark",
	},
};

export const Bottom: StoryObj<typeof Drawer> = {
	render: (args) => <DrawerTemplate {...args} placement="bottom" />,
	args: {
		width: "small",
		showCloseButton: true,
		backdropType: "dark",
	},
};
