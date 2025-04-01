import type { Meta, StoryObj } from "@storybook/react"
import { Select } from "./Select"

const meta: Meta<typeof Select> = {
    title: "Components/Select",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Select,
    argTypes: {
        variant: {
            control: "select",
            options: ['outline', 'flat', 'underline'],
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

type Story = StoryObj<typeof Select>

export const Primary: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        label: 'Label',
        options: [
            {
                label: "JavaScript",
                value: "javascript"
            },
            {
                label: "TypeScript",
                value: "typescript"
            },
            {
                label: "React",
                value: "react"
            },
            {
                label: "Node.js",
                value: "nodejs"
            },
            {
                label: "C#",
                value: "csharp"
            },
        ],
        error: false,
        errorMessage: "This is a sample error message for demonstration",
        disabled: false,
    },
}

