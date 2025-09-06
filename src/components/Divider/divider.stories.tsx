import { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import { DividerProps } from "./divider.types";
import { Card } from "../Card/Card";
import { Switch } from "../Switch/Switch";
import { useState } from "react";

const meta: Meta<typeof Divider> = {
	title: "Components/Divider",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	component: Divider,
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "dashed", "dotted"],
			description: "Visual style of the input",
			type: "string",
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Orientation of the divider",
			type: "string",
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "danger", "warning", "info", "white", "black"],
			description: "Background color",
		},
		contentPosition: {
			control: "select",
			options: ["center", "start", "end"],
			description: "Content position of the divider",
			type: "string",
		},
		size: {
			control: "select",
			options: ["tiny", "small", "medium", "large"],
			description: "Size of the divider",
			type: "string",
		},
	},
};

export default meta;

type Story = StoryObj<typeof Divider>;

const Template = (args: DividerProps) => {
	const [hasContent, setHasContent] = useState(false);
	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
			<Switch
				label="Has Content"
				checked={hasContent}
				onChange={(e) => setHasContent(e.target.checked)}
			/>
			<Card>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "10px",
						height: "250px",
						width: "250px",
						alignItems: "center",
						flexDirection: args.orientation === "vertical" ? "row" : "column",
					}}
				>
					<p
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "var(--surface-c)",
							padding: "10px",
							width: "100%",
							height: "100%",
							borderRadius: "var(--border-radius-sm)",
						}}
					>
						Content
					</p>
					<Divider {...args}>{hasContent ? "Label" : ""}</Divider>
					<p
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "var(--surface-c)",
							padding: "10px",
							width: "100%",
							height: "100%",
							borderRadius: "var(--border-radius-sm)",
						}}
					>
						Content
					</p>
				</div>
			</Card>
		</div>
	);
};

export const Default: Story = {
	render: Template,
	args: {
		variant: "solid",
		orientation: "horizontal",
		color: "primary",
		size: "tiny",
		contentPosition: "center",
	},
};
