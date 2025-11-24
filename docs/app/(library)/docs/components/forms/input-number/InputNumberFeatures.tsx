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
		<>
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
						label: "Type Number",
						values: ["default", "currency-USD", "currency-EUR", "currency-GBP", "percentage", "decimal"],
						description: "Applies a numeric formatting style.",
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						label: "Size",
						values: ["tiny", "small", "medium", "large"],
						description: "Adjusts the input’s overall size.",
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "tiny",
						label: "Radius",
						values: ["none", "tiny", "small", "medium", "large", "full"],
						description: "Adjusts the corner roundness.",
					},
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						label: "Invalid",
						description: "Shows the input in an error state.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						label: "Disabled",
						description: "Makes the input non-interactive.",
					},
					{
						name: "min",
						type: "number",
						defaultValue: 0,
						label: "Min",
						description: "Sets the minimum allowed value.",
					},
					{
						name: "max",
						type: "number",
						defaultValue: 100,
						label: "Max",
						description: "Sets the maximum allowed value.",
					},
					{
						name: "label",
						type: "string",
						defaultValue: undefined,
						label: "Label",
						description: "Defines the input label.",
					},
					{
						name: "helperText",
						type: "string",
						defaultValue: undefined,
						label: "Helper Text",
						description: "Adds supportive text below the input.",
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: undefined,
						label: "Error Message",
						description: "Custom error message to display when invalid.",
					},
					{
						name: "step",
						type: "number",
						defaultValue: 1,
						label: "Step",
						description: "Configures the increment value.",
					},
					{
						name: "required",
						type: "boolean",
						defaultValue: false,
						label: "Required",
						description: "Marks the input as mandatory.",
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
		</>
	);
};
