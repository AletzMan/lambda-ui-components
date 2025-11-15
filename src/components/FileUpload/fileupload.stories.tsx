import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload } from "./FileUpload";
import { FileUploadProps } from "./file-upload-types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { useEffect, useState } from "react";

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
		displayMode: {
			control: "inline-radio",
			options: ["list", "thumbnail"],
			description: "Display mode for the file list",
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
		files: {
			table: {
				disable: true,
			},
		},
		onChangeFiles: {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

const Template = (args: FileUploadProps) => {
	const [files, setFiles] = useState<File[]>([]);

	useEffect(() => {
		async function fetchImageAsFile() {
			const response = await fetch("https://placehold.co/300x300?text=Hello+World");
			const blob = await response.blob();
			const file = new File([blob], "placeholder.png", { type: blob.type });
			setFiles([file]);
		}
		fetchImageAsFile();
	}, []);

	return (
		<ContainerComponent title="FileUpload" subtitle={args.type?.toString() || ""}>
			<FileUpload
				{...args}
				files={files}
				onChangeFiles={(newFiles) => {
					console.log("onChangeFiles", newFiles);
					setFiles(newFiles);
				}}
			/>
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
		accept: ".jpg, .png, .gif, .pdf",
		maxSize: 150000000,
		viewFileSize: false,
		invalid: false,
		errorMessage: "Invalid file type or size",
		helperText: "JPG, PNG, GIF, PDF",
		required: false,
		displayMode: "list",
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
		helperText: "JPG, PNG, GIF, PDF",
		required: false,
		viewFileSize: false,
		placeholder: "Drag and drop your files here or click to select",
		displayMode: "list",
	},
};
