import type { Meta, StoryObj } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
    title: "Components/Switch",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Switch,
    argTypes: {

        variant: {
            control: "select",
            options: ['solid', 'flat', 'outline'],
            description: "Visual style of the input",
            type: 'string',
        },
        color: {
            control: "select",
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: "Background color"
        },
        size: {
            control: "select",
            options: ['tiny', 'small', 'medium', 'large'],
            description: "Input size"
        },
        label: {
            control: 'text',
            type: "string",
            description: "Text to display as the label for the component",
        },
        position_label: {
            control: 'select',
            options: ['right', 'left', 'top', 'bottom'],
            description: "Select position label right or left",
            type: "string"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the input and makes it inactive"
        }
    }

};

export default meta;

type Story = StoryObj<typeof Switch>

export const Bordered: Story = {
    args: {
        variant: "solid",
        color: 'primary',
        size: 'medium',
        label: 'Label',
        position_label: 'right',
        disabled: false,
        onChange: action('onChange')
    },
};

export const Flat: Story = {
    args: {
        variant: "flat",
        color: 'primary',
        size: 'medium',
        label: 'Label',
        position_label: 'right',
        disabled: false,
        onChange: action('onChange')
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        color: 'primary',
        size: 'medium',
        label: 'Label',
        position_label: 'right',
        disabled: false,
        onChange: action('onChange')
    },
};
