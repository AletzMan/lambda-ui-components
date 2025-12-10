"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { TextArea } from "lambda-ui-components";
import { useRef, useState } from "react";

export const TextAreaFeatures = () => {
	const refTextArea = useRef<HTMLTextAreaElement>(null);
	const [value, setValue] = useState("");

	return (
		<>
			<PlaygroundLayout<HTMLTextAreaElement>
				id="playground"
				title="Playground"
				componentName="TextArea"
				description="Experiment with all the properties of the TextArea component in real time."
				propConfigs={[
					{
						name: "label",
						type: "string",
						defaultValue: "Label",
						default: "",
						label: "Label",
						description: "Optional text label for the textarea."
					},
					{
						name: "placeholder",
						type: "string",
						defaultValue: "Placeholder",
						default: "",
						label: "Placeholder",
						description: "Placeholder text."
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Controls the overall textarea size.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "default",
						default: "default",
						label: "Radius",
						description: "Controls the roundness of the corners.",
						values: ["default", "none", "tiny", "small", "medium", "large", "full"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "outline",
						default: "outline",
						label: "Variant",
						description: "Defines the visual style of the textarea.",
						values: ["outline", "soft"],
					},
					{
						name: "helperText",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Helper Text",
						description: "Helper text displayed below the textarea."
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Error Message",
						description: "Error message displayed when invalid."
					},
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Invalid",
						description: "Indicates if the field is invalid.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables user interaction.",
					},
					{
						name: "required",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Required",
						description: "Indicates if the field is required.",
					},
				]}
				componentRef={refTextArea}
			>
				<TextArea ref={refTextArea} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { TextArea } from "lambda-ui-components";

export default function App() {
	return (
		<TextArea label="Description" placeholder="Enter your description..." />
	);
}`}
			/>

			<PropertyLayout
				title="Controlled"
				id="controlled"
				description="Controls the value of the textarea."
				propertyName="value"
				code={`import { TextArea } from "lambda-ui-components";
import { useState } from "react";	

export default function TextAreaControlled() {
	const [value, setValue] = useState("");
	return ( 
			<TextArea  
				label="Description"   
				value={value} 
				onChange={(e) => setValue(e.target.value)} 
			/>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<TextArea
						label="Description"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Type something..."
					/>
				</form>
			</PropertyLayout>
		</>
	);
};
