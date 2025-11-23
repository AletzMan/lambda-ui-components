"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout, { PropConfig } from "../../components/PlaygroundLayout";
import { Radio, RadioGroup, RadioGroupProps, Select } from "lambda-ui-components";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const childreComponents = {
	radio: [
		`Radio value="Option1" label="Option 1"`,
		`Radio value="Option2" label="Option 2"`,
		`Radio value="Option3" label="Option 3"`,
		`Radio value="Option4" label="Option 4"`,
	],
	button: [
		`Radio.Button value="Option1" label="Option 1"`,
		`Radio.Button value="Option2" label="Option 2"`,
		`Radio.Button value="Option3" label="Option 3"`,
		`Radio.Button value="Option4" label="Option 4"`,
	],
	card: [
		`Radio.Card value="Option1" title="Option 1" subtitle="Subtitle" body={<div>Body</div>} />`,
		`Radio.Card value="Option2" title="Option 2" subtitle="Subtitle" body={<div>Body</div>} />`,
		`Radio.Card value="Option3" title="Option 3" subtitle="Subtitle" body={<div>Body</div>} />`,
		`Radio.Card value="Option4" title="Option 4" subtitle="Subtitle" body={<div>Body</div>} />`,
	],
};
const componentRadio = {
	radio: (
		<RadioGroup>
			<Radio value="Option1" label="Option 1" />
			<Radio value="Option2" label="Option 2" />
			<Radio value="Option3" label="Option 3" />
			<Radio value="Option4" label="Option 4" />
		</RadioGroup>
	),
	button: (
		<RadioGroup>
			<Radio.Button value="Option1" label="Option 1" />
			<Radio.Button value="Option2" label="Option 2" />
			<Radio.Button value="Option3" label="Option 3" />
			<Radio.Button value="Option4" label="Option 4" />
		</RadioGroup>
	),
	card: (
		<RadioGroup>
			<Radio.Card value="Option1" title="Option 1" subtitle="Subtitle" body={<div>Body</div>} />
			<Radio.Card value="Option2" title="Option 2" subtitle="Subtitle" body={<div>Body</div>} />
			<Radio.Card value="Option3" title="Option 3" subtitle="Subtitle" body={<div>Body</div>} />
			<Radio.Card value="Option4" title="Option 4" subtitle="Subtitle" body={<div>Body</div>} />
		</RadioGroup>
	),
};

const propHideRadio = (typeRadio: "radio" | "button" | "card"): PropConfig =>
	typeRadio === "card"
		? {
				name: "hideRadio",
				type: "boolean",
				defaultValue: false,
				default: false,
				label: "Hide Radio",
		  }
		: { name: "hideRadio", type: "", defaultValue: false, default: false, label: "" };

const propRadius = (typeRadio: "radio" | "button" | "card"): PropConfig =>
	typeRadio === "card" || typeRadio === "button"
		? {
				name: "radius",
				type: "slider",
				defaultValue: "tiny",
				default: "tiny",
				label: "Radius",
				values: ["none", "tiny", "small", "medium", "large", "full"],
		  }
		: { name: "radius", type: "", defaultValue: "", default: "", label: "" };

