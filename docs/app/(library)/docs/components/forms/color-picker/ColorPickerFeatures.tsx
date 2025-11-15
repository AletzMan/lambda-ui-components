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
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						values: ["solid", "soft"],
					},
					{
						name: "format",
						type: "radio",
						defaultValue: "hex",
						default: "hex",
						label: "Format",
						values: ["hex", "rgb", "rgba", "hsl", "hsla"],
					},
					{
						name: "showText",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show Text",
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
				<ColorPicker ref={refInput} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { ColorPicker } from "lambda-ui-components";\n\n<ColorPicker />`}
			/>
			<PropertyLayout
				title="Variants"
				description="Controls the visual style of the color picker, such as the border color or background color."
				propertyName="variant"
				id="variants"
				code={`import { ColorPicker } from "lambda-ui-components";\n\n<ColorPicker />\n<ColorPicker variant="soft" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<ColorPicker />
					<ColorPicker variant="soft" />
				</div>
			</PropertyLayout>
			<PropertyLayout
				title="Sizes"
				description="Adjusts the visual size of the color picker by modifying its height, padding, and text size."
				id="sizes"
				propertyName="size"
				code={`import { ColorPicker } from "lambda-ui-components";\n\n<ColorPicker size="tiny" />\n<ColorPicker size="small" />\n<ColorPicker />\n<ColorPicker size="large" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<ColorPicker size="tiny" />
					<ColorPicker size="small" />
					<ColorPicker />
					<ColorPicker size="large" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Format"
				id="format"
				description="Controls the format of the color picker, such as the border color or background color."
				propertyName="format"
				code={`import { ColorPicker } from "lambda-ui-components";\n\n<ColorPicker  />\n<ColorPicker format="rgb" />\n<ColorPicker format="rgba" />\n<ColorPicker format="hsl" />\n<ColorPicker format="hsla" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<ColorPicker />
					<ColorPicker format="rgb" />
					<ColorPicker format="rgba" />
					<ColorPicker format="hsl" />
					<ColorPicker format="hsla" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Show Text"
				id="showText"
				description="Controls the visibility of the text input field."
				propertyName="showText"
				code={`import { ColorPicker } from "lambda-ui-components";\n\n<ColorPicker showText />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<ColorPicker showText />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Makes the color picker non-interactive and visually indicates a disabled state.."
				propertyName="disabled"
				code={`import { ColorPicker } from "lambda-ui-components";\n\n<ColorPicker disabled />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<ColorPicker disabled />
				</form>
			</PropertyLayout>

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
