"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Select } from "lambda-ui-components";
import { useRef, useState } from "react";



export const SelectFeatures = () => {
	const refSelect = useRef<HTMLDivElement>(null);
	const [value, setValue] = useState("");
	return (
		<>
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Select"
				description="Experiment with all the properties of the Select component in real time."
				propConfigs={[
					{
						name: "placeholder",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Placeholder",
						description: "Text shown when no option is selected.",
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
						name: "label",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Label",
						description: "Text displayed above the field.",
					},
					{
						name: "options",
						type: "array-object",
						defaultValue: [
							{
								value: "react",
								label: "React",
								description: "JavaScript framework for building user interfaces.",
								avatar: "https://images.icon-icons.com/2699/PNG/512/reactjs_logo_icon_168875.png",
							},
							{
								value: "next",
								label: "Next",
								description: "JavaScript framework for building server-side rendered applications.",
								avatar: "https://images.icon-icons.com/2148/PNG/512/nextjs_icon_132160.png",
							},
							{
								value: "node",
								label: "Node",
								description: "JavaScript runtime environment.",
								avatar: "https://images.icon-icons.com/2415/PNG/512/nodejs_plain_logo_icon_146409.png",
							},
						],
						default: undefined,
						label: "Options",
						schema: {
							value: "string",
							label: "string",
							description: "string",
							avatar: "string",
						},
						description: "Array of option objects available for selection.",
						isRequired: [true, true, false, false],
						values: [
							{
								value: "react",
								label: "React",
								description: "JavaScript framework for building user interfaces.",
								avatar: "https://images.icon-icons.com/2699/PNG/512/reactjs_logo_icon_168875.png",
							},
							{
								value: "next",
								label: "Next",
								description: "JavaScript framework for building server-side rendered applications.",
								avatar: "https://images.icon-icons.com/2148/PNG/512/nextjs_icon_132160.png",
							},
							{
								value: "node",
								label: "Node",
								description: "JavaScript runtime environment.",
								avatar: "https://images.icon-icons.com/2415/PNG/512/nodejs_plain_logo_icon_146409.png",
							},
						],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "outline",
						default: "outline",
						label: "Variant",
						values: ["outline", "soft", "underline"],
						description: "Defines the visual style, such as border or background emphasis.",
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						values: ["tiny", "small", "medium", "large"],
						description: "Adjusts height and spacing.",
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "tiny",
						default: "tiny",
						label: "Radius",
						values: ["none", "tiny", "small", "medium", "large", "full"],
						description: "Controls corner rounding.",
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Error Message",
						description: "Text shown when the field is invalid.",
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
						name: "required",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Required",
						description: "Indicates that a selection is required.",
					},
					{
						name: "helperText",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Helper Text",
						description: "Additional explanatory text displayed below the field.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Prevents interaction and visually dims the field.",
					},

				]}
				componentRef={refSelect}
			>
				<Select ref={refSelect} options={[]} />
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
				title="Controlled"
				id="controlled"
				description="Allows you to manage the input value from the parent component state (controlled use)."
				propertyName="value"
				code={`import { Select } from "lambda-ui-components";
import { useState } from "react";	

const options = [
	{ value: "react", label: "React" },
	{ value: "next", label: "Next" },
	{ value: "node", label: "Node" },
];

export default function SelectControlled() {
	const [value, setValue] = useState("");
	return (
		<form>
			<Select 
				label="Select" 
				helperText="Select a technology" 
				value={value} 
				onChange={(newValue) => setValue(newValue)} 
				options={options} />
		</form>
	);
} `}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select
						label="Select"
						value={value}
						helperText="Select a technology"
						onChange={(newValue) => setValue(newValue || "")}
						options={[
							{ value: "react", label: "React" },
							{ value: "next", label: "Next" },
							{ value: "node", label: "Node" },
						]}
					/>
				</form>
			</PropertyLayout>
		</>
	);
};
