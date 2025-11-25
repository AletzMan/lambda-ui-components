"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Input } from "lambda-ui-components";
import { Mail, Search, Text, User } from "lucide-react";
import { useRef, useState } from "react";

export const InputFeatures = () => {
	const refInput = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState("");
	return (
		<>
			<PlaygroundLayout<HTMLInputElement>
				id="playground"
				title="Playground"
				componentName="Input"
				description="Experiment with all the properties of the Input component in real time."
				propConfigs={[
					{
						name: "placeholder",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Placeholder",
						description: "Text shown when the input is empty.",
					},
					{
						name: "label",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Label",
						description: "Defines the input label.",
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Controls the color of the switch when active.",
						values: ["neutral", "primary", "secondary", "success", "danger", "warning", "info"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "outline",
						default: "outline",
						label: "Variant",
						values: ["outline", "soft", "underline"],
						description: "Selects the visual style.",
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Sets the input’s color theme.",
					},
					{
						name: "type",
						type: "radio",
						defaultValue: "text",
						default: "text",
						label: "Type",
						values: ["text", "email", "password", "search"],
						description: "Chooses the native input type.",
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						values: ["tiny", "small", "medium", "large"],
						description: "Adjusts the input’s scale.",
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "tiny",
						default: "tiny",
						label: "Radius",
						values: ["none", "tiny", "small", "medium", "large", "full"],
						description: "Controls corner roundness.",
					},
					{
						name: "floatingLabel",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Floating Label",
						description: "Enables the floating label effect.",
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Error Message",
						description: "Custom message shown when invalid.",
					},
					{
						name: "helperText",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Helper Text",
						description: "Adds supporting text below the input.",
					},
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Invalid",
						description: "Marks the input as invalid.",
					},
					{
						name: "prefix",
						type: "checkbox",
						defaultValue: false,
						default: <Mail />,
						label: "Prefix",
						description: "Adds an element before the value.",
					},
					{
						name: "suffix",
						type: "checkbox",
						defaultValue: false,
						default: <Text />,
						label: "Suffix",
						description: "Adds an element after the value.",
					},
					{
						name: "required",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Required",
						description: "Marks the field as mandatory.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Makes the input non-interactive.",
					},
				]}
				componentRef={refInput}
			>
				<Input ref={refInput} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Input } from "lambda-ui-components";\n\n<Input />`}
			/>

			<PropertyLayout
				title="Controlled"
				id="controlled"
				description="Allows you to manage the input value from the parent component state (controlled use)."
				propertyName="value"
				code={`import { Input } from "lambda-ui-components";
import { useState } from "react";	

export default function InputControlled() {
	const [value, setValue] = useState("");

	return (
		<form>
			<Input 
				label="Text" 
				helperText="Helper text" 
				value={value} 
				onChangeValue={(newValue) => setValue(newValue)} 
			/>
		</form>
	);
} `}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input
						label="Text"
						helperText="Helper text"
						value={value}
						onChangeValue={(newValue) => setValue(newValue)}
					/>
				</form>
			</PropertyLayout>
		</>
	);
};
