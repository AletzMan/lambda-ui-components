import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "./Card"

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Card,
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
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'large'],
            description: "Radius of the card",
        }
    }

}

export default meta

type Story = StoryObj<typeof Card>

export const Outline: Story = {
    args: {
        variant: "outline",
        size: "medium",
        radius: 'small',
    },
}


