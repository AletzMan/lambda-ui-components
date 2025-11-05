import { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";
import { TabProps } from "./tabs.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { useState } from "react";

const meta: Meta<typeof Tabs> = {
	title: "Components/Tabs",
	component: Tabs,
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

type Story = StoryObj<typeof Tabs>;

const colors: TabProps["color"][] = [
	"neutral",
	"primary",
	"secondary",
	"success",
	"danger",
	"warning",
	"info",
];

const tabs = [
	{ title: "Products", disabled: false, icon: null, content: "Products content" },
	{ title: "Orders", disabled: false, icon: null, content: "Orders content" },
	{ title: "Customers", disabled: false, icon: null, content: "Customers content" },
];

const Template = (args: TabProps) => {
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="Tab"
			subtitle={args.variant || ""}
			onChangeStyleSource={(e: "global" | "local") => setCurrentStyle(e)}
			styleSource={currentStyle}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					flexWrap: "wrap",
					padding: "1rem",
					width: "100%",
				}}
			>
				{colors.map((color) => (
					<Tabs
						key={color}
						size={args.size}
						variant={args.variant}
						color={color}
						radius={currentStyle === "local" ? args.radius : undefined}
					>
						<Tabs.List>
							{tabs.map((tab, i) => (
								<Tabs.Tab key={i} title={tab.title} disabled={tab.disabled} icon={tab.icon} />
							))}
						</Tabs.List>
						<Tabs.Panels>
							{tabs.map((tab, i) => (
								<Tabs.Panel key={i}>{tab.content}</Tabs.Panel>
							))}
						</Tabs.Panels>
					</Tabs>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Underline: Story = {
	render: Template,
	args: {
		variant: "underline",
		size: "medium",
		color: "secondary",
		radius: "small",
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		size: "medium",
		color: "secondary",
		radius: "small",
	},
};

export const Box: Story = {
	render: Template,
	args: {
		variant: "box",
		size: "medium",
		color: "secondary",
		radius: "small",
	},
};

export const Border: Story = {
	render: Template,
	args: {
		variant: "border",
		size: "medium",
		color: "secondary",
		radius: "small",
		disabled: false,
		onChange: () => {},
	},
};
