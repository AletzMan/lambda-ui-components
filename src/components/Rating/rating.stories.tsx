import { StoryObj } from "@storybook/react";
import { Rating } from "./Rating";
import type { Meta } from "@storybook/react";
import { useState } from "react";
import { RatingProps } from "./rating.types";

const meta: Meta<typeof Rating> = {
	title: "Components/Rating",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Rating,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "flat", "outline"],
			description: "Visual style of the input",
			type: "string",
		},
		color: {
			control: "select",
			options: ["default", "primary", "secondary", "success", "danger", "warning", "info"],
			description: "Background color",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Input size",
		},
		value: {
			control: "number",
			description: "Value of the rating",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultRating = ({ variant, color, size }: RatingProps) => {
	const [value, setValue] = useState(3);
	return (
		<Rating
			variant={variant}
			color={color}
			size={size}
			value={value}
			onChange={(value) => setValue(value)}
		/>
	);
};

export const Default: Story = {
	render: (args) => <DefaultRating {...args} />,
	args: {
		variant: "flat",
		color: "primary",
		size: "medium",
		value: 3,
	},
};
