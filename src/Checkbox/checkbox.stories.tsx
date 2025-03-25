import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Checkbox,
    argTypes: {
        variant: {
            control: "select",
            options: ['bordered', 'flat'],
            description: "Visual style of the input",
            type: 'string',
        },
        color: {
            control: "select",
            options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
            description: "Background color"
        },
        size: {
            control: "select",
            options: ['tiny', 'small', 'medium', 'large'],
            description: "Input size"
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'circle'],
            description: "Corner shape",
            type: "string"
        },
        label: {
            control: 'text',
            type: "string",
            description: "Text to display as the label for the component",
        },
        positionLabel: {
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

}

export default meta;

type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
    args: {
        variant: "bordered",
        color: "primary",
        size: 'medium',
        label: 'Label',
        positionLabel: 'right',
        radius: "medium",
        checked: false,
        disabled: false,
    },
}
export const Secondary: Story = {
    args: {
        variant: "bordered",
        color: "secondary",
        size: 'medium',
        label: 'Label',
        positionLabel: 'right',
        radius: "medium",
        checked: false,
        disabled: false,
    },
}
export const Danger: Story = {
    args: {
        variant: "bordered",
        color: "danger",
        size: 'medium',
        label: 'Label',
        positionLabel: 'right',
        radius: "medium",
        checked: false,
        disabled: false,
    },
}
export const Success: Story = {
    args: {
        variant: "bordered",
        color: "success",
        size: 'medium',
        label: 'Label',
        positionLabel: 'right',
        radius: "medium",
        checked: false,
        disabled: false,
    },
}
export const Warning: Story = {
    args: {
        variant: "bordered",
        color: "warning",
        size: 'medium',
        label: 'Label',
        positionLabel: 'right',
        radius: "medium",
        checked: false,
        disabled: false,
    },
}
