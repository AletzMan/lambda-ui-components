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
			options: ["tiny", "small", "medium", "large"],
		},
		type: {
			control: "inline-radio",
			options: ["inline", "dropdown", "modal"],
		},
		radius: {
			control: "inline-radio",
			options: ["none", "tiny", "small", "medium", "large", "full"],
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
	const [currentStyles, setCurrentStyles] = useState<"global" | "local">("local");
	return (
		<ContainerComponent
			title="Date Picker"
			subtitle={args.variant?.toString()}
			onChangeStyleSource={(value) => setCurrentStyles(value)}
			styleSource={currentStyles}
		>
			<div style={{ paddingTop: 200, width: "250px" }}>
				<DatePicker
					{...args}
					value={date}
					onChange={setDate}
					radius={currentStyles === "local" ? args.radius : undefined}
				/>
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
		size: "small",
		radius: "small",
		variant: "solid",
		type: "dropdown",
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
	},
};
