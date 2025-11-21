"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Select } from "lambda-ui-components";
import { Mail, Search, User } from "lucide-react";
import { useRef, useState } from "react";

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
				<Select ref={refSelect} options={[]} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Input } from "lambda-ui-components";\n\n<Input />`}
			/>
			<PropertyLayout
				title="Variants"
				description="Defines the visual style of the input, such as a outlined border or a slightly highlighted soft background."
				propertyName="variant"
				id="variants"
				code={`import { Select } from "lambda-ui-components";\n\n<Select variant="outline" placeholder="Outline" options={[]} />\n<Select variant="soft" placeholder="Soft" options={[]} />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Select variant="outline" placeholder="Outline" options={[]} />
					<Select variant="soft" placeholder="Soft" options={[]} />
				</div>
			</PropertyLayout>
			<PropertyLayout
				title="Sizes"
				description="Adjust the scale of the input by modifying its height, internal spacing, and font size."
				id="sizes"
				propertyName="size"
				code={`import { Select } from "lambda-ui-components";\n\n<Select size="tiny" placeholder="Tiny" options={[]} />\n<Select size="small" placeholder="Small" options={[]} />\n<Select size="medium" placeholder="Medium" options={[]} />\n<Select size="large" placeholder="Large" options={[]} />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Select size="tiny" placeholder="Tiny" options={[]} />
					<Select size="small" placeholder="Small" options={[]} />
					<Select size="medium" placeholder="Medium" options={[]} />
					<Select size="large" placeholder="Large" options={[]} />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Radius"
				id="radius"
				propertyName="radius"
				description="Controls the level of rounding on the corners of the input, from straight edges to a fully pill style."
				code={`import { Select } from "lambda-ui-components";\n\n<Select radius="none" placeholder="None" options={[]} />\n<Select radius="tiny" placeholder="Tiny" options={[]} />\n<Select radius="small" placeholder="Small" options={[]} />\n<Select radius="medium" placeholder="Medium" options={[]} />\n<Select radius="large" placeholder="Large" options={[]} />\n<Select radius="full" placeholder="Full" options={[]} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select radius="none" placeholder="None" options={[]} />
					<Select radius="tiny" placeholder="Tiny" options={[]} />
					<Select radius="small" placeholder="Small" options={[]} />
					<Select radius="medium" placeholder="Medium" options={[]} />
					<Select radius="large" placeholder="Large" options={[]} />
					<Select radius="full" placeholder="Full" options={[]} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Disables the input and applies a visual style that indicates it cannot be interacted with."
				propertyName="disabled"
				code={`import { Select } from "lambda-ui-components";\n\n<Select placeholder="Disabled" disabled options={[]} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select placeholder="Disabled" disabled options={[]} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Whit Label"
				id="whit-label"
				description="Add descriptive text that identifies the purpose of the field."
				propertyName="label"
				code={`import { Select } from "lambda-ui-components";\n\n<Select label="Label" placeholder="Label" options={[]} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select label="Label" placeholder="Label" options={[]} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Required"
				id="required"
				description="Indicates that the field is mandatory and must be completed before submitting a form."
				propertyName="required"
				code={`import { Select } from "lambda-ui-components";\n\n<Select label="Text" required options={[]} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select label="Text" required options={[]} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Error Message"
				id="error-message"
				description="Display an error message below the input when the field is in an invalid state."
				propertyName="errorMessage"
				code={`import { Select } from "lambda-ui-components";\n\n<Select label="Text" required errorMessage="Error message" invalid={true} options={[]} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select label="Text" required errorMessage="Error message" invalid={true} options={[]} />
				</form>
			</PropertyLayout>

			{/*<PropertyLayout
				title="Helper Text"
				id="helper-text"
				description="Provides additional or clarifying information below the input to guide the user."
				propertyName="helperText"
				code={`import { Select } from "lambda-ui-components";\n\n<Select label="Text" helperText="Helper text" options={[]} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Select label="Text" helperText="Helper text" options={[]} />
				</form>
			</PropertyLayout>*/}

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
			<Select label="Text" helperText="Helper text" value={value} onChange={(newValue) => setValue(newValue)} options={[]} />
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
