import { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonTheme } from "./ButtonTheme";

import type { ButtonThemeAnimation } from "./buttonTheme.types";
import ContainerComponent from "../../_util/storybook/components/ContainerComponent/ContainerComponent";

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
	render: (args) => (
		<ContainerComponent title="ButtonTheme" subtitle="Playground">
			<ButtonTheme {...args} />
		</ContainerComponent>
	),
	args: {
		animation: "scale",
		color: "neutral",
		size: "medium",
		variant: "soft",
	},
};

export const AllAnimations: Story = {
	render: (args) => (
		<ContainerComponent title="ButtonTheme" subtitle="All Animations">
			<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
				{(["fade", "rotate", "scale", "flip", "slide", "none"] as ButtonThemeAnimation[]).map(
					(anim) => (
						<div
							key={anim}
							style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
						>
							<ButtonTheme {...args} animation={anim} />
							<span
								style={{
									fontSize: 12,
									marginTop: 8,
									color: "var(--foreground-color)",
									fontWeight: "bold",
									fontFamily: "var(--font-family)",
								}}
							>
								{anim.charAt(0).toUpperCase() + anim.slice(1)}
							</span>
						</div>
					)
				)}
			</div>
		</ContainerComponent>
	),
};
