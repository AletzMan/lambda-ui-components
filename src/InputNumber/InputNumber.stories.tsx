import type { Meta, StoryObj } from "@storybook/react"
import { action } from '@storybook/addon-actions'
import { InputNumber } from "./InputNumber"

const meta: Meta<typeof InputNumber> = {
    title: "Components/InputNumber",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: InputNumber,
    argTypes: {
        variant: {
            control: "select",
            options: ['outline', 'flat'],
            description: "Visual style of the input",
            type: 'string',
        },
        size: {
            control: "select",
            options: ['tiny', 'small', 'medium', 'large'],
            description: "Input size"
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'large', 'pill'],
            description: "Corner shape"
        },
        label: {
            control: 'text',
            type: "string",
            description: "Text to display as the label for the component"
        },
        helperText: {
            control: "text",
            type: "string",
            description: "Displays helper text beneath the input."
        },
        typeNumber: {
            control: "select",
            type: "string",
            options: ["default", "currency-USD", "currency-EUR", "currency-GBP", "percentage", "decimal"]
        },
        invalid: {
            control: 'boolean',
            type: 'boolean',
            description: "Applies error styles when true"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the input and makes it inactive"
        }, onChange: { action: 'onChange' }
    }

}

export default meta

type Story = StoryObj<typeof InputNumber>

export const Number: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        step: 1,
        min: 0,
        max: 100,
        typeNumber: "default",
        label: 'Label',
        helperText: "Must be between 8 and 10 characters long.",
        required: false,
        invalid: false,
        errorMessage: "This is a sample error message for demonstration",
        placeholder: "0",
        disabled: false,
        onChange: action('onChange'),
    },
}
