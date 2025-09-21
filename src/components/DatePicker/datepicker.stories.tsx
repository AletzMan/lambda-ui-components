import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";
import { DatePickerProps } from "./datepicker.types";

const meta: Meta<typeof DatePicker> = {
	title: "Components/DatePicker",
	component: DatePicker,
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["compact", "full"],
		},
		type: {
			control: "inline-radio",
			options: ["inline", "modal"],
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
type Story = StoryObj<typeof DatePicker>;

const Template = (args: DatePickerProps) => {
	const [date, setDate] = useState<Date | undefined>(undefined);
	return (
		<ContainerComponent title="Date Picker" subtitle={args.variant?.toString()}>
			<DatePicker {...args} value={date} onChange={setDate} />
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
		minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
		maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
	},
};

export const CustomDisabled: Story = {
	render: (args) => <Template {...args} />,
	args: {
		isDateDisabled: (date) => date.getDay() === 0,
	},
};
