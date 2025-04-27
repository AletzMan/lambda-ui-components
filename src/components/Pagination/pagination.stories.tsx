import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
    title: "Components/Pagination",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Pagination,
    argTypes: {
        totalPages: {
            control: 'number',
            description: "Total number of pages",
            type: "number"
        },
        currentPage: {
            control: 'number',
            description: "Current active page",
            type: "number"
        },
        maxVisiblePages: {
            control: 'number',
            description: "Maximum number of visible pages",
            type: "number"
        },
        variant: {
            control: 'select',
            options: ['solid', 'outline', 'flat'],
            description: "Pagination variant",
            type: "string"
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'circle'],
            description: "Corner shape",
            type: "string"
        },
        size: {
            control: "select",
            options: ['tiny', 'small', 'medium', 'large'],
            description: "Input size"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the input and makes it inactive"
        },
    }

};

export default meta;

type Story = StoryObj<typeof Pagination>

export const Solid: Story = {
    args: {
        variant: "solid",
        size: 'medium',
        radius: "small",
        disabled: false,
        totalPages: 10,
        currentPage: 1,
        maxVisiblePages: 5,
        onPageChange: (page: number) => {
            console.log("Page changed to:", page);
        }
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        size: 'medium',
        radius: "small",
        disabled: false,
        totalPages: 10,
        currentPage: 1,
        maxVisiblePages: 5,

    },
};

export const Flat: Story = {
    args: {
        variant: "flat",
        size: 'medium',
        radius: "small",
        disabled: false,
        totalPages: 10,
        currentPage: 1,
        maxVisiblePages: 5,

    },
};
