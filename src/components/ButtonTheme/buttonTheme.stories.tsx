import { Meta, StoryObj } from "@storybook/react";
import { ButtonTheme } from "./ButtonTheme";

import type { ButtonThemeAnimation } from "./buttonTheme.types";

const meta: Meta<typeof ButtonTheme> = {
	title: "Components/ButtonTheme",
	component: ButtonTheme,
	argTypes: {
		animation: {
			control: "inline-radio",
			options: ["fade", "rotate", "scale", "flip", "slide", "none"],
		},
		color: {
			control: "inline-radio",
			options: ["primary", "secondary", "success", "danger", "warning", "info", "neutral"],
		},
		size: {
			control: "inline-radio",
			options: ["tiny", "small", "medium", "large"],
		},
		variant: {
			control: "inline-radio",
			options: ["soft", "solid", "subtle", "text", "dashed", "outline"],
		},
	},
	args: {
		animation: "scale",
		color: "neutral",
		size: "medium",
	},
};

export default meta;
type Story = StoryObj<typeof ButtonTheme>;

export const Playground: Story = {
	render: (args) => <ButtonTheme {...args} />,
	args: {
		animation: "scale",
		color: "neutral",
		size: "medium",
		variant: "soft",
	},
};

export const AllAnimations: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
			{(["fade", "rotate", "scale", "flip", "slide", "none"] as ButtonThemeAnimation[]).map((anim) => (
				<div key={anim} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<ButtonTheme {...args} animation={anim} />
					<span style={{ fontSize: 12, marginTop: 8 }}>{anim}</span>
				</div>
			))}
		</div>
	),
};
