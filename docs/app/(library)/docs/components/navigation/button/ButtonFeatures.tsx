"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Button } from "lambda-ui-components";
import { useRef } from "react";
import { Home } from "lucide-react";

export const ButtonFeatures = () => {
	const refButton = useRef<HTMLButtonElement>(null);

	return (
		<>
			<PlaygroundLayout<HTMLButtonElement>
				id="playground"
				title="Playground"
				componentName="Button"
				description="Experiment with all the properties of the Button component in real time."
				propConfigs={[
					{
						name: "label",
						type: "string",
						defaultValue: "Button",
						default: "",
						label: "Label",
						description: "The text content of the button."
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						description: "Defines the visual style of the button.",
						values: ["classic", "solid", "outline", "dashed", "soft", "subtle", "text", "unstyled"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Controls the color scheme of the button.",
						values: ["neutral", "primary", "secondary", "success", "warning", "danger", "info"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Controls the size of the button.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Radius",
						description: "Defines the border radius of the button.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},
					{
						name: "block",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Block",
						description: "If true, the button will take up the full width of its container.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables user interaction with the button.",
					},
					{
						name: "loading",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Loading",
						description: "Shows a loading spinner.",
					},
					{
						name: "loadingText",
						type: "string",
						defaultValue: "Loading...",
						default: "",
						label: "Loading Text",
						description: "Text to display while the button is in a loading state.",
					},
					{
						name: "isCircle",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Circle",
						description: "Makes the button circular (useful for icons).",
					},
					{
						name: "icon",
						type: "checkbox",
						defaultValue: undefined,
						default: <Home />,
						label: "Icon",
						description: "Adds an icon to the button.",
						transformCode(value) {
							if (value) return `<Home />`;
							return "";
						},
					},
					{
						name: "iconPosition",
						type: "radio",
						defaultValue: "left",
						default: "left",
						label: "Icon Position",
						description: "Position of the icon relative to the label.",
						values: ["left", "right"],
					},
				]}
				componentRef={refButton}
			>
				<Button ref={refButton} />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Button } from "lambda-ui-components";

export default function App() {
	return (
		<Button variant="solid" color="primary">
			Click me
		</Button>
	);
}`}
			/>
		</>
	);
};
