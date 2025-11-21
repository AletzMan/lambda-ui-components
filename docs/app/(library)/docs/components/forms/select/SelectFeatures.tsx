"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Select } from "lambda-ui-components";
import { Mail, Search, User } from "lucide-react";
import { useRef, useState } from "react";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export const SelectFeatures = () => {
	const refSelect = useRef<HTMLDivElement>(null);
	const [value, setValue] = useState("");
	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Select"
				description="Experiment with all the properties of the Select component in real time."
				propConfigs={[
					{
						name: "placeholder",
						type: "string",
						defaultValue: "Placeholder",
						default: "",
						label: "Placeholder",
					},
					{ name: "label", type: "string", defaultValue: "Label", default: "", label: "Label" },
					{
						name: "variant",
						type: "radio",
						defaultValue: "outline",
						default: "outline",
						label: "Variant",
						values: ["outline", "soft"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "tiny",
						default: "tiny",
						label: "Radius",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Error Message",
					},
					/*{
						name: "helperText",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Helper Text",
					},*/
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Invalid",
					},
					{
						name: "required",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Required",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
					},
				]}
				componentRef={refSelect}
			>
				<Select ref={refSelect} options={options} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Select } from "lambda-ui-components";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<Select options={options} />
	);
}`}
			/>
			<PropertyLayout
				title="Variants"
				description="Defines the visual style of the input, such as a outlined border or a slightly highlighted soft background."
				propertyName="variant"
				id="variants"
				code={`import { Select } from "lambda-ui-components";
					
const options = [
				{ value: "react", label: "React" },
				{ value: "next", label: "Next" },
				{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<Select placeholder="Outline" options={options} />
		<Select variant="soft" placeholder="Soft" options={options} />
	);
}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Select placeholder="Outline" options={options} />
					<Select variant="soft" placeholder="Soft" options={options} />
				</div>
			</PropertyLayout>
			<PropertyLayout
				title="Sizes"
				description="Adjust the scale of the input by modifying its height, internal spacing, and font size."
				id="sizes"
				propertyName="size"
				code={`import { Select } from "lambda-ui-components";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<form className="flex flex-col gap-4 px-6">
			<Select size="tiny" placeholder="Tiny" options={options} />
			<Select size="small" placeholder="Small" options={options} />
			<Select placeholder="Medium" options={options} />
			<Select size="large" placeholder="Large" options={options} />
		</form>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6">
					<Select size="tiny" placeholder="Tiny" options={options} />
					<Select size="small" placeholder="Small" options={options} />
					<Select placeholder="Medium" options={options} />
					<Select size="large" placeholder="Large" options={options} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Radius"
				id="radius"
				propertyName="radius"
				description="Controls the level of rounding on the corners of the input, from straight edges to a fully pill style."
				code={`import { Select } from "lambda-ui-components";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<form className="flex flex-col gap-4 px-6">
			<Select radius="none" placeholder="None" options={options} />
			<Select placeholder="Tiny" options={options} />
			<Select radius="small" placeholder="Small" options={options} />
			<Select radius="medium" placeholder="Medium" options={options} />
			<Select radius="large" placeholder="Large" options={options} />
			<Select radius="full" placeholder="Full" options={options} />
		</form>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select radius="none" placeholder="None" options={options} />
					<Select placeholder="Tiny" options={options} />
					<Select radius="small" placeholder="Small" options={options} />
					<Select radius="medium" placeholder="Medium" options={options} />
					<Select radius="large" placeholder="Large" options={options} />
					<Select radius="full" placeholder="Full" options={options} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Disables the input and applies a visual style that indicates it cannot be interacted with."
				propertyName="disabled"
				code={`import { Select } from "lambda-ui-components";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<Select placeholder="Disabled" disabled options={options} />
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select placeholder="Disabled" disabled options={options} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Whit Label"
				id="whit-label"
				description="Add descriptive text that identifies the purpose of the field."
				propertyName="label"
				code={`import { Select } from "lambda-ui-components";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<Select label="Label" placeholder="Label" options={options} />
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select label="Label" placeholder="Label" options={options} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Required"
				id="required"
				description="Indicates that the field is mandatory and must be completed before submitting a form."
				propertyName="required"
				code={`import { Select } from "lambda-ui-components";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<Select label="Text" required options={options} />
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select label="Text" required options={options} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Error Message"
				id="error-message"
				description="Display an error message below the input when the field is in an invalid state."
				propertyName="errorMessage"
				code={`import { Select } from "lambda-ui-components";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<Select 
		    label="Text" 
		    required 
		    errorMessage="Error message" 
		    invalid={true} 
		    options={options} />
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select label="Text" required errorMessage="Error message" invalid={true} options={options} />
				</form>
			</PropertyLayout>

		 <PropertyLayout
				title="Helper Text"
				id="helper-text"
				description="Provides additional or clarifying information below the input to guide the user."
				propertyName="helperText"
				code={`import { Select } from "lambda-ui-components";

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function App() {
	return (
		<Select 
		    label="Text" 
		    helperText="Helper text" 
		    options={options} />
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select label="Text" helperText="Helper text" options={options} />
				</form>
			</PropertyLayout> 

			<PropertyLayout
				title="Controlled"
				id="controlled"
				description="Allows you to manage the input value from the parent component state (controlled use)."
				propertyName="value"
				code={`import { Select } from "lambda-ui-components";
import { useState } from "react";	

export default function SelectControlled() {
	const [value, setValue] = useState("");
	return (
		<form>
			<Select 
				label="Text" 
				helperText="Helper text" 
				value={value} 
				onChange={(newValue) => setValue(newValue)} 
				options={options} />
		</form>
	);
} `}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select
						label="Text"
						value={value}
						onChange={(newValue) => setValue(newValue || "")}
						options={[]}
					/>
				</form>
			</PropertyLayout>
		</div>
	);
};
