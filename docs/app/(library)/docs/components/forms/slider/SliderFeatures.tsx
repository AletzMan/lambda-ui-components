"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Slider } from "lambda-ui-components";
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
					{ name: "label", 
						type: "string", 
						defaultValue: "Label", 
						default: "", 
						label: "Label", 
						description: "Optional text label for the slider." 
					},
					{
						name: "min",
						type: "number",
						defaultValue: 0,
						default: 0,
						label: "Min",
						description: "The minimum allowed value of the slider.",
					},
					{
						name: "max",
						type: "number",
						defaultValue: 100,
						default: 100,
						label: "Max",
						description: "The maximum allowed value of the slider.",
					},
					{
						name: "step",
						type: "number",
						defaultValue: 1,
						default: 1,
						label: "Step",
						description: "Defines the increment when adjusting the slider.",
					},
					{
						name: "orientation",
						type: "radio",
						defaultValue: "horizontal",
						default: "horizontal",
						label: "Orientation",
						description: "Sets the slider direction.",
						values: ["horizontal", "vertical"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Controls the color of the slider.",
						values: ["primary", "secondary", "success", "danger", "warning", "info", "neutral"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Controls the overall track and thumb size.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "full",
						default: "full",
						label: "Radius",
						description: "Controls the roundness of the track and thumb.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},   
					{
						name: "viewValue",
						type: "boolean-inverted",
						defaultValue: true,
						default: true,
						label: "View Value",
						description: "Shows the current value (e.g., tooltip or display).",
					},
					{
						name: "viewBar",
						type: "boolean-inverted",
						defaultValue: true,
						default: true,
						label: "View Bar",
						description: "Shows the progress bar inside the slider track.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables user interaction with the slider.",
					},
				]}
				componentRef={refSelect}
			>
				<Slider ref={refSelect} value={value} onChangeValue={(value) => setValue(value as number)}   />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Slider } from "lambda-ui-components";


export default function App() {
	return (
		<Slider defaultValue={50}/>
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
	const [value, setValue] = useState(50);
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
