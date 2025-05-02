import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: Alert,
    argTypes: {
        variant: {
            control: "select",
            options: ['solid', 'outline', 'flat'],
            description: "Visual style of the button",
            type: 'string',
        },
        color: {
            control: "select",
            options: ['default', 'primary', 'danger', 'success', 'warning', 'info'],
            description: "Background color"
        },
        size: {
            control: "select",
            options: ['tiny', 'small', 'medium', 'large'],
            description: "Alert size"
        },
        title: {
            control: "text",
        },
        message: {
            control: "text",
        }
    }

};

export default meta;

type Story = StoryObj<typeof Alert>


export const Default: Story = {
    args: {
        color: "default",
        variant: "flat",
        size: "medium",
        title: "Default",
        message: "This is a standard notification message for your information"
    }
};
export const Primary: Story = {
    args: {
        color: "primary",
        variant: "flat",
        size: "medium",
        title: "Priamry",
        message: "Please review the details below and take the necessary action"
    },
};

export const Success: Story = {
    args: {
        color: "success",
        size: "medium",
        variant: "flat",
        title: "Success",
        message: "Your changes have been saved successfully"
    }
};

export const Danger: Story = {
    args: {
        color: "danger",
        variant: "flat",
        size: "medium",
        title: "Danger",
        message: "Unable to complete the request. Please try again or contact support"
    }
};


export const Warning: Story = {
    args: {
        color: "warning",
        variant: "flat",
        size: "medium",
        title: "Warning",
        message: "Please be aware that continuing might lead to unexpected results"
    }
};


export const Info: Story = {
    args: {
        color: "info",
        variant: "flat",
        size: "medium",
        title: "Info",
        message: "Here is some helpful information regarding the current process"
    }
};

