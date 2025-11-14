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
				description="Play with the DatePicker component"
				propConfigs={[
					{
						name: "size",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Size",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "variant",
						type: "radio",
						// 4. Actualizar variantes si es necesario (ej. filled o outline)
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						values: ["soft", "solid"],
					},
					// 5. Agregar propiedad específica de DatePicker: displayFormat
					{
						name: "displayFormat",
						type: "radio",
						defaultValue: "medium",
						default: "medium",
						label: "Display Format",
						values: ["full", "long", "medium", "short"],
					},
					// 6. Agregar propiedad específica de DatePicker: type
					{
						name: "type",
						type: "radio",
						defaultValue: "dropdown",
						default: "dropdown",
						label: "Type",
						values: ["inline", "dropdown", "modal"],
					},
					// 7. Reemplazar 'showText' por 'isDateDisabled' o eliminar si no es necesaria en el Playground.
					// Lo mantendremos como booleano por ahora:
					{
						name: "invalid",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Invalid State",
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

			{/* VARIANTES */}
			<PropertyLayout
				title="Variants"
				description="Controls the visual style of the date picker, such as filled or outlined."
				propertyName="variant"
				id="variants"
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\nconst [value, setValue] = useState<Date | undefined>(new Date());\n\nreturn (\n\t<form className="flex flex-col gap-4">\n\t\t<DatePicker variant="soft" value={value} onChange={setValue}/>\n\t\t<DatePicker value={value} onChange={setValue}/>\n\t</form>\n);\n}`}
			>
				<div className="flex flex-col gap-4 px-6 py-6 ">
					<DatePicker variant="soft" label="Soft" value={value} onChange={setValue} />
					<DatePicker label="Solid" value={value} onChange={setValue} />
				</div>
			</PropertyLayout>

			{/* TAMAÑOS */}
			<PropertyLayout
				title="Sizes"
				description="Adjusts the visual size of the date picker input and calendar."
				propertyName="size"
				id="sizes"
				// CÓDIGO ACTUALIZADO para incluir App, useState y form
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState<Date | undefined>(new Date());\n\n\treturn (\n\t\t<form className="flex flex-col gap-4">\n\t\t\t<DatePicker size="tiny" label="Tiny" value={value} onChange={setValue} />\n\t\t\t<DatePicker size="small" label="Small" value={value} onChange={setValue} />\n\t\t\t<DatePicker size="medium" label="Medium" value={value} onChange={setValue} />\n\t\t\t<DatePicker size="large" label="Large" value={value} onChange={setValue} />\n\t\t</form>\n\t);\n}`}
			>
				{/* JSX actualizado para ser controlado */}
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<DatePicker size="tiny" label="Tiny" value={value} onChange={setValue} />
					<DatePicker label="Small" value={value} onChange={setValue} />
					<DatePicker size="medium" label="Medium " value={value} onChange={setValue} />
					<DatePicker size="large" label="Large" value={value} onChange={setValue} />
				</form>
			</PropertyLayout>

			{/* FORMATO DE VISUALIZACIÓN */}
			<PropertyLayout
				title="Display Format"
				id="displayFormat"
				description="Controls the display format of the date shown in the input field."
				propertyName="displayFormat"
				// CÓDIGO ACTUALIZADO para incluir App, useState y form
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState<Date | undefined>(new Date());\n\n\treturn (\n\t\t<form className="flex flex-col gap-4">\n\t\t\t<DatePicker displayFormat="full" label="Full" value={value} onChange={setValue} />\n\t\t\t<DatePicker displayFormat="long" label="Long" value={value} onChange={setValue} />\n\t\t\t<DatePicker displayFormat="medium" label="Medium" value={value} onChange={setValue} />\n\t\t\t<DatePicker displayFormat="short" label="Short" value={value} onChange={setValue} />\n\t\t</form>\n\t);\n}`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<DatePicker displayFormat="full" label="Full" value={value} onChange={setValue} />
					<DatePicker displayFormat="long" label="Long" value={value} onChange={setValue} />
					<DatePicker displayFormat="medium" label="Medium" value={value} onChange={setValue} />
					<DatePicker displayFormat="short" label="Short" value={value} onChange={setValue} />
				</form>
			</PropertyLayout>

			<PropertyLayout
				title="Min Date"
				id="minDate"
				description="The earliest date the user can select. Dates before this will be disabled."
				propertyName="minDate"
				code={`import { DatePicker } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState<Date | undefined>(new Date());

	const today = new Date();
	const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10); 

	return (
		<form className="flex flex-col gap-4">
			<DatePicker
				minDate={minDate} 
				value={value}
				onChange={setValue}
			/>
		</form>
	);
}
`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<DatePicker
						minDate={minDate}
						label={`Min: ${minDate.toDateString()}`}
						value={value}
						onChange={setValue}
					/>
				</form>
			</PropertyLayout>

			{/* MAX DATE */}
			<PropertyLayout
				title="Max Date"
				id="maxDate"
				description="The latest date the user can select. Dates after this will be disabled."
				propertyName="maxDate"
				code={`import { DatePicker } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState<Date | undefined>(new Date());

	const today = new Date(); 
	const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);

	return (
		<form className="flex flex-col gap-4">
			<DatePicker 
				maxDate={maxDate}
				value={value}
				onChange={setValue}
			/>
		</form>
	);
}
`}
			>
				<form className="flex flex-col gap-4 px-6 py-6">
					<DatePicker
						maxDate={maxDate}
						label={`Max: ${maxDate.toDateString()}`}
						value={value}
						onChange={setValue}
					/>
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

			{/* TEXTO DE AYUDA*/}
			<PropertyLayout
				title="Helper Text"
				id="helperText"
				description="Helper text displayed below the input field to provide additional information."
				propertyName="helperText"
				// CÓDIGO ACTUALIZADO para incluir App, useState y form
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState<Date | undefined>(new Date());\n\n\treturn (\n\t\t<form className="flex flex-col gap-4">\n\t\t\t<DatePicker helperText="Helper Text" label="Label" value={value} onChange={setValue} />\n\t\t</form>\n\t);\n}`}
			>
				{/* JSX actualizado para ser controlado */}
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<DatePicker helperText="Helper Text" label="Label" value={value} onChange={setValue} />
				</form>
			</PropertyLayout>

			{/* INVALIDO*/}
			<PropertyLayout
				title="Invalid"
				id="invalid"
				description="Error message displayed below the input field when a validation issue occurs."
				propertyName="invalid"
				// CÓDIGO ACTUALIZADO para incluir App, useState y form
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState<Date | undefined>(new Date());\n\n\treturn (\n\t\t<form className="flex flex-col gap-4">\n\t\t\t<DatePicker invalid label="Label" value={value} onChange={setValue} />\n\t\t</form>\n\t);\n}`}
			>
				{/* JSX actualizado para ser controlado */}
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<DatePicker invalid label="Label" value={value} onChange={setValue} />
				</form>
			</PropertyLayout>

			{/* TEXTO DE ERROR*/}
			<PropertyLayout
				title="Error Message"
				id="errorMessage"
				description="Error message displayed below the input field when a validation issue occurs."
				propertyName="errorMessage"
				// CÓDIGO ACTUALIZADO para incluir App, useState y form
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState<Date | undefined>(new Date());\n\n\treturn (\n\t\t<form className="flex flex-col gap-4">\n\t\t\t<DatePicker errorMessage="Error Message" invalid label="Label" value={value} onChange={setValue} />\n\t\t</form>\n\t);\n}`}
			>
				{/* JSX actualizado para ser controlado */}
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<DatePicker
						errorMessage="Error Message"
						invalid
						label="Label"
						value={value}
						onChange={setValue}
					/>
				</form>
			</PropertyLayout>

			{/* DESHABILITADO */}
			<PropertyLayout
				title="Disabled"
				id="disabled"
				description="Makes the date picker non-interactive."
				propertyName="disabled"
				// CÓDIGO ACTUALIZADO para incluir App, useState y form
				code={`import { DatePicker } from "lambda-ui-components";\nimport { useState } from "react";\n\nexport default function App() {\n\tconst [value, setValue] = useState<Date | undefined>(new Date());\n\n\treturn (\n\t\t<form className="flex flex-col gap-4">\n\t\t\t<DatePicker disabled label="Disabled" value={value} onChange={setValue} />\n\t\t</form>\n\t);\n}`}
			>
				{/* JSX actualizado para ser controlado */}
				<form className="flex flex-col gap-4 px-6 py-6 ">
					<DatePicker disabled label="Disabled DatePicker" value={value} onChange={setValue} />
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
