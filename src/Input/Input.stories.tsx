import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./Input"

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Input,
    argTypes: {
        variant: {
            control: "select",
            options: ['outline', 'flat', 'underline'],
            description: "Visual style of the input",
            type: 'string',
        },
        size: {
            control: "select",
            options: ['small', 'medium', 'large'],
            description: "Input size"
        },
        type: {
            control: "select",
            options: ['text', 'email', 'password', 'search'],
            description: "Input size"
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'pill'],
            description: "Corner shape"
        },
        label: {
            control: 'text',
            type: "string",
            description: "Text to display as the label for the component"
        },
        error: {
            control: 'boolean',
            type: 'boolean',
            description: "Applies error styles when true"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the input and makes it inactive"
        }
    }

}

export default meta;

type Story = StoryObj<typeof Input>

export const Text: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        label: 'Label',
        error: false,
        type: 'text',
        errorMessage: "This is a sample error message for demonstration",
        placeholder: "Text input example",
        disabled: false,
    },
}

export const Password: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        label: 'Passwword',
        error: false,
        type: 'password',
        errorMessage: "This is a sample error message for demonstration",
        placeholder: "Enter your password",
        disabled: false,
    },
}

export const Search: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        label: 'Search',
        error: false,
        type: 'search',
        placeholder: "Search here...",
        disabled: false,
    },
}


export const Email: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        label: 'Email',
        error: false,
        type: 'email',
        errorMessage: "This is a sample error message for demonstration",
        placeholder: "Enter your email address",
        disabled: false,
    },
}

