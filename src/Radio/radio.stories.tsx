import type { Meta, StoryObj } from "@storybook/react"
import { Radio, Radioprops } from "./Radio"
import { RadioGroup } from "../RadioGroup/RadioGroup";

const meta: Meta<typeof Radio> = {
    title: "Components/Radio",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Radio,
    argTypes: {
        variant: {
            control: "select",
            options: ['solid', 'flat', 'outline'],
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
        type: {
            control: "radio",
            options: ['radio', 'button']
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



const Template: StoryObj<Radioprops> = {
    render: (args) => (
        <RadioGroup name="example" defaultValue="option1" onChange={console.log}  >
            <Radio {...args} value="option1" label="Option 1" />
            <Radio {...args} value="option2" label="Option 2" />
            <Radio {...args} value="option3" label="Option 3" />
        </RadioGroup>
    ),
};

export const Default = {
    ...Template,
    args: {
        value: "option3",
        label: "Option 1",
        size: "medium",
        color: "primary",
        type: "radio",
        variant: "solid",
        positionLabel: "right",
        disabled: false
    }
};
