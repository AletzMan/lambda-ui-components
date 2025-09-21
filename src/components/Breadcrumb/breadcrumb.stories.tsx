import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";
import { CheckCircle, ClipboardList, Folder, HomeIcon, LayoutGrid } from "lucide-react";
import { BreadcrumbProps } from "./breadcrumb.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { useState } from "react";

const meta: Meta<typeof Breadcrumb> = {
	title: "Components/Breadcrumb",
	component: Breadcrumb,
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Size of the breadcrumb",
			type: "string",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Radius of the breadcrumb",
			type: "string",
		},
		variant: {
			table: {
				disable: true,
			},
		},
		color: {
			table: {
				disable: true,
			},
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
const colors = ["neutral", "primary", "secondary", "success", "danger", "warning", "info"];

const Template = (args: BreadcrumbProps) => {
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="Breadcrumb"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
			onChangeStyleSource={(style) => setCurrentStyle(style)}
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
									color === "neutral"
										? "var(--lambda-color-neutral-500)"
										: `var(--lambda-color-${color}-500)`
								}`,
							}}
						>
							{color}
						</label>
						<Breadcrumb
							key={color}
							{...args}
							color={color as BreadcrumbProps["color"]}
							radius={currentStyle === "local" ? args.radius : undefined}
						/>
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
		radius: "small",
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
		radius: "small",
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
		radius: "small",
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
		radius: "small",
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
		radius: "small",
		variant: "stepped",
		color: "primary",
		maxItems: 0,
	},
};
