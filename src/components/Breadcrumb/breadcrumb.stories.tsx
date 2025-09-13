import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";
import { CheckCircle, ClipboardList, Folder, HomeIcon, LayoutGrid } from "lucide-react";
import { BreadcrumbProps } from "./breadcrumb.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Breadcrumb> = {
	title: "Components/Breadcrumb",
	component: Breadcrumb,
	argTypes: {
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Size of the breadcrumb",
			type: "string",
		},
		variant: {
			control: "select",
			options: ["chevron", "slash", "dot", "arrow", "stepped"],
			description: "Variant of the breadcrumb",
			type: "string",
			table: {
				disable: true,
			},
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "danger", "warning", "info"],
			description: "Color of the breadcrumb",
			type: "string",
		},
		maxItems: {
			control: "number",
			description: "Maximum number of items to show",
			type: "number",
		},
		items: {
			control: "object",
			description: "Items of the breadcrumb",
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;
const colors = ["default", "primary", "secondary", "success", "danger", "warning", "info"];

const Template = (args: BreadcrumbProps) => {
	return (
		<ContainerComponent
			title="Breadcrumb"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
		>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					gap: "2rem",
				}}
			>
				{colors.map((color) => (
					<div key={color}>
						<label
							style={{
								fontSize: "12px",
								fontWeight: "bold",
								marginBottom: "0.5rem",
								textTransform: "capitalize",
								color: `${
									color === "default"
										? "var(--lambda-color-neutral-500)"
										: `var(--lambda-color-${color}-500)`
								}`,
							}}
						>
							{color}
						</label>
						<Breadcrumb key={color} {...args} color={color as BreadcrumbProps["color"]} />
					</div>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Chevron: Story = {
	render: Template,
	args: {
		items: [
			{
				label: "Home",
				href: "#",
				icon: <HomeIcon />,
			},
			{
				label: "Projects",
				href: "#",
				icon: <LayoutGrid />,
			},
			{
				label: "Website",
				href: "#",
				icon: <Folder />,
			},
			{
				label: "Tasks",
				href: "#",
				icon: <ClipboardList />,
			},
			{
				label: "Reviews",
				href: "#",
				icon: <CheckCircle />,
			},
		],
		size: "medium",
		variant: "chevron",
		color: "primary",
		maxItems: 0,
	},
};

export const Slash: Story = {
	render: Template,
	args: {
		items: [
			{
				label: "Home",
				href: "#",
				icon: <HomeIcon />,
			},
			{
				label: "Projects",
				href: "#",
				icon: <LayoutGrid />,
			},
			{
				label: "Website",
				href: "#",
				icon: <Folder />,
			},
			{
				label: "Tasks",
				href: "#",
				icon: <ClipboardList />,
			},
			{
				label: "Reviews",
				href: "#",
				icon: <CheckCircle />,
			},
		],
		size: "medium",
		variant: "slash",
		color: "primary",
		maxItems: 0,
	},
};

export const Dot: Story = {
	render: Template,
	args: {
		items: [
			{
				label: "Home",
				href: "#",
				icon: <HomeIcon />,
			},
			{
				label: "Projects",
				href: "#",
				icon: <LayoutGrid />,
			},
			{
				label: "Website",
				href: "#",
				icon: <Folder />,
			},
			{
				label: "Tasks",
				href: "#",
				icon: <ClipboardList />,
			},
			{
				label: "Reviews",
				href: "#",
				icon: <CheckCircle />,
			},
		],
		size: "medium",
		variant: "dot",
		color: "primary",
		maxItems: 0,
	},
};

export const Arrow: Story = {
	render: Template,
	args: {
		items: [
			{
				label: "Home",
				href: "#",
				icon: <HomeIcon />,
			},
			{
				label: "Projects",
				href: "#",
				icon: <LayoutGrid />,
			},
			{
				label: "Website",
				href: "#",
				icon: <Folder />,
			},
			{
				label: "Tasks",
				href: "#",
				icon: <ClipboardList />,
			},
			{
				label: "Reviews",
				href: "#",
				icon: <CheckCircle />,
			},
		],
		size: "medium",
		variant: "arrow",
		color: "primary",
		maxItems: 0,
	},
};

export const Stepped: Story = {
	render: Template,
	args: {
		items: [
			{
				label: "Home",
				href: "#",
				icon: <HomeIcon />,
			},
			{
				label: "Projects",
				href: "#",
				icon: <LayoutGrid />,
			},
			{
				label: "Website",
				href: "#",
				icon: <Folder />,
			},
			{
				label: "Tasks",
				href: "#",
				icon: <ClipboardList />,
			},
			{
				label: "Reviews",
				href: "#",
				icon: <CheckCircle />,
			},
		],
		size: "medium",
		variant: "stepped",
		color: "primary",
		maxItems: 0,
	},
};
