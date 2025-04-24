import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
    title: "Components/TextArea",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: TextArea,
    argTypes: {
        variant: {
            control: "select",
            options: ['borderless ', 'outline'],
            description: "Optional variant of the card",
            type: 'string',
        },
        size: {
            control: "select",
            options: ['tiny', 'small', 'medium', 'large'],
            description: "Size of the card",
        },
        invalid: {
            control: "boolean",
            description: "Invalid state of the card",
        },
        disabled: {
            control: "boolean",
            description: "Disabled state of the card",
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'large'],
            description: "Radius of the card",
        }
    }

};

export default meta;

type Story = StoryObj<typeof TextArea>

export const Outline: Story = {
    args: {
        variant: "outline",
        size: "medium",
        radius: 'small',
    },
};


