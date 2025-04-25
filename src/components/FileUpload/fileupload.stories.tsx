import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
    title: "Components/FileUpload",
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    component: FileUpload,
    argTypes: {
        type: {
            control: "select",
            options: ['button', 'dropzone'],
            description: "Type of file upload component"
        },
        radius: {
            control: 'select',
            options: ['none', 'small', 'medium', 'circle'],
            description: "Corner shape",
            type: "string"
        },
        size: {
            control: "select",
            options: ['small', 'medium', 'large'],
            description: "Input size"
        },
        label: {
            control: 'text',
            type: "string",
            description: "Text to display as the label for the component",
        },
        multiple: {
            control: 'boolean',
            type: "boolean",
            description: "Allows multiple file selection"
        },
        accept: {
            control: 'text',
            type: "string",
            description: "File types that are accepted"
        },
        maxSize: {
            control: 'number',
            type: "number",
            description: "Maximum file size in bytes"
        },
        viewFileSize: {
            control: 'boolean',
            type: "boolean",
            description: "Display the file size"
        },
        placeholder: {
            control: 'text',
            description: "Placeholder text for the input"
        },
        disabled: {
            control: 'boolean',
            description: "Disables the input and makes it inactive"
        },
        onDrop: {
            table: {
                disable: true,
            }
        },
        onDragOver: {
            table: {
                disable: true,
            }
        },
        onDragLeave: {
            table: {
                disable: true,
            }
        },
        onFilesRejected: {
            table: {
                disable: true,
            }
        },
        onChange: {
            table: {
                disable: true,
            }
        }
    }

};

export default meta;

type Story = StoryObj<typeof FileUpload>

export const Button: Story = {
    args: {
        type: 'button',
        size: 'medium',
        label: 'Label',
        radius: "small",
        disabled: false,
        multiple: false,
        accept: 'image/*',
        maxSize: 1000000,
        viewFileSize: false,
        invalid: false,
        errorMessage: 'Invalid file type or size',
        helperText: 'Helper text',
        required: false,
        buttonText: 'Upload Files',
    },
};
export const DropZone: Story = {
    args: {
        type: 'dropzone',
        size: 'medium',
        label: 'Label',
        radius: "small",
        disabled: false,
        multiple: false,
        accept: 'image/*',
        maxSize: 1000000,
        invalid: false,
        errorMessage: 'Invalid file type or size',
        helperText: 'Helper text',
        required: false,
        viewFileSize: false,
        placeholder: 'Drag and drop your files here or click to select',
    },
};
