import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { LinkProps } from "./link.types";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta<typeof Link> = {
	title: "Components/Link",
	component: Link,
	argTypes: {
		type: {
			control: "select",
			options: ["default", "button"],
			table: {
				disable: true,
			},
		},
		variant: {
			control: "select",
			options: ["classic", "solid", "outline", "dashed", "soft", "text"],
			description: "Visual style of the button",
			table: {
				disable: true,
			},
		},
		justify: {
			control: "select",
			options: ["start", "center", "end"],
			description: "Justify content",
		},
		color: {
			control: "select",
			options: ["neutral", "primary", "secondary", "danger", "success", "warning", "info"],
			description: "Background color",
			table: {
				disable: true,
			},
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Link size",
		},
		iconPosition: {
			control: "inline-radio",
			options: ["left", "right"],
			description: "Icon position",
		},
		loading: {
			control: "boolean",
			description: "Shows a loading spinner",
		},
		disabled: {
			control: "boolean",
			description: "Disables the button and makes it inactive.",
		},
		href: {
			table: {
				disable: true,
			},
		},
		label: {
			table: {
				disable: true,
			},
		},
		icon: {
			table: {
				disable: true,
			},
		},
		onClick: {
			table: {
				disable: true,
			},
		},
		"aria-label": {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Link>;

const colors = ["neutral", "primary", "secondary", "danger", "success", "warning", "info"];

const TemplateDefault = (args: LinkProps) => {
	const [withIcon, setWithIcon] = useState(false);
	return (
		<ContainerComponent title="Link" subtitle={args.type?.toString() || ""}>
			<Checkbox label="With Icon" checked={withIcon} onChange={() => setWithIcon(!withIcon)} />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
					gap: "3rem",
					padding: "0.5rem",
					width: "100%",
				}}
			>
				{colors.map((color) => (
					<Link
						key={color}
						{...args}
						type="default"
						color={color as LinkProps["color"]}
						label={color}
						style={{ textTransform: "capitalize" }}
						icon={withIcon ? <CircleCheck /> : undefined}
					/>
				))}
			</div>
		</ContainerComponent>
	);
};

const TemplateButton = (args: LinkProps) => {
	const [withIcon, setWithIcon] = useState(false);
	return (
		<ContainerComponent
			title="Link"
			subtitle={args.type?.toString() || ""}
			color={args.variant?.toString() || ""}
		>
			<Checkbox label="With Icon" checked={withIcon} onChange={() => setWithIcon(!withIcon)} />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					flexWrap: "wrap",
					gap: "1rem",
					width: "100%",
				}}
			>
				{colors.map((color) => (
					<Link
						key={color}
						{...args}
						type="button"
						color={color as LinkProps["color"]}
						label={color}
						style={{ textTransform: "capitalize" }}
						icon={withIcon ? <CircleCheck /> : undefined}
					/>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Default: Story = {
	render: TemplateDefault,
	args: {
		type: "default",
		color: "secondary",
		variant: "solid",
		size: "medium",
		loading: false,
		disabled: false,
		iconPosition: "left",
		icon: <CircleCheck />,
	},
};

export const ButtonSolid: Story = {
	render: TemplateButton,
	args: {
		type: "button",
		color: "primary",
		variant: "solid",
		size: "medium",
		loading: false,
		disabled: false,
		iconPosition: "left",
	},
};

export const ButtonClassic: Story = {
	render: TemplateButton,
	args: {
		type: "button",
		color: "primary",
		variant: "classic",
		size: "medium",
		loading: false,
		disabled: false,
		iconPosition: "left",
	},
};

export const ButtonOutline: Story = {
	render: TemplateButton,
	args: {
		type: "button",
		color: "primary",
		variant: "outline",
		size: "medium",
		loading: false,
		disabled: false,
		iconPosition: "left",
	},
};

export const ButtonDashed: Story = {
	render: TemplateButton,
	args: {
		type: "button",
		color: "primary",
		variant: "dashed",
		size: "medium",
		loading: false,
		disabled: false,
		iconPosition: "left",
	},
};

export const ButtonSoft: Story = {
	render: TemplateButton,
	args: {
		type: "button",
		color: "primary",
		variant: "soft",
		size: "medium",
		loading: false,
		disabled: false,
		iconPosition: "left",
	},
};

export const ButtonText: Story = {
	render: TemplateButton,
	args: {
		type: "button",
		color: "primary",
		variant: "text",
		size: "medium",
		loading: false,
		disabled: false,
		iconPosition: "left",
	},
};
