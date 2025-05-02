import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Accordion,
    argTypes: {
        variant: {
            control: "select",
            options: ['borderless ', 'solid'],
            description: "Optional variant of the card",
            type: 'string',
        },
        size: {
            control: "select",
            options: ['small', 'medium', 'large'],
            description: "Size of the card",
        },
    }

};

export default meta;

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
    args: {
        variant: "default",
        size: "medium",
    },
};

export const Flush: Story = {
    args: {
        variant: "flush",
        size: "medium",
    },
};



export const Split: Story = {
    args: {
        variant: "split",
        size: "medium",
    },
};


