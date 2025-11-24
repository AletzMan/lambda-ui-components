"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Divider } from "lambda-ui-components";
import { useRef } from "react";

export const DividerFeatures = () => {
	const refDivider = useRef<HTMLDivElement>(null);

	return (
		<div className="flex flex-col gap-3 pl-2.5 pt-2.5 ">
			<PlaygroundLayout<HTMLDivElement>
				id="playground"
				title="Playground"
				componentName="Divider"
				description="Experiment with all the properties of the Divider component in real time."
				childrenComponentsNames={[`div> Content </div`]}
				propConfigs={[
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						description: "Variant of the divider.",
						values: ["solid", "dashed", "dotted"],
					},
					{
						name: "orientation",
						type: "radio",
						defaultValue: "horizontal",
						default: "horizontal",
						label: "Orientation",
						description: "Orientation of the divider.",
						values: ["horizontal", "vertical"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "neutral",
						default: "neutral",
						label: "Color",
						description: "Color of the divider.",
						values: ["neutral", "primary", "secondary", "danger", "success", "warning", "info", "white", "black"],
					},
					{
						name: "size",
						type: "radio",
						defaultValue: "tiny",
						default: "tiny",
						label: "Size",
						description: "Size of the divider.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "spacing",
						type: "number",
						defaultValue: 5,
						default: 5,
						label: "Spacing",
						description: "Spacing of the divider in pixels.",
					},
					{
						name: "contentPosition",
						type: "radio",
						defaultValue: "center",
						default: "center",
						label: "Content Position",
						description: "Content position of the divider.",
						values: ["start", "center", "end"],
					},
				]}
				componentRef={refDivider}
			>
				<Divider ref={refDivider} >
					<div>Content</div>
				</Divider>
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Divider } from "lambda-ui-components";

export default function App() {
	return (
		<>
			<p>Content above</p>
			<Divider />
			<p>Content below</p>
		</>
	);
}`}
			/>
		</div>
	);
};
