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
            options: ['bordered', 'flat'],
            description: "Visual style of the input",
            type: 'string',
        },
        color: {
            control: "select",
            options: ['primary', 'secondary', 'danger', 'success', 'warning'],
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
                <Radio value="option1" label="Option 1" />
                <Radio value="option2" label="Option 2" />
                <Radio value="option3" label="Option 3" />
            </>
        )
    },
}


