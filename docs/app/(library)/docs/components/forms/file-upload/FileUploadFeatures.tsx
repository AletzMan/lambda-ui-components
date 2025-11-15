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
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5">
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
						name: "helperText",
						type: "string",
						defaultValue: "Helper Text",
						default: "Helper Text",
						label: "Helper Text",
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: "Error Message",
						default: "Error Message",
						label: "Error Message",
					},
					{
						name: "accept",
						type: "string",
						defaultValue: ".png,.jpg,.jpeg",
						default: ".png,.jpg,.jpeg",
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

			{/* TYPE */}
			<PropertyLayout
				title="Type"
				id="type"
				propertyName="type"
				description="Controls whether the component behaves as a dropzone or a button."
				code={`import { FileUpload } from "lambda-ui-components";
import { useState } from "react";
					
export default function App() {
const [files, setFiles] = useState<File[] | null>(null);
					
	return (
		<form className="flex flex-col gap-4">
			<FileUpload files={files} onChangeFiles={setFiles} />
			<FileUpload type="button" files={files} onChangeFiles={setFiles} />
		</form>
	);	
}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload label="Dropzone" files={files} onChangeFiles={setFiles} />
					<FileUpload type="button" label="Button" files={files} onChangeFiles={setFiles} />
				</div>
			</PropertyLayout>

			{/* SIZE */}
			<PropertyLayout
				title="Sizes"
				id="size"
				description="Adjusts the component size."
				propertyName="size"
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
		<FileUpload files={files} onChangeFiles={setFiles} size="small" label="Small" />
		<FileUpload files={files} onChangeFiles={setFiles} label="Medium" />
		<FileUpload files={files} onChangeFiles={setFiles} size="large" label="Large" />
	</form>
);}`}
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
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
		<FileUpload files={files} onChangeFiles={setFiles} multiple label="Multiple Files" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload
						multiple
						label="Multiple Files"
						files={filesPreview}
						onChangeFiles={setFilesPreview}
					/>
				</div>
			</PropertyLayout>

			{/* ACCEPT */}
			<PropertyLayout
				title="Accept"
				id="accept"
				description="Controls which file types the user can select."
				propertyName="accept"
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
		<FileUpload files={files} onChangeFiles={setFiles} accept="image/*" helperText="Only images are allowed" label="Images Only" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload accept="image/*" label="Images Only" helperText="Only images are allowed" />
				</div>
			</PropertyLayout>

			{/* MAX SIZE */}
			<PropertyLayout
				title="Max Size"
				id="maxSize"
				description="Rejects files that exceed the provided maximum size."
				propertyName="maxSize"
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
		<FileUpload files={files} onChangeFiles={setFiles} maxSize={2000000} viewFileSize label="Max Size: 1.91MB" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload maxSize={2000000} viewFileSize label="Max Size: 1.91MB" />
				</div>
			</PropertyLayout>

			{/* DISPLAY MODE */}
			<PropertyLayout
				title="Display Mode"
				id="displayMode"
				description="How selected files are displayed: list or thumbnail."
				propertyName="displayMode"
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
		<FileUpload files={files} onChangeFiles={setFiles} multiple label="List Mode" />
		<FileUpload files={files} onChangeFiles={setFiles} displayMode="thumbnail" multiple label="Thumbnail Mode" /> 
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload
						displayMode="list"
						label="List Mode"
						multiple
						files={filesPreview}
						onChangeFiles={setFilesPreview}
					/>
					<FileUpload
						displayMode="thumbnail"
						label="Thumbnail Mode"
						multiple
						files={filesPreview}
						onChangeFiles={setFilesPreview}
					/>
				</div>
			</PropertyLayout>

			{/* VIEW FILE SIZE */}
			<PropertyLayout
				title="View File Size"
				id="viewFileSize"
				description="Shows the file size next to each filename."
				propertyName="viewFileSize"
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
	<FileUpload files={files} onChangeFiles={setFiles} viewFileSize maxSize={2000000} label="Showing File Size" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload viewFileSize maxSize={2000000} label="Showing File Size" />
				</div>
			</PropertyLayout>

			{/* HELPER TEXT */}
			<PropertyLayout
				title="Helper Text"
				id="helperText"
				description="Displays helper text below the component."
				propertyName="helperText"
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
	<FileUpload files={files} onChangeFiles={setFiles} helperText="Max 2MB" label="Upload File" />
	</form>
);}`}
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
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
	<FileUpload files={files} onChangeFiles={setFiles} invalid errorMessage="File too large" label="Invalid State" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<FileUpload invalid errorMessage="File too large" label="Invalid State" />
				</div>
			</PropertyLayout>

			{/* ERROR MESSAGE */}
			<PropertyLayout
				title="Error Message"
				id="errorMessage"
				description="Displays an error message under the component."
				propertyName="errorMessage"
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
	<FileUpload files={files} onChangeFiles={setFiles} invalid errorMessage="File too large" label="With Error Message" />
	</form>
);}`}
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
				code={`import { useState } from "react";

export default function App() {
const [files, setFiles] = useState<File[] | null>(null);

return (
	<form className="flex flex-col gap-4">
	<FileUpload files={files} onChangeFiles={setFiles} disabled label="Disabled FileUpload" />
	</form>
);}`}
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
		</div>
	);
};
