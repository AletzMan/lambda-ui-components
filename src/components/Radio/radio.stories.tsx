import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio } from "./Radio";
import { RadioGroupProps } from "./radio.types";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
const meta: Meta<typeof RadioGroup> = {
	title: "Components/Radio",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: RadioGroup,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "soft", "outline"],
			description: "Visual style of the input",
			type: "string",
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "danger", "success", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		orientation: {
			control: "radio",
			options: ["horizontal", "vertical"],
		},
		disabled: {
			control: "boolean",
			description: "Disables the input and makes it inactive",
		},
	},
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const RadioTemplate = (args: RadioGroupProps) => {
	return (
		<RadioGroup name="example" defaultValue="option1" {...args}>
			<Radio value="option1" label="Option 1" />
			<Radio value="option2" label="Option 2" />
			<Radio value="option3" label="Option 3" />
		</RadioGroup>
	);
};

const RadioButtonTemplate = (args: RadioGroupProps) => {
	return (
		<RadioGroup name="example" defaultValue="option1" {...args}>
			<Radio.Button value="option1" icon={<AlignLeft />} />
			<Radio.Button value="option2" icon={<AlignCenter />} />
			<Radio.Button value="option3" icon={<AlignRight />} />
		</RadioGroup>
	);
};

const RadioCardTemplate = (args: RadioGroupProps) => {
	return (
		<RadioGroup name="example" defaultValue="option1" {...args}>
			<Radio.Card
				value="option1"
				label="Option 1"
				title="Option 1"
				subtitle="Subtitle"
				body={<div>Body</div>}
			/>
			<Radio.Card
				value="option2"
				label="Option 2"
				title="Option 2"
				subtitle="Subtitle"
				body={<div>Body</div>}
			/>
			<Radio.Card
				value="option3"
				label="Option 3"
				title="Option 3"
				subtitle="Subtitle"
				body={<div>Body</div>}
			/>
		</RadioGroup>
	);
};

export const Default: Story = {
	render: (args) => <RadioTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "solid",
		disabled: false,
	},
};

export const Button: Story = {
	render: (args) => <RadioButtonTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "solid",
		disabled: false,
	},
};

export const Card: Story = {
	render: (args) => <RadioCardTemplate {...args} />,
	args: {
		size: "medium",
		color: "primary",
		variant: "solid",
		disabled: false,
	},
};
