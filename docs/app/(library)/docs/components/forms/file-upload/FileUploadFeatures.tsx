"use client";

import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { FileUpload } from "lambda-ui-components";
import { useEffect, useRef, useState } from "react";

export const FileUploadFeatures = () => {
	// ref para el dropzone / button wrapper
	const refInput = useRef<HTMLInputElement>(null);

	// estado controlado de archivos
	const [files, setFiles] = useState<File[]>([]);
	const [filesPreview, setFilesPreview] = useState<File[]>([]);
	const [filesPlayground, setFilesPlayground] = useState<File[]>([]);

	useEffect(() => {
		async function fetchImageAsFile() {
			const response = await fetch("https://placehold.co/300x300?text=Hello+World");
			const blob = await response.blob();
			const file = new File([blob], "placeholder.png", { type: blob.type });
			setFiles([file]);
		}
		fetchImageAsFile();
	}, []);

	useEffect(() => {
		async function fetchImageAsFile() {
			const response = await fetch("https://placehold.co/300x300?text=Hello");
			const blob = await response.blob();
			const file = new File([blob], "placeholder.png", { type: blob.type });
			const responseTwo = await fetch("https://placehold.co/300x300?text=World");
			const blobTwo = await responseTwo.blob();
			const fileTwo = new File([blobTwo], "placeholderTwo.png", { type: blobTwo.type });
			setFilesPreview([file, fileTwo]);
		}
		fetchImageAsFile();
	}, []);

	return (
		<>
			{/* PLAYGROUND */}
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="FileUpload"
				description="Experiment with all the properties of the FileUpload component in real time."
				propConfigs={[
					{
						name: "type",
						type: "radio",
						defaultValue: "dropzone",
						default: "dropzone",
						label: "Type",
						description: "Switches between dropzone and button behavior.",
						values: ["dropzone", "button"],
					},
					{
						name: "size",
						type: "radio",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Sets the component’s overall size.",
						values: ["small", "medium", "large"],
					},
					{
						name: "multiple",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Multiple Files",
						description: "Allows selecting more than one file.",
					},
					{
						name: "viewFileSize",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show File Size",
						description: "Shows the size of each uploaded file.",
					},
					{
						name: "displayMode",
						type: "radio",
						defaultValue: "list",
						default: "list",
						label: "Display Mode",
						description: "Chooses between list or thumbnail view.",
						values: ["list", "thumbnail"],
					},
					{
						name: "label",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Label",
						description: "Sets the component label.",
					},
					{
						name: "helperText",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Helper Text",
						description: "Displays additional helper text.",
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Error Message",
						description: "Message shown when the field is invalid.",
					},
					{
						name: "accept",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Accept",
						description: "Allowed file types (e.g., .png, .jpg).",
					},
					{
						name: "required",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Required",
						description: "Marks the field as required.",
					},
					{
						name: "maxSize",
						type: "number",
						defaultValue: 0,
						default: 0,
						label: "Max Size",
						description: "Maximum allowed file size in bytes.",
					},
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Invalid",
						description: "Marks the field as invalid.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables all interactions.",
					},

				]}
				componentRef={refInput}
			>
				<FileUpload ref={refInput} files={filesPlayground} onChangeFiles={setFilesPlayground} />
			</PlaygroundLayout>

			{/* USAGE */}
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { FileUpload } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [files, setFiles] = useState<File[] | null>(null);

	return (
		<form className="flex flex-col gap-4">
			<FileUpload files={files} onChangeFiles={setFiles} />
		</form>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<FileUpload />
				</form>
			</PropertyLayout>

			{/* CONTROLLED */}
			<PropertyLayout
				title="Controlled Component"
				id="controlled"
				description="Control the selected files using value and onChange."
				propertyName="onChange"
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
	<FileUpload files={files} onChangeFiles={setFiles} label="Controlled" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload label="Controlled" files={files} onChangeFiles={setFiles} />
				</div>
			</PropertyLayout>
		</>
	);
};
