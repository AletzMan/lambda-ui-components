import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import type { SkeletonProps } from "./skeleton.types";
import ContainerComponent from "../../../.storybook/ContainerComponent";
import { Flex } from "../Flex/Flex";
import { Card } from "../Card/Card";

const meta: Meta<typeof Skeleton> = {
	title: "Components/Skeleton",
	component: Skeleton,
	argTypes: {
		shape: { control: "radio", options: ["rect", "circle"] },
		rounded: { control: "boolean" },
		width: { control: "number" },
		height: { control: "number" },
		animationType: { control: "radio", options: ["fade", "wave"] },
	},
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
	render: (args: SkeletonProps) => (
		<ContainerComponent title="Skeleton">
			<Card style={{ height: 120 }}>
				<Flex gap={16} direction="column">
					<Flex gap={16} direction="row">
						<Skeleton {...args} width={40} height={40} />
						<Flex gap={10} direction="column">
							<Skeleton {...args} width={80} height={16} />
							<Skeleton {...args} width={160} height={12} />
						</Flex>
					</Flex>
					<Flex gap={5} direction="column">
						<Skeleton {...args} width={250} height={12} />
						<Skeleton {...args} width={250} height={12} />
						<Skeleton {...args} width={250} height={12} />
					</Flex>
				</Flex>
			</Card>
		</ContainerComponent>
	),
	args: {
		width: 120,
		height: 16,
		rounded: false,
		animationType: "wave",
	},
};

export const Rounded: Story = {
	args: {
		width: 120,
		height: 16,
		rounded: true,
		animationType: "wave",
	},
};

export const Circle: Story = {
	args: {
		shape: "circle",
		height: 48,
		rounded: false,
		animationType: "wave",
	},
};

export const Wave: Story = {
	args: {
		width: 120,
		height: 16,
		animationType: "wave",
	},
};
