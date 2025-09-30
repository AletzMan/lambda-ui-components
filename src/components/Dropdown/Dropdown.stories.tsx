import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { DropdownProps } from "./dropdown.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { FilePlus, FileUp, FolderOpen, LogOut, MenuIcon, Printer, Settings, X } from "lucide-react";
import { useState } from "react";
import { Divider } from "../Divider/Divider";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta<typeof Dropdown> = {
	title: "Components/Dropdown",
	component: Dropdown,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "soft", "subtle", "text"],
			description: "Visual style of the button",
			type: "string",
			table: {
				disable: true,
			},
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Button size",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Button radius",
		},
		disabled: {
			control: "boolean",
			description: "Disables the button and makes it inactive.",
		},
		"aria-label": {
			control: "text",
			description: "Aria label for the button",
			table: {
				disable: true,
			},
		},
		icon: {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const Template = (args: DropdownProps) => {
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("local");
	const [hasIcon, setHasIcon] = useState<boolean>(true);
	const [hasText, setHasText] = useState<boolean>(true);
	return (
		<ContainerComponent
			title="Button"
			subtitle={args.variant?.toString() || ""}
			onChangeStyleSource={(style) => setCurrentStyle(style)}
			styleSource={currentStyle}
		>
			<Checkbox label="Has Icon" checked={hasIcon} onChange={() => setHasIcon(!hasIcon)} />
			<Checkbox label="Has Text" checked={hasText} onChange={() => setHasText(!hasText)} />
			<Divider spacing={10} />
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: "1rem",
					width: "100%",
				}}
			>
				<Dropdown
					{...args}
					icon={hasIcon ? args.icon : undefined}
					text={hasText ? args.text : undefined}
					radius={currentStyle === "local" ? args.radius : undefined}
				>
					<Dropdown.Item
						icon={<FolderOpen />}
						text="Open"
						shortcutKeys={["Ctrl", "O"]}
						onClick={() => console.log("Open")}
					/>
					<Dropdown.Item icon={<FilePlus />} text="New" shortcutKeys={["Ctrl", "N"]} />
					<Dropdown.Item icon={<X />} text="Close" shortcutKeys={["Ctrl", "C"]} />
					<Divider contentPosition="start">Document</Divider>
					<Dropdown.Item icon={<Printer />} text="Print" shortcutKeys={["Ctrl", "P"]} />
					<Dropdown.Item icon={<FileUp />} text="Export" shortcutKeys={["Ctrl", "E"]} />
					<Divider contentPosition="start">Settings</Divider>
					<Dropdown.Item
						icon={<Settings />}
						text="Preferences"
						shortcutKeys={["Ctrl", "P"]}
						url="/preferences"
					/>
					<Dropdown.Item
						icon={<LogOut />}
						text="Logout"
						shortcutKeys={["Ctrl", "L"]}
						url="/logout"
					/>
				</Dropdown>
			</div>
		</ContainerComponent>
	);
};

export const Solid: Story = {
	render: Template,
	args: {
		variant: "solid",
		size: "medium",
		radius: "small",
		disabled: false,
		text: "Menu",
		icon: <MenuIcon />,
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		size: "medium",
		radius: "small",
		disabled: false,
		text: "Menu",
		icon: <MenuIcon />,
	},
};

export const Subtle: Story = {
	render: Template,
	args: {
		variant: "subtle",
		size: "medium",
		radius: "small",
		disabled: false,
		text: "Menu",
		icon: <MenuIcon />,
	},
};

export const Text: Story = {
	render: Template,
	args: {
		variant: "text",
		size: "medium",
		radius: "small",
		disabled: false,
		text: "Menu",
		icon: <MenuIcon />,
	},
};
