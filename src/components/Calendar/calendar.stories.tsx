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
			<div style={{ paddingTop: 200 }}>
				<Calendar {...args} value={date} onChange={setDate} />
			</div>
			<div style={{ marginTop: 16 }}>
				<b>Fecha seleccionada:</b> {date?.toLocaleDateString() || "Ninguna"}
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
