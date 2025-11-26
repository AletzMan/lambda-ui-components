import { Meta, StoryObj } from "@storybook/react-vite";
import { SwitchTheme } from "./SwitchTheme";

const meta: Meta<typeof SwitchTheme> = {
    title: "Components/SwitchTheme",
    component: SwitchTheme,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: { control: "radio", options: ["solid", "soft", "subtle", "text"] },
        size: { control: "radio", options: ["small", "medium", "large"] },
        showLabel: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof SwitchTheme>;

export const Default: Story = {
    args: {},
};

export const WithLabel: Story = {
    args: {
        showLabel: true,
    },
};

export const Outline: Story = {
    args: {
        variant: "subtle",
    },
};

export const Ghost: Story = {
    args: {
        variant: "text",
    },
};

export const Small: Story = {
    args: {
        size: "small",
    },
};

export const Large: Story = {
    args: {
        size: "large",
    },
};
