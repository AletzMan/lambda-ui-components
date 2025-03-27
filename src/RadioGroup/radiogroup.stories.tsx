import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup } from "./RadioGroup"
import { Radio } from "../Radio/Radio";

const meta: Meta<typeof RadioGroup> = {
    title: "Components/RadioGroup",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: RadioGroup,
    argTypes: {
        variant: {
            control: "radio",
            options: ['bordered', 'flat', 'outline'],
            description: "Visual style of the input",
            type: 'string',
        },
        color: {
            control: "select",
            options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
            description: "Background color"
        },
        orientation: {
            control: "radio",
            options: ['vertical', 'horizontal']
        },
        size: {
            control: "select",
            options: ['small', 'medium', 'large'],
            description: "Input size"
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'pill'],
            description: "Corner shape"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the input and makes it inactive"
        }
    }

}

export default meta;

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
    args: {
        color: "secondary",
        variant: "bordered",
        size: "medium",
        radius: "medium",
        orientation: "vertical",
        type: "default",
        disabled: false,
        name: '',
        children: (
            <>
                <Radio value="option1" label="Menu Inicio 1" />
                <Radio value="option2" label="Menu Inicio 2" />
                <Radio value="option3" label="Menu Inicio 3" />
                <Radio value="option4" label="Menu 4" />
            </>
        )
    },
}


