import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./ToolTip";
import { TooltipProps } from "./tooltip.types";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Tooltip,
    argTypes: {
        size: {
            control: "select",
            options: ['small', 'medium', 'large'],
            description: "Size of the card",
        },
        content: {
            control: "text",
            description: "Content of the tooltip",
        },
        delayShow: {
            control: "number",
            type: "number",
            description: "Delay before showing the tooltip in milliseconds",
        },
        delayHide: {
            control: "number",
            type: "number",
            description: "Delay before hiding the tooltip in milliseconds",
        },
    }

};

export default meta;

const Template = (args: TooltipProps & React.RefAttributes<HTMLDivElement>) => {

    return (
        <Tooltip {...args} >
            <div style={{ width: "100px", height: "100px", backgroundColor: "lightblue" }}>
                Hover over me
            </div>
        </Tooltip>
    );
};

export const Default: StoryObj<TooltipProps> = {
    render: (args) => <Template {...args} />,
    args: {
        size: "medium",
        delayShow: 100,
        delayHide: 100,
        content: "This is a tooltip",
    },
}; 