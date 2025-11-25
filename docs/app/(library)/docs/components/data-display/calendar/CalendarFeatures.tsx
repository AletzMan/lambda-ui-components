"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Calendar } from "lambda-ui-components";
import { useState } from "react";

export const CalendarFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Calendar"
				description="Experiment with all the properties of the Calendar component in real time."
				propConfigs={[
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						description: "Visual style of the calendar.",
						values: ["solid", "outline"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Radius",
						description: "Border radius of the calendar.",
						values: ["none", "tiny", "small", "medium", "large"],
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables the entire calendar.",
					},
				]}
			>
				{(props) => {
					const [date, setDate] = useState<Date>(new Date());
					return <Calendar value={date} onChange={setDate} {...props} />;
				}}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>Calendar is a controlled component that requires <code className="code-tag">value</code> and <code className="code-tag">onChange</code> props to manage the selected date.</p>
					</div>
				}
				id="usage"
				code={`import { Calendar } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date>(new Date());

	return (
		<Calendar 
			value={date} 
			onChange={setDate} 
		/>
	);
}`}
			/>

			<PropertyLayout
				title="With Min and Max Dates"
				description={
					<div>
						<p>Restrict selectable dates using <code className="code-tag">minDate</code> and <code className="code-tag">maxDate</code> props.</p>
					</div>
				}
				id="min-max"
				code={`import { Calendar } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date>(new Date());
	const today = new Date();
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

	return (
		<Calendar 
			value={date} 
			onChange={setDate}
			minDate={today}
			maxDate={nextMonth}
		/>
	);
}`}
			>
				<div className="flex flex-col justify-center items-center py-6 max-w-[600px] mx-auto">
					{(() => {
						const [date, setDate] = useState<Date>(new Date());
						const today = new Date();
						const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
						return <Calendar value={date} onChange={setDate} minDate={today} maxDate={nextMonth} />;
					})()}
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Custom Disabled Dates"
				description={
					<div>
						<p>Use <code className="code-tag">isDateDisabled</code> to disable specific dates based on custom logic.</p>
					</div>
				}
				id="custom-disabled"
				code={`import { Calendar } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date>(new Date());

	// Disable weekends
	const isWeekend = (date: Date) => {
		const day = date.getDay();
		return day === 0 || day === 6;
	};

	return (
		<Calendar 
			value={date} 
			onChange={setDate}
			isDateDisabled={isWeekend}
		/>
	);
}`}
			>
				<div className="flex flex-col justify-center items-center py-6 max-w-[600px] mx-auto">
					<label className="text-lg font-semibold mb-2">With Weekends Disabled</label>
					{(() => {
						const [date, setDate] = useState<Date>(new Date());
						const isWeekend = (date: Date) => {
							const day = date.getDay();
							return day === 0 || day === 6;
						};
						return <Calendar value={date} onChange={setDate} isDateDisabled={isWeekend} />;
					})()}
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Events"
				description={
					<div>
						<p>Display events on specific dates using the <code className="code-tag">events</code> prop. Each event can have multiple labels with different status colors.</p>
					</div>
				}
				id="events"
				code={`import { Calendar } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [date, setDate] = useState<Date>(new Date());

	const events = [
		{
			date: new Date(2024, 0, 15),
			label: ["Meeting", "Deadline"],
			status: ["success", "danger"]
		},
		{
			date: new Date(2024, 0, 20),
			label: ["Review"],
			status: ["warning"]
		},
	];

	return (
		<Calendar 
			value={date} 
			onChange={setDate}
			events={events}
		/>
	);
}`}
			>
				<div className="flex flex-col justify-center items-center py-6 max-w-[600px] mx-auto">
					<label className="text-lg font-semibold mb-2">With Events</label>
					{(() => {
						const [date, setDate] = useState<Date>(new Date());
						const today = new Date();
						const currentDay = today.getDate();

						// Crear eventos relativos al día actual
						const events = [
							{
								date: new Date(today.getFullYear(), today.getMonth(), Math.max(1, currentDay - 3)),
								label: ["Meeting"],
								status: ["success" as const]
							},
							{
								date: new Date(today.getFullYear(), today.getMonth(), currentDay),
								label: ["Today", "Deadline"],
								status: ["warning" as const, "danger" as const]
							},
							{
								date: new Date(today.getFullYear(), today.getMonth(), Math.min(28, currentDay + 5)),
								label: ["Launch"],
								status: ["success" as const]
							},
						];
						return <Calendar value={date} onChange={setDate} events={events} />;
					})()}
				</div>
			</PropertyLayout>

		</>
	);
};
