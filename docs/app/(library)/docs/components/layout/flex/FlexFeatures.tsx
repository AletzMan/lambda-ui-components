"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Flex } from "lambda-ui-components";
import { useRef } from "react";

export const FlexFeatures = () => {
	const refFlex = useRef<HTMLDivElement>(null);

	const boxStyle = {
		width: "50px",
		height: "50px",
		backgroundColor: "var(--primary-base-color)",
		color: "var(--primary-text-color)",
		display: "flex",
		alignItems: "center",
		minWidth: "50px",
		minHeight: "50px",
		justifyContent: "center",
		borderRadius: "var(--radius-small)",
		fontWeight: "bold",
	};

	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Flex"
				description="Experiment with all the properties of the Flex component in real time."
				childrenComponentsNames={[`div>Item 1</div`, `div>Item 2</div`, `div>Item 3</div`, `div>Item 4</div`, `div>Item 5</div`, `div>Item 6</div`, `div>Item 7</div`, `div>Item 8</div`, `div>Item 9</div`, `div>Item 10</div`,]}
				propConfigs={[
					{
						name: "direction",
						type: "select",
						defaultValue: "row",
						default: "row",
						label: "Direction",
						description: "Direction of the flex items.",
						values: ["row", "row-reverse", "column", "column-reverse"],
					},
					{
						name: "justify",
						type: "select",
						defaultValue: "flex-start",
						default: "flex-start",
						label: "Justify Content",
						description: "Alignment along the main axis.",
						values: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
					},
					{
						name: "align",
						type: "select",
						defaultValue: "flex-start",
						default: "flex-start",
						label: "Align Items",
						description: "Alignment along the cross axis.",
						values: ["flex-start", "center", "flex-end", "stretch", "baseline"],
					},
					{
						name: "wrap",
						type: "select",
						defaultValue: "nowrap",
						default: "nowrap",
						label: "Wrap",
						description: "Whether flex items are forced onto one line or can wrap onto multiple lines.",
						values: ["nowrap", "wrap", "wrap-reverse"],
					},
					{
						name: "gap",
						type: "string",
						defaultValue: "10px",
						default: "0",
						label: "Gap",
						description: "Gap between flex items.",
					},
				]}
				componentRef={refFlex}
			>
				<Flex ref={refFlex} style={{ width: "100%", maxWidth: "500px", height: "300px", border: "1px dashed var(--border-color)", padding: "10px" }}>
					{Array.from({ length: 10 }).map((_, index) => (
						<div key={index} style={{ ...boxStyle, textAlign: "center" }}>
							Item {index + 1}
						</div>
					))}
				</Flex>
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Flex } from "lambda-ui-components";

export default function App() {
	return (
		<Flex gap="10px" justify="center" align="center">
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
		</Flex>
	);
}`}
			/>
		</div>
	);
};
