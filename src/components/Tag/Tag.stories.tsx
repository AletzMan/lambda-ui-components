import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { BadgeCheck } from "lucide-react";
import { TagProps } from "./tag.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof Tag> = {
	title: "Components/Tag",
	component: Tag,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "outline", "soft", "dashed", "subtle"],
			description: "Visual style of the input",
			type: "string",
			defaultValue: "subtle",
			table: {
				defaultValue: {
					summary: "subtle",
				},
			},
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
		text: {
			control: "text",
			description: "Input text",
		},
		onClose: {
			control: "boolean",
			description: "Input onClose",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tag>;

const colors = ["primary", "secondary", "success", "danger", "warning", "info"];

const Template = (args: TagProps) => {
	return (
		<ContainerComponent title="Tag" subtitle={args.variant?.toString() || ""}>
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
					<Tag key={color} {...args} color={color as TagProps["color"]} />
				))}
			</div>
		</ContainerComponent>
	);
};

export const Outline: Story = {
	render: Template,
	args: {
		variant: "outline",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
	},
};

export const Solid: Story = {
	render: Template,
	args: {
		variant: "solid",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
	},
};

export const Soft: Story = {
	render: Template,
	args: {
		variant: "soft",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
	},
};

export const Dashed: Story = {
	render: Template,
	args: {
		variant: "dashed",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
	},
};

export const Subtle: Story = {
	render: Template,
	args: {
		variant: "subtle",
		color: "primary",
		icon: <BadgeCheck />,
		size: "small",
		text: "Tag",
		radius: "small",
	},
};
