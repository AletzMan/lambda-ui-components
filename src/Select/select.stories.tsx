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
        invalid: {
            control: 'boolean',
            type: 'boolean',
            description: "Applies error styles when true"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the input and makes it inactive"
        },
        required: {
            control: "boolean",
            description: ""
        }
    }

}

export default meta;

type Story = StoryObj<typeof Select>

export const Normal: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        label: 'Label',
        options: [
            {
                label: "JavaScript",
                value: "javascript",
            },
            {
                label: "TypeScript",
                value: "typescript",
            },
            {
                label: "React",
                value: "react",
            },
            {
                label: "Node.js",
                value: "nodejs",
            },
            {
                label: "C#",
                value: "csharp",
            }
        ],
        required: false,
        invalid: false,
        errorMessage: "This is a sample error message for demonstration",
        disabled: false,
    },
}

export const Description: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        label: 'Label',
        options: [
            {
                label: "JavaScript",
                value: "javascript",
                description: "A versatile programming language commonly used for web development."
            },
            {
                label: "TypeScript",
                value: "typescript",
                description: "A superset of JavaScript that adds static typing for better security and scalability."
            },
            {
                label: "React",
                value: "react",
                description: "A JavaScript library for building interactive and dynamic user interfaces."
            },
            {
                label: "Node.js",
                value: "nodejs",
                description: "A JavaScript runtime environment for building server-side applications."
            },
            {
                label: "C#",
                value: "csharp",
                description: "A modern, object-oriented programming language developed by Microsoft."
            }
        ],
        required: false,
        invalid: false,
        errorMessage: "This is a sample error message for demonstration",
        disabled: false,
    },
}


export const Icon: Story = {
    args: {
        variant: "outline",
        radius: "small",
        size: 'medium',
        label: 'Label',
        options: [
            {
                label: "JavaScript",
                value: "javascript",
                avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png",
            },
            {
                label: "TypeScript",
                value: "typescript",
                avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/250px-Typescript_logo_2020.svg.png",
            },
            {
                label: "React",
                value: "react",
                avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/330px-React-icon.svg.png",
            },
            {
                label: "Node.js",
                value: "nodejs",
                avatar: "https://nodejs.org/static/logos/jsIconGreen.svg",
            },
            {
                label: "C#",
                value: "csharp",
                avatar: "https://cdn.worldvectorlogo.com/logos/c--4.svg",
            }
        ],
        required: false,
        invalid: false,
        errorMessage: "This is a sample error message for demonstration",
        disabled: false,
    },
}

