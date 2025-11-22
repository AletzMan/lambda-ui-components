"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Select, Slider,  } from "lambda-ui-components";
import { useRef, useState } from "react";

 

export const SliderFeatures = () => {
	const refSelect = useRef<HTMLDivElement>(null);
	const [value, setValue] = useState(50);
	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Slider"
				description="Experiment with all the properties of the Slider component in real time."
				propConfigs={[ 
					{ name: "label", type: "string", defaultValue: "Label", default: "", label: "Label" },
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
						name: "step",
						type: "number",
						defaultValue: 1,
						default: 1,
						label: "Step",
					},
					{
						name: "orientation",
						type: "radio",
						defaultValue: "horizontal",
						default: "horizontal",
						label: "Orientation",
						values: ["horizontal", "vertical"],
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
						defaultValue: "full",
						default: "full",
						label: "Radius",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},   
					{
						name: "viewValue",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "View Value",
					},
					{
						name: "viewBar",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "View Bar",
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
				<Slider ref={refSelect} value={value} onChangeValue={(value) => setValue(value as number)}   />
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
		<Slider value={value} onChangeValue={(value) => setValue(value as number)} />
	);
}`}
			/> 

			<PropertyLayout
				title="Controlled"
				id="controlled"
				description="Controls the value of the slider."
				propertyName="value"
				code={`import { Slider } from "lambda-ui-components";
import { useState } from "react";	

export default function SliderControlled() {
	const [value, setValue] = useState("");
	return ( 
			<Slider  
				label="Text"   
				value={value} 
				onChangeValue={(newValue) => setValue(newValue)} 
			/>
	);
} `}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Slider
						label="Text"
						value={value}
						onChangeValue={(newValue) => setValue(newValue )} 
					/>
				</form>
			</PropertyLayout>
		</div>
	);
};
