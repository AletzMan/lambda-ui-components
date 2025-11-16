"use client";

import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Button, Checkbox, Dropdown, Input, InputNumber, Join, Select } from "lambda-ui-components";
import { useRef, useState } from "react";
import { BellIcon, SettingsIcon, UserIcon } from "lucide-react";

export const JoinFeatures = () => {
	// ref para el dropzone / button wrapper
	const refInput = useRef<HTMLDivElement>(null);

	// estado controlado de archivos
	const [value, setValue] = useState<number>(0);

	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5">
			{/* PLAYGROUND */}
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Join"
				childrenComponentsNames={[
					"Checkbox label='Checkbox'",
					`Select \n\t\tplaceholder='Select example' \n\t\tlabel='Select' \n\t\toptions={[\n\t\t\t{ value: 'Option 1', label: 'Option 1' }, \n\t\t\t{ value: 'Option 2', label: 'Option 2' }, \n\t\t\t{ value: 'Option 3', label: 'Option 3' }\n\t\t]}`,
					"Input label='Input'",
					"Button label='Button'",
				]}
				description="Experiment with all the properties of the Join component in real time."
				propConfigs={[
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
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
					},
				]}
				componentRef={refInput}
			>
				<Join ref={refInput}>
					<Checkbox label="Checkbox" />
					<Select
						placeholder="Select example"
						label="Select"
						options={[
							{ value: "Option 1", label: "Option 1" },
							{ value: "Option 2", label: "Option 2" },
							{ value: "Option 3", label: "Option 3" },
						]}
					/>
					<Input label="Input" />
					<Button label="Button" />
				</Join>
			</PlaygroundLayout>

			{/* USAGE */}
			<PropertyLayout
				title="Usage"
				id="usage"
				description={
					<>
						The <code>children</code> property of the component{" "}
						<strong>
							<code>Join</code>
						</strong>{" "}
						defines the <strong>interactive content</strong> that will be visually grouped into a
						single segmented unit. This property accepts one or more components, which are typically
						form elements or action controls such as <code>Input</code>, <code>Select</code>,{" "}
						<code>InputNumber</code>, <code>Checkbox</code>, <code>Button</code>, and{" "}
						<code>Dropdown</code>. <code>Join</code> modifies the styles of its children to
						eliminate borders and spacing between them, achieving a cohesive and compound control
						appearance, ideal for creating search bars or toggle button groups.
					</>
				}
				code={`import { InputNumber } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState<number>(0);

	return (
		<form className="flex flex-col gap-4">
			<Join>
				<InputNumber value={value} onChangeValue={setValue} />
			</Join>
		</form>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<Join>
						<InputNumber />
					</Join>
				</form>
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
		<Join size="tiny">
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>
		<Join size="small">
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>
		<Join size="medium">
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>		
		<Join size="large">
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>		
	</form>
);}`}
			>
				<div className="flex flex-col gap-10 px-6 py-6">
					<Join size="tiny">
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
					<Join size="small">
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
					<Join size="medium">
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
					<Join size="large">
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
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
		<Join radius="tiny">
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>
		<Join radius="small">
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>
		<Join>
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>		
		<Join radius="large">
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>	 
		<Join radius="full">
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>
	</form>
);}`}
			>
				<div className="flex flex-col gap-10 px-6 py-6">
					<Join radius="tiny">
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
					<Join radius="small">
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
					<Join>
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
					<Join radius="large">
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
					<Join radius="full">
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
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
		<Join disabled>
			<Checkbox label="Checkbox" />
			<InputNumber label="InputNumber" />
			<Input label="Input" />
			<Button label="Button" />
		</Join>								
	</form>
);}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6">
					<Join disabled>
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
						<Input label="Input" />
						<Button label="Button" />
					</Join>
				</div>
			</PropertyLayout>
		</div>
	);
};