const getCodeByType = (
	typeRadio: "radio" | "button" | "card",
	props: { key: string; value: string }[],
	controlled?: boolean
): string => {
	if (typeRadio === "radio") {
		return `import { Radio, RadioGroup } from "lambda-ui-components";\n\n
export default function App() {
${controlled ? "const [value, setValue] = useState('');" : ""}

	return (
	<div className="flex flex-col gap-4">
	${Array.from({ length: props.length }, (_, i) => i + 1)
		.map((index) => {
			return `
		<label>${
			props[index - 1]["value"]
				? props[index - 1]["value"].charAt(0).toUpperCase() + props[index - 1]["value"].slice(1)
				: props[index - 1]["key"]
				? props[index - 1]["key"].charAt(0).toUpperCase() + props[index - 1]["key"].slice(1)
				: ""
		}</label>
		<RadioGroup ${props[index - 1]["key"]}${props[index - 1]["key"] !== "" ? '="' : ""}${
				props[index - 1]["key"] !== "" ? props[index - 1]["value"] : ""
			}${props[index - 1]["key"] !== "" ? '"' : ""} ${
				controlled ? "onChangeOption={(value) => setValue(value)} selectedOption={value}" : ""
			}> 
			<Radio value="Option${index}" label="Option ${index}" />
			<Radio value="Option${index + 1}" label="Option ${index + 1}" />
			<Radio value="Option${index + 2}" label="Option ${index + 2}" /> 
		</RadioGroup>`;
		})
		.join("\n")} 

	</div>
	)
};`;
	} else if (typeRadio === "button") {
		return `import { Radio, RadioGroup } from "lambda-ui-components";\n\n
export default function App() {
${controlled ? "const [value, setValue] = useState('');" : ""}	

	return (
	<div className="flex flex-col gap-4">
	${Array.from({ length: props.length }, (_, i) => i + 1)
		.map((index) => {
			return `
		<label>${
			props[index - 1]["value"]
				? props[index - 1]["value"].charAt(0).toUpperCase() + props[index - 1]["value"].slice(1)
				: props[index - 1]["key"]
				? props[index - 1]["key"].charAt(0).toUpperCase() + props[index - 1]["key"].slice(1)
				: ""
		}</label>
		<RadioGroup ${props[index - 1]["key"]}${
				props[index - 1]["key"] !== "" && props[index - 1]["value"] !== "" ? '="' : ""
			}${props[index - 1]["key"] !== "" ? props[index - 1]["value"] : ""}${
				props[index - 1]["key"] !== "" && props[index - 1]["value"] !== "" ? '"' : ""
			}${controlled ? "onChangeOption={(value) => setValue(value)} selectedOption={value}" : ""}> 
			<Radio.Button value="Option1" label="Option 1" />
			<Radio.Button value="Option2" label="Option 2" />
			<Radio.Button value="Option3" label="Option 3" />
		</RadioGroup>`;
		})
		.join("\n")} 

	</div>
	)
};`;
	} else {
		return `import { Radio, RadioGroup } from "lambda-ui-components";\n\n
export default function App() {
${controlled ? "const [value, setValue] = useState('');" : ""}	

	return (
	<div className="flex flex-col gap-4">
	${Array.from({ length: props.length }, (_, i) => i + 1)
		.map((index) => {
			return `
		<label>${
			props[index - 1]["value"]
				? props[index - 1]["value"].charAt(0).toUpperCase() + props[index - 1]["value"].slice(1)
				: props[index - 1]["key"]
				? props[index - 1]["key"].charAt(0).toUpperCase() + props[index - 1]["key"].slice(1)
				: ""
		}</label>
		<RadioGroup ${props[index - 1]["key"]}${
				props[index - 1]["key"] !== "" && props[index - 1]["value"] !== "" ? '="' : ""
			}${props[index - 1]["key"] !== "" ? props[index - 1]["value"] : ""}${
				props[index - 1]["key"] !== "" && props[index - 1]["value"] !== "" ? '"' : ""
			} ${controlled ? "onChangeOption={(value) => setValue(value)} selectedOption={value}" : ""}> 
			<Radio.Card value="Option1" title="Option 1" subtitle="Subtitle" body={<div>Body</div>} />
			<Radio.Card value="Option2" title="Option 2" subtitle="Subtitle" body={<div>Body</div>} />
			<Radio.Card value="Option3" title="Option 3" subtitle="Subtitle" body={<div>Body</div>} />
		</RadioGroup>`;
		})
		.join("\n")} 
		
	</div>
	)
};`;
	}
};

