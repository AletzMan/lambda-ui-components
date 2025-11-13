"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Checkbox, Input } from "lambda-ui-components";
import { useRef } from "react";
import { Star } from "lucide-react";

export const CheckboxFeatures = () => {
	const refInput = useRef<HTMLInputElement>(null);
	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLInputElement>
				id="playground"
				title="Playground"
				componentName="Checkbox"
				description="Play with the Checkbox component"
				propConfigs={[
					{ name: "label", type: "string", defaultValue: "Label", default: "", label: "Label" },
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						values: ["solid", "outline", "soft"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						values: ["neutral", "primary", "secondary", "success", "danger", "warning", "info"],
					},
					{
						name: "positionLabel",
						type: "radio",
						defaultValue: "right",
						default: "right",
						label: "Position Label",
						values: ["left", "right", "top", "bottom"],
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
						name: "required",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Required",
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
				<Checkbox ref={refInput} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox />`}
			/>

			<PropertyLayout
				title="Variants"
				description="Controls the visual style of the checkbox, such as the border color or background color."
				propertyName="variant"
				id="variants"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox label="Solid" defaultChecked/>\n<Checkbox variant="outline" label="Outline" defaultChecked />\n<Checkbox variant="soft" label="Soft" defaultChecked />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox label="Solid" defaultChecked />
					<Checkbox variant="outline" label="Outline" defaultChecked />
					<Checkbox variant="soft" label="Soft" defaultChecked />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Sizes"
				description="Adjusts the visual size of the input by modifying its height, padding, and text size."
				id="sizes"
				propertyName="size"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox size="tiny" label="Tiny" />\n<Checkbox size="small" label="Small" />\n<Checkbox label="Medium" />\n<Checkbox size="large" label="Large" />`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox size="tiny" label="Tiny" />
					<Checkbox size="small" label="Small" />
					<Checkbox label="Medium" />
					<Checkbox size="large" label="Large" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Radius"
				id="radius"
				propertyName="radius"
				description="Controls the border curvature of the input, defining how rounded the corners appear."
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox radius="none" label="None" />\n<Checkbox label="Tiny" />\n<Checkbox radius="small" label="Small" />\n<Checkbox radius="medium" label="Medium" />\n<Checkbox radius="large" label="Large" />\n<Checkbox radius="full" label="Full" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox radius="none" label="None" />
					<Checkbox label="Tiny" />
					<Checkbox radius="small" label="Small" />
					<Checkbox radius="medium" label="Medium" />
					<Checkbox radius="large" label="Large" />
					<Checkbox radius="full" label="Full" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Colors"
				id="colors"
				description="Controls the color of the checkbox."
				propertyName="color"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox label="Neutral" color="neutral" defaultChecked />\n<Checkbox label="Primary" defaultChecked />\n<Checkbox label="Secondary" color="secondary" defaultChecked />\n<Checkbox label="Success" color="success" defaultChecked />\n<Checkbox label="Danger" color="danger" defaultChecked />\n<Checkbox label="Warning" color="warning" defaultChecked />\n<Checkbox label="Info" color="info" defaultChecked />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<div className="flex flex-col gap-2">
						<Checkbox label="Neutral" color="neutral" defaultChecked />
						<Checkbox label="Primary" defaultChecked />
						<Checkbox label="Secondary" color="secondary" defaultChecked />
						<Checkbox label="Success" color="success" defaultChecked />
						<Checkbox label="Danger" color="danger" defaultChecked />
						<Checkbox label="Warning" color="warning" defaultChecked />
						<Checkbox label="Info" color="info" defaultChecked />
					</div>
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Position Label"
				id="position-label"
				description="Controls the position of the label relative to the input."
				propertyName="positionLabel"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox label="Left" positionLabel="left" />\n<Checkbox label="Right" />\n<Checkbox label="Top" positionLabel="top" />\n<Checkbox label="Bottom" positionLabel="bottom" />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox label="Left" positionLabel="left" />
					<Checkbox label="Right" />
					<Checkbox label="Top" positionLabel="top" />
					<Checkbox label="Bottom" positionLabel="bottom" />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Makes the input non-interactive and visually indicates a disabled state.."
				propertyName="disabled"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox disabled label="Disabled unchecked" />\n<Checkbox disabled label="Disabled checked" defaultChecked />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox disabled label="Disabled unchecked" />
					<Checkbox disabled label="Disabled checked" defaultChecked />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Required"
				id="required"
				description="Marks the field as required for form validation."
				propertyName="required"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox label="Required" required />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox label="Required" required />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Invalid"
				id="invalid"
				description="Marks the field as invalid for form validation."
				propertyName="invalid"
				code={`import { Checkbox } from "lambda-ui-components";\n\n<Checkbox label="Invalid" invalid />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox label="Invalid" invalid />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Custom Icon"
				id="custom-icon"
				description="Marks the field as invalid for form validation."
				propertyName="icon"
				code={`import { Checkbox } from "lambda-ui-components";\nimport { Star } from "lucide-react";\n\n<Checkbox label="Custom Icon" icon={<Star />} />`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<Checkbox label="Custom Icon" icon={<Star />} />
				</form>
			</PropertyLayout>
		</div>
	);
};
