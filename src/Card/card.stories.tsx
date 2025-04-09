import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "./Card"

const meta: Meta<typeof Card> = {
    title: "Components/Button",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Card,
    argTypes: {
        variant: {
            control: "select",
            options: ['classic', 'solid', 'outline', 'dashed', 'ghost', 'text'],
            description: "Visual style of the button",
            type: 'string',
        },
        size: {
            control: "select",
            options: ['tiny', 'small', 'medium', 'large'],
            description: "Card size"
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'large', 'pill', 'circle'],
            description: "Corner shape"
        }
    }

}

export default meta

type Story = StoryObj<typeof Card>

export const Primary: Story = {
    args: {
        variant: "solid",
        size: "medium",
        radius: 'small',
    },
}