const getComponentByType = (
	typeRadio: "radio" | "button" | "card",
	props: RadioGroupProps[],
	valueProps: string[]
): React.ReactNode => {
	if (typeRadio === "radio") {
		return (
			<>
				{props.map((prop, index) => {
					return (
						<Fragment key={index}>
							<label>{valueProps[index]}</label>
							<RadioGroup {...prop}>
								<Radio value="Option1" label="Option 1" />
								<Radio value="Option2" label="Option 2" />
								<Radio value="Option3" label="Option 3" />
							</RadioGroup>
						</Fragment>
					);
				})}
			</>
		);
	} else if (typeRadio === "button") {
		return (
			<>
				{props.map((prop, index) => {
					return (
						<Fragment key={index}>
							<label>{valueProps[index]}</label>
							<RadioGroup key={index} {...prop}>
								<Radio.Button value="Option1" label="Option 1" />
								<Radio.Button value="Option2" label="Option 2" />
								<Radio.Button value="Option3" label="Option 3" />
							</RadioGroup>
						</Fragment>
					);
				})}
			</>
		);
	} else {
		return (
			<>
				{props.map((prop, index) => {
					return (
						<Fragment key={index}>
							<label>{valueProps[index]}</label>
							<RadioGroup {...prop}>
								<Radio.Card
									value="Option1"
									title="Option 1"
									subtitle="Subtitle"
									body={<div>Body</div>}
								/>
								<Radio.Card
									value="Option2"
									title="Option 2"
									subtitle="Subtitle"
									body={<div>Body</div>}
								/>
								<Radio.Card
									value="Option3"
									title="Option 3"
									subtitle="Subtitle"
									body={<div>Body</div>}
								/>
							</RadioGroup>
						</Fragment>
					);
				})}
			</>
		);
	}
};

