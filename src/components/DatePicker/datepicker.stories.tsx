import type { Meta, StoryObj } from "@storybook/react-vite";
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
			options: ["tiny", "small", "medium", "large"],
		},
		type: {
			control: "inline-radio",
			options: ["inline", "dropdown", "modal"],
		},
		invalid: {
			control: "boolean",
		},
		errorMessage: {
			control: "text",
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
		},
		displayFormat: {
			control: "inline-radio",
			options: ["short", "medium", "long", "full"],
		},
		minDate: {
			control: "date",
		},
		maxDate: {
			control: "date",
		},
		helperText: {
			control: "text",
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
		<ContainerComponent
			title="Date Picker"
			subtitle={args.variant?.toString()}
		>
			<div style={{ paddingTop: 200, width: "350px" }}>
				<DatePicker
					{...args}
					value={date}
					onChange={setDate}
				/>
			</div>
		</ContainerComponent>
	);
};

export const Default: Story = {
	render: (args) => <Template {...args} />,
	args: {
		size: "small",
		radius: "small",
		variant: "solid",
		type: "dropdown",
		label: "Select Date of Birth",
		displayFormat: "short",
		invalid: false,
		errorMessage: "",
		helperText: "",
	},
};

export const WithMinMax: Story = {
	render: (args) => <Template {...args} />,
	args: {
		size: "small",
		radius: "small",
		variant: "solid",
		type: "dropdown",
		minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
		maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
		label: "Select Date of Birth",
		displayFormat: "short",
		invalid: false,
		errorMessage: "",
		helperText: "",
	},
};

export const CustomDisabled: Story = {
	render: (args) => <Template {...args} />,
	args: {
		size: "small",
		radius: "small",
		variant: "solid",
		type: "dropdown",
		isDateDisabled: (date) => date.getDay() === 6 || date.getDay() === 0,
		label: "Select Date of Birth",
		displayFormat: "short",
		invalid: false,
		errorMessage: "",
		helperText: "",
	},
};
