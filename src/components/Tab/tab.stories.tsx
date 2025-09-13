import { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";
import { TabProps } from "./tab.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Tab> = {
	title: "Components/Tab",
	component: Tab,
	argTypes: {
		variant: {
			control: "select",
			options: ["underline", "soft", "box", "border"],
			description: "Visual style of the input",
			type: "string",
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "danger", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "select",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Input radius",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tab>;

const colors: TabProps["color"][] = [
	"primary",
	"secondary",
	"success",
	"danger",
	"warning",
	"info",
];

const Template = (args: TabProps) => {
	return (
		<ContainerComponent title="Tab" subtitle={args.variant}>
			<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
				{colors.map((color) => (
					<Tab key={color} {...args} color={color} />
				))}
			</div>
		</ContainerComponent>
	);
};

export const Underline: Story = {
	render: Template,
	args: {
		items: [
			{ id: "1", label: "Products", content: "Products content" },
			{ id: "2", label: "Orders", content: "Orders content" },
			{ id: "3", label: "Customers", content: "Customers content" },
		],
		variant: "underline",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		items: [
			{ id: "1", label: "Products", content: "Products content" },
			{ id: "2", label: "Orders", content: "Orders content" },
			{ id: "3", label: "Customers", content: "Customers content" },
		],
		variant: "soft",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};

export const Box: Story = {
	render: Template,
	args: {
		items: [
			{ id: "1", label: "Products", content: "Products content" },
			{ id: "2", label: "Orders", content: "Orders content" },
			{ id: "3", label: "Customers", content: "Customers content" },
		],
		variant: "box",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};

export const Border: Story = {
	render: Template,
	args: {
		items: [
			{ id: "1", label: "Products", content: "Products content" },
			{ id: "2", label: "Orders", content: "Orders content" },
			{ id: "3", label: "Customers", content: "Customers content" },
		],
		variant: "border",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};
