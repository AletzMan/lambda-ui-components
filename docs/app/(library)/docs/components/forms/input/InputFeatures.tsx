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
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLInputElement>
				id="playground"
				title="Playground"
				componentName="Input"
				description="Experiment with all the properties of the Input component in real time."
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
						name: "type",
						type: "radio",
						defaultValue: "text",
						default: "text",
						label: "Type",
						values: ["text", "email", "password", "search"],
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
						name: "floatingLabel",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Floating Label",
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Error Message",
					},
					{
						name: "helperText",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Helper Text",
					},
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Invalid",
					},
					{
						name: "prefix",
						type: "checkbox",
						defaultValue: <Search />,
						default: <Search />,
						label: "Prefix",
					},
					{
						name: "suffix",
						type: "checkbox",
						defaultValue: <Mail />,
						default: <Mail />,
						label: "Suffix",
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
				title="Variants"
				description="Defines the visual style of the input, such as a outlined border or a slightly highlighted soft background."
				propertyName="variant"
				id="variants"
				code={`import { Input } from "lambda-ui-components";\n\n<Input variant="outline" placeholder="Outline" />\n<Input variant="soft" placeholder="Soft" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Input variant="outline" placeholder="Outline" />
					<Input variant="soft" placeholder="Soft" />
				</div>
			</PropertyLayout>
			<PropertyLayout
				title="Sizes"
				description="Adjust the scale of the input by modifying its height, internal spacing, and font size."
				id="sizes"
				propertyName="size"
				code={`import { Input } from "lambda-ui-components";\n\n<Input size="tiny" placeholder="Tiny" />\n<Input size="small" placeholder="Small" />\n<Input size="medium" placeholder="Medium" />\n<Input size="large" placeholder="Large" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Input size="tiny" placeholder="Tiny" />
					<Input size="small" placeholder="Small" />
					<Input size="medium" placeholder="Medium" />
					<Input size="large" placeholder="Large" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Radius"
				id="radius"
				propertyName="radius"
				description="Controls the level of rounding on the corners of the input, from straight edges to a fully pill style."
				code={`import { Input } from "lambda-ui-components";\n\n<Input radius="none" placeholder="None" />\n<Input radius="tiny" placeholder="Tiny" />\n<Input radius="small" placeholder="Small" />\n<Input radius="medium" placeholder="Medium" />\n<Input radius="large" placeholder="Large" />\n<Input radius="full" placeholder="Full" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input radius="none" placeholder="None" />
					<Input radius="tiny" placeholder="Tiny" />
					<Input radius="small" placeholder="Small" />
					<Input radius="medium" placeholder="Medium" />
					<Input radius="large" placeholder="Large" />
					<Input radius="full" placeholder="Full" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Type"
				id="type"
				description="Specifies the native HTML input type, such as text, password, email, or search."
				propertyName="type"
				code={`import { Input } from "lambda-ui-components";\n\n<Input type="text" placeholder="Text" />\n<Input type="email" placeholder="Email" />\n<Input type="password" placeholder="Password" />\n<Input type="search" placeholder="Search" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input type="text" placeholder="Text" />
					<Input type="email" placeholder="Email" />
					<Input type="password" placeholder="Password" autoComplete="current-password" />
					<Input type="search" placeholder="Search" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Disables the input and applies a visual style that indicates it cannot be interacted with."
				propertyName="disabled"
				code={`import { Input } from "lambda-ui-components";\n\n<Input placeholder="Disabled" disabled />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input placeholder="Disabled" disabled />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Whit Label"
				id="whit-label"
				description="Add descriptive text that identifies the purpose of the field."
				propertyName="label"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Label" placeholder="Label" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Label" placeholder="Label" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Floating Label"
				id="floating-label"
				description="Triggers an animation where the label floats and shrinks when the input is focused or has content."
				propertyName="floatingLabel"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Label" floatingLabel />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Label" floatingLabel />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Prefix"
				id="prefix"
				description="Displays an element before the input value, such as contextual text or a decorative icon."
				propertyName="prefix"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="With Text" prefix="https://" placeholder="www.example.com" />\n<Input label="With Icon" prefix={<Mail />} placeholder="example@gmail.com" type="email" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="With Text" prefix="https://" placeholder="www.example.com" />
					<Input label="With Icon" prefix={<Mail />} placeholder="example@gmail.com" type="email" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Suffix"
				id="suffix"
				description="Displays an element after the input value, useful for icons, units, domains, or other add-ons."
				propertyName="suffix"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="With Text" suffix=".com" placeholder="www.example.com" />\n<Input label="With Icon" suffix={<Settings />} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="With Text" suffix=".com" placeholder="www.example.com" />
					<Input label="With Icon" suffix={<User />} placeholder="John Doe" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Required"
				id="required"
				description="Indicates that the field is mandatory and must be completed before submitting a form."
				propertyName="required"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Text" required />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Text" required />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Error Message"
				id="error-message"
				description="Display an error message below the input when the field is in an invalid state."
				propertyName="errorMessage"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Text" required errorMessage="Error message" invalid={true} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Text" required errorMessage="Error message" invalid={true} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Helper Text"
				id="helper-text"
				description="Provides additional or clarifying information below the input to guide the user."
				propertyName="helperText"
				code={`import { Input } from "lambda-ui-components";\n\n<Input label="Text" helperText="Helper text" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Input label="Text" helperText="Helper text" />
				</form>
			</PropertyLayout>

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
			<Input label="Text" helperText="Helper text" value={value} onChange={(newValue) => setValue(newValue)} />
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
		</div>
	);
};
