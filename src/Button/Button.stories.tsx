import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Button,
    argTypes: {
        variant: {
            control: "select",
            options: ['solid', 'outline', 'dashed', 'ghost'],
            description: "Visual style of the button",
            type: 'string',
        },
        color: {
            control: "select",
            options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
            description: "Background color"
        },
        size: {
            control: "select",
            options: ['small', 'medium', 'large'],
            description: "Button size"
        },
        icon_only: {
            control: 'boolean',
            description: "Shows only an icon if true."
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'large', 'pill', 'circle'],
            description: "Corner shape"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the button and makes it inactive."
        }
    }

}

export default meta;

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        color: "primary",
        variant: "solid",
        size: "medium",
        radius: 'small',
        disabled: false,
        icon_only: false,
        children: "Button"
    },
}


export const Secondary: Story = {
    args: {
        color: "secondary",
        variant: "solid",
        size: "medium",
        radius: 'small',
        disabled: false,
        icon_only: false,
        children: "Button",
    }
}

export const Danger: Story = {
    args: {
        color: "danger",
        variant: "solid",
        size: "medium",
        radius: 'small',
        disabled: false,
        icon_only: false,
        children: "Button",
    }
}

export const Success: Story = {
    args: {
        color: "success",
        variant: "solid",
        size: "medium",
        radius: 'small',
        disabled: false,
        icon_only: false,
        children: "Button",
    }
}

export const Warning: Story = {
    args: {
        color: "warning",
        variant: "solid",
        size: "medium",
        radius: 'small',
        disabled: false,
        icon_only: false,
        children: "Button",
    }
}

