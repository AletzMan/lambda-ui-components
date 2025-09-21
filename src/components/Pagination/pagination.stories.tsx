import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { useState } from "react";
import { PaginationProps } from "./pagination.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Pagination> = {
	title: "Components/Pagination",
	component: Pagination,
	argTypes: {
		totalPages: {
			control: "number",
			description: "Total number of pages",
			type: "number",
		},
		currentPage: {
			control: "number",
			description: "Current active page",
			type: "number",
		},
		maxVisiblePages: {
			control: "number",
			description: "Maximum number of visible pages",
			type: "number",
		},
		variant: {
			control: "select",
			options: ["solid", "outline", "soft"],
			description: "Pagination variant",
			table: {
				disable: true,
			},
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Input radius",
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		showFirstLastButtons: {
			control: "boolean",
			description: "Show first and last buttons",
		},
		showPrevNextButtons: {
			control: "boolean",
			description: "Show previous and next buttons",
		},
		"aria-label": {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const Template = (args: PaginationProps) => {
	const [activePage, setActivePage] = useState(1);
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="Pagination"
			subtitle={args.variant?.toString() || ""}
			color={args.color?.toString() || ""}
			onChangeStyleSource={(style) => setCurrentStyle(style)}
		>
			<Pagination
				{...args}
				onPageChange={(page) => setActivePage(page)}
				currentPage={activePage}
				radius={currentStyle === "local" ? args.radius : undefined}
			/>
		</ContainerComponent>
	);
};

export const Solid: Story = {
	render: Template,
	args: {
		variant: "solid",
		size: "small",
		radius: "small",
		disabled: false,
		totalPages: 10,
		currentPage: 1,
		maxVisiblePages: 3,
		onPageChange: () => {},
		showFirstLastButtons: true,
		showPrevNextButtons: true,
	},
};

export const Ouline: Story = {
	render: Template,
	args: {
		variant: "outline",
		size: "small",
		radius: "small",
		disabled: false,
		totalPages: 10,
		currentPage: 1,
		maxVisiblePages: 3,
		onPageChange: () => {},
		showFirstLastButtons: true,
		showPrevNextButtons: true,
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		size: "small",
		radius: "small",
		disabled: false,
		totalPages: 10,
		currentPage: 1,
		maxVisiblePages: 3,
		onPageChange: () => {},
		showFirstLastButtons: true,
		showPrevNextButtons: true,
	},
};

export const Bordered: Story = {
	render: Template,
	args: {
		variant: "bordered",
		size: "small",
		radius: "small",
		disabled: false,
		totalPages: 10,
		currentPage: 1,
		maxVisiblePages: 3,
		onPageChange: () => {},
		showFirstLastButtons: true,
		showPrevNextButtons: true,
	},
};
