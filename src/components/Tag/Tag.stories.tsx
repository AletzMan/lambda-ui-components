import { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";
import { BadgeCheck } from "lucide-react";
import { TagProps } from "./tag.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { useState } from "react";

const meta: Meta<typeof Tag> = {
	title: "Components/Tag",
	component: Tag,
	argTypes: {
		color: {
			if: {
				arg: "color",
			},
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
			description: "Input radius",
		},
		text: {
			control: "text",
			description: "Input text",
		},
		onClose: {
			control: "boolean",
			description: "Input onClose",
		},
		variant: {
			control: "select",
			table: {
				disabled: true,
			},
		},
		icon: {
			control: "select",
			if: {
				arg: "icon",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tag>;

const colors = ["neutral", "primary", "secondary", "success", "danger", "warning", "info"];

const Template = (args: TagProps) => {
	const [currentStyle, setCurrentStyle] = useState<"global" | "local">("global");
	return (
		<ContainerComponent
			title="Tag"
			subtitle={args.variant?.toString() || ""}
			onChangeStyleSource={(value) => setCurrentStyle(value as "global" | "local")}
			styleSource={currentStyle}
		>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					flexDirection: "row",
					gap: "8px",
				}}
			>
				{colors.map((color) => (
					<Tag
						key={color}
						{...args}
						color={color as TagProps["color"]}
						radius={currentStyle === "local" ? args.radius : undefined}
					/>
				))}
			</div>
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: Template,
	args: {
		size: "small",
		radius: "small",
		text: "Tag",
		variant: "outline",
		icon: <BadgeCheck />,
	},
};

export const Solid: Story = {
	render: Template,
	args: {
		size: "small",
		radius: "small",
		text: "Tag",
		variant: "solid",
		icon: <BadgeCheck />,
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		size: "small",
		radius: "small",
		text: "Tag",
		variant: "soft",
		icon: <BadgeCheck />,
	},
};

export const Subtle: Story = {
	render: Template,
	args: {
		size: "small",
		radius: "small",
		text: "Tag",
		variant: "subtle",
		icon: <BadgeCheck />,
	},
};

export const Dashed: Story = {
	render: Template,
	args: {
		size: "small",
		radius: "small",
		text: "Tag",
		variant: "dashed",
		icon: <BadgeCheck />,
	},
};
