import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";
import { BookIcon, DatabaseIcon, HomeIcon } from "lucide-react";

const meta: Meta<typeof Breadcrumb> = {
	title: "Components/Breadcrumb",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
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
			options: ["outline", "flat", "none"],
			description: "Variant of the breadcrumb",
			type: "string",
		},
		separator: {
			control: "select",
			options: ["chevron", "slash", "dot", "arrow"],
			description: "Separator of the breadcrumb",
			type: "string",
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
	},
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
	args: {
		items: [
			{
				label: "Home",
				href: "/",
			},
			{
				label: "Library",
				href: "/library",
			},
			{
				label: "Data",
				href: "/data",
			},
		],
		size: "medium",
		variant: "none",
		separator: "chevron",
		color: "primary",
		maxItems: 0,
	},
};

export const Icon: Story = {
	args: {
		items: [
			{
				label: "Home",
				href: "/",
				icon: <HomeIcon />,
			},
			{
				label: "Library",
				href: "/library",
				icon: <BookIcon />,
			},
			{
				label: "Data",
				href: "/data",
				icon: <DatabaseIcon />,
			},
		],
		size: "medium",
		variant: "none",
		separator: "chevron",
		color: "primary",
		maxItems: 0,
	},
};
