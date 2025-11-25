"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Progress } from "lambda-ui-components";

export const ProgressFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Progress"
				description="Experiment with all the properties of the Progress component in real time."
				propConfigs={[
					{
						name: "label",
						type: "string",
						defaultValue: "Progress",
						default: "",
						label: "Label",
						description: "Optional label to display with the progress.",
					},
					{
						name: "value",
						type: "number",
						defaultValue: 65,
						default: 0,
						label: "Value",
						description: "The progress value (0-100).",
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "bar",
						default: "bar",
						label: "Variant",
						description: "Visual style of the progress.",
						values: ["bar", "circle"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Color scheme of the progress.",
						values: ["neutral", "primary", "secondary", "success", "warning", "danger", "info"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Size",
						description: "Size of the progress.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "showValue",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show Value",
						description: "If true, displays the percentage value.",
					},
					{
						name: "indeterminate",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Indeterminate",
						description: "If true, shows an indeterminate loading animation.",
					},
				]}
			>
				<Progress value={65} />
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Progress } from "lambda-ui-components";

export default function App() {
	return (
		<Progress 
			value={65} 
			color="primary" 
			variant="bar"
		/>
	);
}`}
			/>

		</>
	);
};
