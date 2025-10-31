import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tokens } from "./Tokens";

const meta: Meta<typeof Tokens> = {
	title: "Overview/Tokens",
	component: Tokens,
};

export default meta;

type Story = StoryObj<typeof Tokens>;

export const Default: Story = {
	args: {
		size: "medium",
	},
};
