import { Meta, StoryObj } from "@storybook/react-vite";
import { SwitchTheme } from "./SwitchTheme";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof SwitchTheme> = {
    title: "Components/SwitchTheme",
    component: SwitchTheme,
    argTypes: {
        variant: { control: "radio", options: ["solid", "soft", "subtle", "text"] },
        size: { control: "radio", options: ["small", "medium", "large"] },
        showLabel: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof SwitchTheme>;

const Templete = (args: any) => {
    return (
        <ContainerComponent title="SwitchTheme" subtitle="This is a switch theme component" color={args.variant}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <SwitchTheme {...args} />
            </div>
        </ContainerComponent>
    );
};

export const Default: Story = {
    render: Templete,
    args: {
        variant: "solid",
        size: "medium",
        showLabel: false,

    },
};

export const WithLabel: Story = {
    render: Templete,
    args: {
        showLabel: true,
        variant: "solid",
        size: "medium",
    },
};

export const Outline: Story = {
    render: Templete,
    args: {
        variant: "subtle",
        size: "medium",
        showLabel: false,
    },
};

export const Ghost: Story = {
    render: Templete,
    args: {
        variant: "text",
        size: "medium",
        showLabel: false,
    },
};

export const Small: Story = {
    render: Templete,
    args: {
        size: "small",
        variant: "solid",
        showLabel: false,
    },
};

export const Large: Story = {
    render: Templete,
    args: {
        size: "large",
        variant: "solid",
        showLabel: false,
    },
};