export const RadioFeatures = ({ typeRadio }: { typeRadio: "radio" | "button" | "card" }) => {
	const router = useRouter();
	const refInput = useRef<HTMLInputElement>(null);
	const onChangeTypeRadio = (value: "radio" | "button" | "card") => {
		router.push(`?type=${value}`);
	};

	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<div className="flex flex-col items-center gap-2 py-6 border border-dashed border-(--info-base-color)/28 bg-(--info-opacity-color) rounded-sm px-4 mr-3.5">
				<p className="text-md text-(--info-text-color)">
					The component features three primary types: the standard Radio, the segmented
					Radio.Button, and the boxed Radio.Card. Please select one of these variants to access its
					dedicated playground and detailed property configuration.
				</p>
				<Select
					id="type-radio"
					label="Type"
					color="info"
					value={typeRadio}
					onChange={(value) => onChangeTypeRadio(value as "radio" | "button" | "card")}
					options={[
						{ value: "radio", label: "Radio" },
						{ value: "button", label: "Button" },
						{ value: "card", label: "Card" },
					]}
				/>
			</div>
			<PlaygroundLayout<HTMLInputElement>
				id="playground"
				title="Playground"
				componentName="RadioGroup"
				childrenComponentsNames={childreComponents[typeRadio].map((component) => component)} // TODO: Add label
				description="Experiment with all the properties of the Radio component in real time."
				propConfigs={[
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						values: ["solid", "outline", "soft"],
					},
					{
						name: "gap",
						type: "string",
						defaultValue: "8px",
						default: "8px",
						label: "Gap",
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						values: ["neutral", "primary", "secondary", "success", "warning", "danger", "info"],
					},
					{
						name: "orientation",
						type: "radio",
						defaultValue: "vertical",
						default: "vertical",
						label: "Orientation",
						values: ["vertical", "horizontal"],
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
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
					},
					{ ...propHideRadio(typeRadio) },
					{ ...propRadius(typeRadio) },
				]}
				componentRef={refInput}
			>
				{componentRadio[typeRadio]}
			</PlaygroundLayout>
			{/* Usage */}
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Radio, RadioGroup } from "lambda-ui-components";\n\n<RadioGroup>\n${
					typeRadio === "radio"
						? "\t<Radio value='Option1' label='Option 1' />\n\t<Radio value='Option2' label='Option 2' />\n\t<Radio value='Option3' label='Option 3' />\n\t<Radio value='Option4' label='Option 4' />"
						: typeRadio === "button"
						? "\t<Radio.Button value='Option1' label='Option 1' />\n\t<Radio.Button value='Option2' label='Option 2' />\n\t<Radio.Button value='Option3' label='Option 3' />\n\t<Radio.Button value='Option4' label='Option 4' />"
						: "\t<Radio.Card value='Option1' label='Option 1' />\n\t<Radio.Card value='Option2' label='Option 2' />\n\t<Radio.Card value='Option3' label='Option 3' />\n\t<Radio.Card value='Option4' label='Option 4' />"
				}\n</RadioGroup>`}
			/>
			{/* Variants */}
			<PropertyLayout
				title="Variants"
				description="Defines the visual style of the input, such as a outlined border or a slightly highlighted soft background."
				propertyName="variant"
				id="variants"
				code={getCodeByType(typeRadio, [
					{ key: "", value: "solid" },
					{ key: "variant", value: "outline" },
					{ key: "variant", value: "soft" },
				])}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					{getComponentByType(
						typeRadio,
						[
							{ variant: "solid", children: <Radio value="" /> },
							{ variant: "outline", children: <Radio value="" /> },
							{ variant: "soft", children: <Radio value="" /> },
						],
						["Solid", "Outline", "Soft"]
					)}
				</div>
			</PropertyLayout>
			{/* Sizes */}
			<PropertyLayout
				title="Sizes"
				description="Adjust the scale of the input by modifying its height, internal spacing, and font size."
				id="sizes"
				propertyName="size"
				code={getCodeByType(typeRadio, [
					{ key: "size", value: "tiny" },
					{ key: "", value: "small" },
					{ key: "size", value: "medium" },
					{ key: "size", value: "large" },
				])}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					{getComponentByType(
						typeRadio,
						[
							{ size: "tiny", children: <Radio value="" /> },
							{ size: "small", children: <Radio value="" /> },
							{ size: "medium", children: <Radio value="" /> },
							{ size: "large", children: <Radio value="" /> },
						],
						["Tiny", "Small", "Medium", "Large"]
					)}
				</div>
			</PropertyLayout>
			{/* Radius */}
			{typeRadio !== "radio" && (
				<PropertyLayout
					title="Radius"
					id="radius"
					propertyName="radius"
					description="Controls the level of rounding on the corners of the input, from straight edges to a fully pill style."
					code={getCodeByType(typeRadio, [
						{ key: "radius", value: "none" },
						{ key: "", value: "tiny" },
						{ key: "radius", value: "small" },
						{ key: "radius", value: "medium" },
						{ key: "radius", value: "large" },
						{ key: "radius", value: "full" },
					])}
				>
					<div className="flex flex-col gap-4 px-6 py-6 ">
						{getComponentByType(
							typeRadio,
							[
								{ radius: "none", children: <Radio value="" /> },
								{ radius: "tiny", children: <Radio value="" /> },
								{ radius: "small", children: <Radio value="" /> },
								{ radius: "medium", children: <Radio value="" /> },
								{ radius: "large", children: <Radio value="" /> },
								{ radius: "full", children: <Radio value="" /> },
							],
							["None", "Tiny", "Small", "Medium", "Large", "Full"]
						)}
					</div>
				</PropertyLayout>
			)}
			{/* Disabled */}
			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Disables the input and applies a visual style that indicates it cannot be interacted with."
				propertyName="disabled"
				code={getCodeByType(typeRadio, [{ key: "disabled", value: "" }])}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					{getComponentByType(
						typeRadio,
						[{ disabled: true, children: <Radio value="" /> }],
						["Disabled", "Enabled"]
					)}
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Controlled"
				id="controlled"
				description="Allows you to manage the input value from the parent component state (controlled use)."
				propertyName="value"
				code={getCodeByType(typeRadio, [{ key: "", value: "" }], true)}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					{getComponentByType(typeRadio, [{ children: <Radio value="" /> }], [""])}
				</div>
			</PropertyLayout>
		</div>
	);
};
