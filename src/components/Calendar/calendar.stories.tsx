import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { CalendarProps } from "./calendar.types";

const meta: Meta<typeof Calendar> = {
	title: "Components/Calendar",
	component: Calendar,
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["compact", "full"],
		},
		type: {
			control: "inline-radio",
			options: ["inline", "dropdown"],
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large"],
		},
		minDate: {
			control: "date",
		},
		maxDate: {
			control: "date",
		},
		variant: {
			control: "inline-radio",
			options: ["solid", "soft"],
		},
		value: { control: false },
		onChange: { action: "onChange" },
	},
};
export default meta;
type Story = StoryObj<typeof Calendar>;

const Template = (args: CalendarProps) => {
	const [date, setDate] = useState<Date | undefined>(undefined);
	return (
		<ContainerComponent title="Calendar" subtitle={args.variant?.toString()}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					width: "100%",
					height: "100%",
				}}
			>
				<Calendar {...args} value={date} onChange={setDate} />
			</div>
		</ContainerComponent>
	);
};

export const Default: Story = {
	render: (args) => <Template {...args} />,
	args: {
		size: "compact",
		radius: "small",
		variant: "solid",
		type: "inline",
		events: [
			{
				date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
				label: ["Code Review", "Planning Meeting", "Meeting"],
				status: ["success", "warning", "danger"],
			},
			{
				date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
				label: ["Payment Reminder", "Dentist Appointment"],
				status: ["warning", "success"],
			},
			{
				date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
				label: ["Client Presentation"],
				status: ["success"],
			},
			{
				date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
				label: ["Progress Report", "Team Lunch"],
				status: ["warning", "danger"],
			},
			{
				date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 3),
				label: ["Vacation", "Go to the beach"],
				status: ["success", "warning"],
			},
		],
	},
};

export const WithMinMax: Story = {
	render: (args) => <Template {...args} />,
	args: {
		size: "compact",
		radius: "small",
		variant: "solid",
		type: "inline",
		minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
		maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
	},
};

export const CustomDisabled: Story = {
	render: (args) => <Template {...args} />,
	args: {
		size: "compact",
		radius: "small",
		variant: "solid",
		type: "inline",
		isDateDisabled: (date) => date.getDay() === 6 || date.getDay() === 0,
	},
};
