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
			"repeating-linear-gradient(45deg, var(--surface-b) 0, var(--surface-b) 1px, var(--surface-a) 0, var(--surface-a) 50%)",
		color: "var(--text-color-secondary)",
		fontWeight: "bold",
	};

	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Splitter"
				description="Experiment with all the properties of the Splitter component in real time."
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
					{
						name: "children",
						type: "select",
						defaultValue: "Two Panels",
						default: "Two Panels",
						label: "Content",
						description: "The panels to split.",
						values: ["Two Panels", "One Panel"],
						transform: (value) => {
							if (value === "Two Panels") {
								return [
									<div style={panelStyle}>Panel 1</div>,
									<div style={panelStyle}>Panel 2</div>,
								];
							}
							return <div style={panelStyle}>Panel 1</div>;
						},
						transformCode: (value) => {
							if (value === "Two Panels") {
								return `
								<div style={{ 
								       display: "flex", 
								       alignItems: "center", 
								       justifyContent: "center", 
								       backgroundColor: "var(--bg-color-secondary)" 
								}}>Panel 1</div>
								<div style={{ 
								       display: "flex", 
								       alignItems: "center", 
								       justifyContent: "center", 
								       backgroundColor: "var(--bg-color-secondary)" 
								}}>Panel 2</div>
							 `;
							}
							return `
							<div style={{ 
							       display: "flex", 
							       alignItems: "center", 
							       justifyContent: "center", 
							       backgroundColor: "var(--bg-color-secondary)" 
							}}>Panel 1</div>
						 `;
						},
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
		</div>
	);
};
