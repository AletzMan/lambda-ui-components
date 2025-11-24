"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { ColorPicker } from "lambda-ui-components";
import { useRef } from "react";
import { useState } from "react";

export const ColorPickerFeatures = () => {
	const refInput = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState("#000000");
	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLInputElement>
				id="playground"
				title="Playground"
				componentName="ColorPicker"
				description="Experiment with all the properties of the ColorPicker component in real time."
				propConfigs={[
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Adjusts the overall size of the color picker.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						description: "Changes the visual style of the component.",
						values: ["solid", "soft"],
					},
					{
						name: "format",
						type: "radio",
						defaultValue: "hex",
						default: "hex",
						label: "Format",
						description: "Defines the output format of the selected color.",
						values: ["hex", "rgb", "rgba", "hsl", "hsla"],
					},
					{
						name: "showText",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show Text",
						description: "Shows or hides the text input field.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables all interactions.",
					},
				]}
				componentRef={refInput}
			>
				<ColorPicker ref={refInput} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { ColorPicker } from "lambda-ui-components";\n\n<ColorPicker />`}
			/>

			<PropertyLayout
				title="Controlled"
				id="controlled"
				description="Use this when you need to control the checked state of the checkbox."
				propertyName=""
				code={`import { ColorPicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState("#000000");\n\n\treturn (\n\t\t<ColorPicker value={value} onChange={setValue} />\n\t);\n}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<ColorPicker value={value} onChange={setValue} />
				</form>
			</PropertyLayout>
		</div>
	);
};
