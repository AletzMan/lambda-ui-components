import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";
import { FileUploadProps } from "./file-upload-types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

const meta: Meta<typeof FileUpload> = {
	title: "Components/FileUpload",
	component: FileUpload,
	argTypes: {
		type: {
			control: "inline-radio",
			options: ["button", "dropzone"],
			description: "Type of file upload component",
		},
		size: {
			control: "inline-radio",
			options: ["small", "medium", "large"],
			description: "Input size",
		},
		label: {
			control: "text",
			type: "string",
			description: "Text to display as the label for the component",
		},
		multiple: {
			control: "boolean",
			type: "boolean",
			description: "Allows multiple file selection",
		},
		accept: {
			control: "text",
			type: "string",
			description: "File types that are accepted",
		},
		maxSize: {
			control: "number",
			type: "number",
			description: "Maximum file size in bytes",
		},
		viewFileSize: {
			control: "boolean",
			type: "boolean",
			description: "Display the file size",
		},
		placeholder: {
			control: "text",
			description: "Placeholder text for the input",
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
		onDrop: {
			table: {
				disable: true,
			},
		},
		onDragOver: {
			table: {
				disable: true,
			},
		},
		onDragLeave: {
			table: {
				disable: true,
			},
		},
		onFilesRejected: {
			table: {
				disable: true,
			},
		},
		onChange: {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

const Template = (args: FileUploadProps) => {
	return (
		<ContainerComponent title="FileUpload" subtitle={args.type?.toString() || ""}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					height: "100%",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						height: "100%",
						maxWidth: "20em",
					}}
				>
					<FileUpload {...args} />
				</div>
			</div>
		</ContainerComponent>
	);
};

export const Button: Story = {
	render: Template,
	args: {
		type: "button",
		size: "medium",
		label: "Upload",
		disabled: false,
		multiple: false,
		accept: "image/*",
		maxSize: 1000000,
		viewFileSize: false,
		invalid: false,
		errorMessage: "Invalid file type or size",
		helperText: "Helper text",
		required: false,
	},
};
export const DropZone: Story = {
	render: Template,
	args: {
		type: "dropzone",
		size: "medium",
		label: "Upload",
		disabled: false,
		multiple: false,
		accept: "image/*",
		maxSize: 1000000,
		invalid: false,
		errorMessage: "Invalid file type or size",
		helperText: "Helper text",
		required: false,
		viewFileSize: false,
		placeholder: "Drag and drop your files here or click to select",
	},
};
