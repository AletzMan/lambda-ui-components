"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { DatePicker } from "lambda-ui-components";
import { Ref, useRef } from "react";
import { useState } from "react";

const initialDate = new Date();

export const DatePickerFeatures = () => {
	// 1. Mantener refInput en HTMLInputElement (asumiendo que es el input de la fecha)
	const refInput = useRef<HTMLDivElement>(null);
	const today = new Date();
	const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
	const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);

	// 2. Cambiar el estado para manejar un objeto Date
	const [value, setValue] = useState<Date | undefined>(initialDate);

	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				// 3. Cambiar nombres
				componentName="DatePicker"
				description="Experiment with all the properties of the DatePicker component in real time."
				propConfigs={[
					{
						name: "label",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Label",
						description: "Sets the field label.",
					},
					{
						name: "errorMessage",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Error Message",
						description: "Message shown when the field is invalid.",
					},
					{
						name: "helperText",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Helper Text",
						description: "Shows additional guidance below the field.",
					},
					{
						name: "minDate",
						type: "date",
						defaultValue: undefined,
						default: undefined,
						label: "Min Date",
						description: "Earliest selectable date.",
					},
					{
						name: "maxDate",
						type: "date",
						defaultValue: undefined,
						default: undefined,
						label: "Max Date",
						description: "Latest selectable date.",
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Size",
						description: "Adjusts the input size.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						description: "Changes the visual style.",
						values: ["soft", "solid"],
					},
					{
						name: "displayFormat",
						type: "radio",
						defaultValue: "medium",
						default: "medium",
						label: "Display Format",
						description: "Sets how the selected date is formatted in the input.",
						values: ["full", "long", "medium", "short"],
					},
					{
						name: "type",
						type: "radio",
						defaultValue: "dropdown",
						default: "dropdown",
						label: "Type",
						description: "Selects how the picker is presented.",
						values: ["inline", "dropdown", "modal"],
					},
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Invalid State",
						description: "Marks the field as invalid.",
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
				<DatePicker ref={refInput} value={value} onChange={setValue} />
			</PlaygroundLayout>

			{/* USO */}
			<PropertyLayout
				title="Usage"
				id="usage"
				// CÓDIGO ACTUALIZADO para incluir App, useState y form
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState<Date | undefined>(new Date());\n\n\treturn (\n\t\t<form className="flex flex-col gap-4">\n\t\t\t<DatePicker value={value} onChange={setValue} />\n\t\t</form>\n\t);\n}`}
			>
				{/* JSX actualizado para usar form y ser controlado */}
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<DatePicker value={value} onChange={setValue} />
				</form>
			</PropertyLayout>

			{/* IS DATE DISABLED */}
			<PropertyLayout
				title="Is Date Disabled"
				id="isDateDisabled"
				description="Custom function to disable specific dates in the calendar, such as weekends."
				propertyName="isDateDisabled"
				code={`import { DatePicker } from "lambda-ui-components";
import { useState } from "react";

// Disable weekends
const disableWeekends = (date: Date) => {
	const day = date.getDay();
	return day === 0 || day === 6;
};

export default function App() {
	const [value, setValue] = useState<Date | undefined>(new Date());

	return (
		<form className="flex flex-col gap-4">
			<DatePicker
				isDateDisabled={disableWeekends}
				label="Weekends Disabled"
				value={value}
				onChange={setValue}
			/>
		</form>
	);
}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<DatePicker
						isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
						label="Weekends Disabled"
						value={value}
						onChange={setValue}
					/>
				</form>
			</PropertyLayout>

			{/* CONTROLADO (MODIFICADO) */}
			<PropertyLayout
				title="Controlled Component"
				id="controlled"
				description="Control the selected date using state (value and onChange)."
				propertyName="value, onChange"
				// CÓDIGO ACTUALIZADO para incluir form y tipo en useState
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState<Date | undefined>(new Date());\n\n\treturn (\n\t\t<form className="flex flex-col gap-4">\n\t\t\t<DatePicker value={value} onChange={setValue} label="Controlled" />\n\t\t</form>\n\t);\n}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<DatePicker
						value={value}
						onChange={setValue}
						label={`Current Date: ${value ? value.toLocaleDateString() : "None"}`}
					/>
				</form>
			</PropertyLayout>
		</div>
	);
};
