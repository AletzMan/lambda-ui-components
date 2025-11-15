"use client";

import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { FileUpload } from "lambda-ui-components";
import { useRef, useState } from "react";

export const FileUploadFeatures = () => {
	// ref para el dropzone / button wrapper
	const refInput = useRef<HTMLInputElement>(null);

	// estado controlado de archivos
	const [files, setFiles] = useState<File[] | null>(null);

	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5">
			{/* PLAYGROUND */}
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="FileUpload"
				description="Play with the FileUpload component"
				propConfigs={[
					{
						name: "type",
						type: "radio",
						defaultValue: "dropzone",
						default: "dropzone",
						label: "Type",
						values: ["dropzone", "button"],
					},
					{
						name: "size",
						type: "radio",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						values: ["small", "medium", "large"],
					},
					{
						name: "multiple",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Multiple Files",
					},
					{
						name: "viewFileSize",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show File Size",
					},
					{
						name: "displayMode",
						type: "radio",
						defaultValue: "list",
						default: "list",
						label: "Display Mode",
						values: ["list", "thumbnail"],
					},
					{
						name: "label",
						type: "string",
						defaultValue: "Label",
						default: "Label",
						label: "Label",
					},
					{
						name: "accept",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Accept",
					},
					{
						name: "required",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Required",
					},
					{
						name: "maxSize",
						type: "number",
						defaultValue: 0,
						default: 0,
						label: "Max Size",
					},
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Invalid",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
					},
				]}
				componentRef={refInput}
			>
				<FileUpload ref={refInput} onChange={(e) => setFiles(Array.from(e.target.files || []))} />
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
			<FileUpload
				multiple
				onChange={setFiles}
			/>
		</form>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<FileUpload multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
				</form>
			</PropertyLayout>

			{/* TYPE */}
			<PropertyLayout
				title="Type"
				id="type"
				propertyName="type"
				description="Controls whether the component behaves as a dropzone or a button."
				code={`<FileUpload type="dropzone" />
<FileUpload type="button" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload type="dropzone" label="Dropzone" />
					<FileUpload type="button" label="Button" />
				</div>
			</PropertyLayout>

			{/* SIZE */}
			<PropertyLayout
				title="Sizes"
				id="size"
				description="Adjusts the component size."
				propertyName="size"
				code={`<FileUpload size="small" />
<FileUpload size="medium" />
<FileUpload size="large" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload size="small" label="Small" />
					<FileUpload size="medium" label="Medium" />
					<FileUpload size="large" label="Large" />
				</div>
			</PropertyLayout>

			{/* MULTIPLE */}
			<PropertyLayout
				title="Multiple"
				id="multiple"
				description="Allows selecting multiple files."
				propertyName="multiple"
				code={`<FileUpload multiple />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload multiple label="Multiple Files" />
				</div>
			</PropertyLayout>

			{/* ACCEPT */}
			<PropertyLayout
				title="Accept"
				id="accept"
				description="Controls which file types the user can select."
				propertyName="accept"
				code={`<FileUpload accept="image/*" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload accept="image/*" label="Images Only" />
				</div>
			</PropertyLayout>

			{/* MAX SIZE */}
			<PropertyLayout
				title="Max Size"
				id="maxSize"
				description="Rejects files that exceed the provided maximum size."
				propertyName="maxSize"
				code={`<FileUpload maxSize={2000000} /> // 2MB`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload maxSize={2000000} label="Max Size: 2MB" />
				</div>
			</PropertyLayout>

			{/* DISPLAY MODE */}
			<PropertyLayout
				title="Display Mode"
				id="displayMode"
				description="How selected files are displayed: list or thumbnail."
				propertyName="displayMode"
				code={`<FileUpload displayMode="thumbnail" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload displayMode="list" label="List Mode" />
					<FileUpload displayMode="thumbnail" label="Thumbnail Mode" />
				</div>
			</PropertyLayout>

			{/* VIEW FILE SIZE */}
			<PropertyLayout
				title="View File Size"
				id="viewFileSize"
				description="Shows the file size next to each filename."
				propertyName="viewFileSize"
				code={`<FileUpload viewFileSize />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload viewFileSize label="Showing File Size" />
				</div>
			</PropertyLayout>

			{/* HELPER TEXT */}
			<PropertyLayout
				title="Helper Text"
				id="helperText"
				description="Displays helper text below the component."
				propertyName="helperText"
				code={`<FileUpload helperText="Max 2MB" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload helperText="Max 2MB" label="Upload File" />
				</div>
			</PropertyLayout>

			{/* INVALID */}
			<PropertyLayout
				title="Invalid"
				id="invalid"
				description="Shows error styling."
				propertyName="invalid"
				code={`<FileUpload invalid />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload invalid label="Invalid State" />
				</div>
			</PropertyLayout>

			{/* ERROR MESSAGE */}
			<PropertyLayout
				title="Error Message"
				id="errorMessage"
				description="Displays an error message under the component."
				propertyName="errorMessage"
				code={`<FileUpload invalid errorMessage="File too large" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload invalid errorMessage="File too large" label="With Error Message" />
				</div>
			</PropertyLayout>

			{/* DISABLED */}
			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Prevents user interaction."
				propertyName="disabled"
				code={`<FileUpload disabled />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload disabled label="Disabled FileUpload" />
				</div>
			</PropertyLayout>

			{/* CONTROLLED */}
			<PropertyLayout
				title="Controlled Component"
				id="controlled"
				description="Control the selected files using value and onChange."
				propertyName="onChange"
				code={`const [files, setFiles] = useState<File[] | null>(null);

<FileUpload onChange={(e) => setFiles(Array.from(e.target.files || []))} />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload
						label="Controlled"
						onChange={(e) => setFiles(Array.from(e.target.files || []))}
					/>
				</div>
			</PropertyLayout>
		</div>
	);
};
