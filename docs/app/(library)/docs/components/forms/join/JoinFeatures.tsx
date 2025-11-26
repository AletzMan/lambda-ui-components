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
		<>
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
						description: "Sets the visual size of the input, adjusting padding and text size.",
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "tiny",
						default: "tiny",
						label: "Radius",
						values: ["none", "tiny", "small", "medium", "large", "full"],
						description: "Sets the visual radius of the input, adjusting border radius.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables the input, making it non-interactive.",
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
				<Dropdown icon={<SettingsIcon />} type="button">
					<Dropdown.Item text="Settings" icon={<SettingsIcon />} />
					<Dropdown.Item text="Notifications" icon={<BellIcon />} />
					<Dropdown.Item text="Profile" icon={<UserIcon />} />
				</Dropdown>
				<Checkbox label="Checkbox" />
				<InputNumber label="InputNumber" />
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
		</form>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<Join>
						<Dropdown icon={<SettingsIcon />} type="button">
							<Dropdown.Item text="Settings" icon={<SettingsIcon />} />
							<Dropdown.Item text="Notifications" icon={<BellIcon />} />
							<Dropdown.Item text="Profile" icon={<UserIcon />} />
						</Dropdown>
						<Checkbox label="Checkbox" />
						<InputNumber label="InputNumber" />
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
				</form>
			</PropertyLayout>
		</>
	);
};
