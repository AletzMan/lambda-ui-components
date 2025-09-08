import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { BadgeProps } from "./badge.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { Button } from "../Button/Button";
import { Bell } from "lucide-react";

const meta: Meta<typeof Badge> = {
	title: "Components/Badge",
	component: Badge,
	argTypes: {
		color: {
			control: "inline-radio",
			options: ["default", "primary", "secondary", "success", "danger", "warning", "info"],
			description: "Background color",
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
		count: {
			control: {
				type: "number",
				min: 0,
				max: 1000,
			},
			description: "Add a count to the badge",
			if: {
				arg: "count",
				exists: true,
			},
		},
		maxCount: {
			control: {
				type: "number",
				min: 0,
				max: 1000,
			},
			description: "Add a max count to the badge",
			if: {
				arg: "maxCount",
				exists: true,
			},
		},
		text: {
			control: "text",
			description: "Add a text to the badge",
			if: {
				arg: "text",
				exists: true,
			},
		},
	},
};

export default meta;

const getSubtitle = (args: BadgeProps) => {
	if (args.count === undefined && args.maxCount === undefined && args.text === undefined) {
		return "Only identifier";
	} else if (args.count !== undefined && args.maxCount !== undefined) {
		return "With count";
	} else if (args.count === undefined && args.maxCount === undefined && args.text !== undefined) {
		return "With Text";
	}

	return "";
};

const Template = (args: BadgeProps) => {
	return (
		<ContainerComponent
			title="Badge"
			subtitle={getSubtitle(args)}
			color={args.color?.toString() || ""}
		>
			<Button size="medium" icon={<Bell />} variant="soft">
				<Badge {...args} />
			</Button>
		</ContainerComponent>
	);
};

export const Default: StoryObj<BadgeProps> = {
	render: (args) => <Template {...args} />,
	args: {
		size: "small",
		radius: "small",
		color: "default",
	},
};

export const WithCount: StoryObj<BadgeProps> = {
	render: (args) => <Template {...args} />,
	args: {
		size: "small",
		radius: "small",
		count: 10,
		maxCount: 10,
		color: "default",
	},
};

export const WithText: StoryObj<BadgeProps> = {
	render: (args) => <Template {...args} />,
	args: {
		size: "small",
		radius: "small",
		text: "Badge",
		color: "default",
	},
};
