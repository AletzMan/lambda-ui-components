"use client";

import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { InputNumber } from "lambda-ui-components";
import { useRef, useState } from "react";

export const InputNumberFeatures = () => {
	// ref para el dropzone / button wrapper
	const refInput = useRef<HTMLInputElement>(null);

	// estado controlado de archivos
	const [value, setValue] = useState<number>(0);

	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5">
			{/* PLAYGROUND */}
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="InputNumber"
				description="Experiment with all the properties of the InputNumber component in real time."
				propConfigs={[
					{
						name: "typeNumber",
						type: "radio",
						defaultValue: "default",
						default: "default",
						label: "Type Number",
						values: [
							"default",
							"currency-USD",
							"currency-EUR",
							"currency-GBP",
							"percentage",
							"decimal",
						],
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
					{
						name: "min",
						type: "number",
						defaultValue: 0,
						default: 0,
						label: "Min",
					},
					{
						name: "max",
						type: "number",
						defaultValue: 100,
						default: 100,
						label: "Max",
					},
					{
						name: "label",
						type: "string",
						defaultValue: "Label",
						default: "",
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
						name: "step",
						type: "number",
						defaultValue: 1,
						default: 1,
						label: "Step",
					},
					{
						name: "required",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Required",
					},
				]}
				componentRef={refInput}
			>
				<InputNumber ref={refInput} />
			</PlaygroundLayout>

			{/* USAGE */}
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { InputNumber } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState<number>(0);

	return (
		<form className="flex flex-col gap-4">
			<InputNumber value={value} onChangeValue={setValue} />
		</form>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<InputNumber />
				</form>
			</PropertyLayout>

			{/* VARIANTS */}
			<PropertyLayout
				title="Variants"
				id="variant"
				propertyName="variant"
				description="Controls the visual style of the numeric input, such as border color or background."
				code={`import { InputNumber } from "lambda-ui-components";
					
export default function App() {
					
	return (
		<form className="flex flex-col gap-4">
			<InputNumber label="Outlined"/>
			<InputNumber variant="soft" label="Soft"/>
		</form>
	);	
}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber label="Outlined" />
					<InputNumber variant="soft" label="Soft" />
				</div>
			</PropertyLayout>

			{/* SIZE */}
			<PropertyLayout
				title="Sizes"
				id="size"
				description="Sets the visual size of the input, adjusting padding and text size."
				propertyName="size"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() { 

return (
	<form className="flex flex-col gap-4">
		<InputNumber size="tiny" label="Tiny" />
		<InputNumber size="small" label="Small" />
		<InputNumber label="Medium" />
		<InputNumber size="large" label="Large" /> 
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber size="tiny" label="Tiny" />
					<InputNumber size="small" label="Small" />
					<InputNumber label="Medium" />
					<InputNumber size="large" label="Large" />
				</div>
			</PropertyLayout>

			{/* RADIUS */}
			<PropertyLayout
				title="Radius"
				id="radius"
				description="Enables an error or invalid visual state, typically changing the border color to red."
				propertyName="radius"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() { 

return (
	<form className="flex flex-col gap-4">
		<InputNumber label="Tiny" />
		<InputNumber radius="small" label="Small" />
		<InputNumber radius="medium" label="Medium" />
		<InputNumber radius="large" label="Large" /> 
		<InputNumber radius="full" label="Full" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber label="Tiny" />
					<InputNumber radius="small" label="Small" />
					<InputNumber radius="medium" label="Medium" />
					<InputNumber radius="large" label="Large" />
					<InputNumber radius="full" label="Full" />
				</div>
			</PropertyLayout>

			{/* TYPE NUMBER */}
			<PropertyLayout
				title="Type Number"
				id="typeNumber"
				propertyName="typeNumber"
				description="Defines an internal subtype or variation of the numeric input component."
				code={`import { InputNumber } from "lambda-ui-components";
					
export default function App() {
					
	return (
		<form className="flex flex-col gap-4">
			<InputNumber label="Default" />
			<InputNumber label="Currency USD" typeNumber="currency-USD" />
			<InputNumber label="Currency EUR" typeNumber="currency-EUR" />
			<InputNumber label="Currency GBP" typeNumber="currency-GBP" />
			<InputNumber label="Percentage" typeNumber="percentage" />
			<InputNumber label="Decimal" typeNumber="decimal" />
		</form>
	);	
}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber label="Default" />
					<InputNumber label="Currency USD" typeNumber="currency-USD" />
					<InputNumber label="Currency EUR" typeNumber="currency-EUR" />
					<InputNumber label="Currency GBP" typeNumber="currency-GBP" />
					<InputNumber label="Percentage" typeNumber="percentage" />
					<InputNumber label="Decimal" typeNumber="decimal" />
				</div>
			</PropertyLayout>

			{/* MIN */}
			<PropertyLayout
				title="Min"
				id="min"
				description="Specifies the minimum numeric value the user is allowed to enter."
				propertyName="min"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
		<InputNumber min={0} label="Min" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber min={0} label="Min" />
				</div>
			</PropertyLayout>

			{/* MAX */}
			<PropertyLayout
				title="Max"
				id="max"
				description="Specifies the maximum numeric value the user is allowed to enter."
				propertyName="max"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
		<InputNumber max={100} label="Max" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber max={100} label="Max" />
				</div>
			</PropertyLayout>

			{/* STEP */}
			<PropertyLayout
				title="Step"
				id="step"
				description="Determines the increment by which the value changes when using step controls"
				propertyName="step"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
		<InputNumber step={10} label="Step" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber step={10} label="Step" />
				</div>
			</PropertyLayout>

			{/* LABEL */}
			<PropertyLayout
				title="Label"
				id="label"
				description="A visible text label that describes the purpose of the numeric input."
				propertyName="label"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
		<InputNumber label="Label" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber label="Label" />
				</div>
			</PropertyLayout>

			{/* INVALID */}
			<PropertyLayout
				title="Invalid"
				id="invalid"
				description="Shows error styling."
				propertyName="invalid"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
		<InputNumber invalid label="Invalid State" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber invalid label="Invalid State" />
				</div>
			</PropertyLayout>

			{/* ERROR MESSAGE */}
			<PropertyLayout
				title="Error Message"
				id="errorMessage"
				description="A message displayed below the input when it is marked as invalid (`invalid={true}`)"
				propertyName="errorMessage"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
	<InputNumber label="Showing Error Message" errorMessage="Error Message" invalid/>
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber label="Showing Error Message" errorMessage="Error Message" invalid />
				</div>
			</PropertyLayout>

			{/* HELPER TEXT */}
			<PropertyLayout
				title="Helper Text"
				id="helperText"
				description="Displays helper text below the component."
				propertyName="helperText"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
		<InputNumber helperText="Number helper text" label="Helper Text" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber helperText="Number helper text" label="Helper Text" />
				</div>
			</PropertyLayout>

			{/* REQUIRED */}
			<PropertyLayout
				title="Required"
				id="required"
				description="Indicates that the field is required for form submission."
				propertyName="required"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
		<InputNumber required label="Required" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber required label="Required" />
				</div>
			</PropertyLayout>

			{/* DISABLED */}
			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Prevents user interaction."
				propertyName="disabled"
				code={`import { InputNumber } from "lambda-ui-components";

export default function App() {
return (
	<form className="flex flex-col gap-4">
		<InputNumber disabled label="Disabled" />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber disabled label="Disabled" />
				</div>
			</PropertyLayout>

			{/* CONTROLLED */}
			<PropertyLayout
				title="Controlled Component"
				id="controlled"
				description="Control the selected value using value and onChangeValue."
				propertyName="onChangeValue"
				code={`import { useState } from "react";

export default function App() {
const [value, setValue] = useState<number | null>(null);

return (
	<form className="flex flex-col gap-4">
		<InputNumber label="Controlled" value={value} onChangeValue={(value) => setValue(value)} />
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<InputNumber
						label="Controlled"
						value={value}
						onChangeValue={(value) => setValue(value)}
					/>
				</div>
			</PropertyLayout>
		</div>
	);
};
