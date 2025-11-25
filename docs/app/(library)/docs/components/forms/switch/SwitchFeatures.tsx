"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Select, Slider, Switch } from "lambda-ui-components";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";



export const SwitchFeatures = () => {
	const refSelect = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState(false);

	return (
		<>
			<PlaygroundLayout<HTMLInputElement>
				id="playground"
				title="Playground"
				componentName="Switch"
				description="Experiment with all the properties of the Switch component in real time."
				propConfigs={[
					{
						name: "label",
						type: "string",
						defaultValue: "",
						default: "",
						label: "Label",
						description: "Optional text label for the switch."
					},
					{
						name: "positionLabel",
						type: "select",
						defaultValue: "right",
						default: "right",
						label: "Position Label",
						description: "Controls the position of the label relative to the switch.",
						values: ["left", "right", "top", "bottom"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Controls the overall switch size.",
						values: ["tiny", "small", "medium", "large"],
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
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						description: "Defines the visual style of the switch.",
						values: ["solid", "soft", "outline"],
					},
					{
						name: "shape",
						type: "radio",
						defaultValue: "rounded",
						default: "rounded",
						label: "Shape",
						description: "Defines the shape of the switch.",
						values: ["square", "subtle", "rounded"],
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables user interaction with the switch.",
					},
				]}
				componentRef={refSelect}
			>
				<Switch ref={refSelect} checked={value} onCheckedChange={(value) => setValue(value as boolean)} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Switch } from "lambda-ui-components";


export default function App() {
	return (
		<Switch  />
	);
}`}
			/>

			<PropertyLayout
				title="Controlled"
				id="controlled"
				description="Controls the value of the switch."
				propertyName="value"
				code={`import { Switch } from "lambda-ui-components";
import { useState } from "react";	

export default function SwitchControlled() {
	const [value, setValue] = useState(false);
	return ( 
			<Switch  
				label="Text"   
				checked={value} 
				onCheckedChange={(newValue) => setValue(newValue)} 
			/>`}


			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Switch
						label="Text"
						checked={value}
						onCheckedChange={(newValue) => setValue(newValue)}
					/>
				</form>
			</PropertyLayout>
		</>
	);
};
