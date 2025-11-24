"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Splitter } from "lambda-ui-components";
import { useRef } from "react";

export const SplitterFeatures = () => {
	const panelStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		border: "1px solid var(--border-color)",
		backgroundSize: "10px 10px",
		backgroundImage:
			"repeating-linear-gradient(45deg, var(--surface-b) 0, var(--surface-b) 1px, var(--background-color) 0, var(--background-color) 50%)",
		color: "var(--text-color-secondary)",
		fontWeight: "bold",
	};

	const panelStyleString = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		border: "1px solid var(--border-color)",
		backgroundSize: "10px 10px",
		backgroundImage:
			"repeating-linear-gradient(45deg, var(--surface-b) 0, var(--surface-b) 1px, var(--background-color) 0, var(--background-color) 50%)",
		color: "var(--text-color-secondary)",
		fontWeight: "bold",
	};

	return (
		<>
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Splitter"
				description="Experiment with all the properties of the Splitter component in real time."
				childrenComponentsNames={[
					`div styles={panelStyle}> Panel 1 </div`,
					`div styles={panelStyle}> Panel 2 </div`,
				]}
				propConfigs={[
					{
						name: "direction",
						type: "radio",
						defaultValue: "horizontal",
						default: "horizontal",
						label: "Direction",
						description: "Direction of the splitter.",
						values: ["horizontal", "vertical"],
					},
					{
						name: "min",
						type: "string",
						defaultValue: "10%",
						default: "0",
						label: "Min Size",
						description: "Minimum size of the first panel (px or %).",
					},
					{
						name: "max",
						type: "string",
						defaultValue: "90%",
						default: "100%",
						label: "Max Size",
						description: "Maximum size of the first panel (px or %).",
					},
					{
						name: "initial",
						type: "string",
						defaultValue: "50%",
						default: "50%",
						label: "Initial Size",
						description: "Initial size of the first panel (px or %).",
					},
				]}
			>
				<Splitter children={[
					<div style={panelStyle}>Panel 1</div>,
					<div style={panelStyle}>Panel 2</div>,
				]} />

			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Splitter } from "lambda-ui-components";

export default function App() {
	return (
		<Splitter >
			<div style={{ backgroundColor: "#f0f0f0" }}>Panel 1</div>
			<div style={{ backgroundColor: "#e0e0e0" }}>Panel 2</div>
		</Splitter>
	);
}`}
			/>
		</>
	);
};
