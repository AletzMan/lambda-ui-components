"use client";
import PropertyLayout from "../../components/PropertyLayout";
import { PlaygroundLayout } from "../../components/PlaygroundLayout";
import { Checkbox } from "lambda-ui-components";
import { useRef, useState } from "react";
import { Star } from "lucide-react";

export const CheckboxFeatures = () => {
	const refInput = useRef<HTMLInputElement>(null);
	const [checked, setChecked] = useState(false);
	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLInputElement>
				id="playground"
				title="Playground"
				componentName="Checkbox"
				description="Experiment with all the properties of the Checkbox component in real time."
				propConfigs={[
					{
						name: "label",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Label",
						description: "Sets the text shown next to the control.",
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						values: ["solid", "outline", "soft"],
						description: "Changes the visual style.",
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						values: ["neutral", "primary", "secondary", "success", "danger", "warning", "info"],
						description: "Sets the color theme.",
					},
					{
						name: "positionLabel",
						type: "radio",
						defaultValue: "right",
						default: "right",
						label: "Position Label",
						values: ["left", "right", "top", "bottom"],
						description: "Adjusts the label position.",
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						values: ["tiny", "small", "medium", "large"],
						description: "Adjusts the overall size.",
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
						description: "Indicates that selection is required.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Prevents user interaction.",
					},

				]}
				componentRef={refInput}
			>
				<Checkbox ref={refInput} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox />`}
			/>

			<PropertyLayout
				title="Custom Icon"
				id="custom-icon"
				description="Custom icon when the checkbox is checked."
				propertyName="icon"
				code={`import { Checkbox } from "lambda-ui-components";\nimport { Star } from "lucide-react";\n\n<Checkbox label="Custom Icon" icon={<Star />} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox label="Custom Icon" icon={<Star />} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Controlled"
				id="controlled"
				description="Use this when you need to control the checked state of the checkbox."
				propertyName=""
				code={`import { Checkbox } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [checked, setChecked] = useState(false);\n\n\treturn (\n\t\t<Checkbox label="Controlled" checked={checked} onCheckedChange={setChecked} />\n\t);\n}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox label="Controlled" checked={checked} onCheckedChange={setChecked} />
				</form>
			</PropertyLayout>
		</div>
	);
};
