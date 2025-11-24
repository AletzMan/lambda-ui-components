"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Link } from "lambda-ui-components";
import { useRef } from "react";
import { Home, User, Settings } from "lucide-react";

export const LinkFeatures = () => {
	const refLink = useRef<HTMLAnchorElement>(null);

	return (
		<>
			<PlaygroundLayout<HTMLAnchorElement>
				id="playground"
				title="Playground"
				componentName="Link"
				description="Experiment with all the properties of the Link component in real time."
				propConfigs={[
					{
						name: "href",
						type: "string",
						defaultValue: "#",
						default: "#",
						label: "Href",
						description: "The URL the link points to.",
					},
					{
						name: "label",
						type: "string",
						defaultValue: "Link",
						default: "",
						label: "Label",
						description: "The text content of the link.",
					},
					{
						name: "type",
						type: "radio",
						defaultValue: "default",
						default: "default",
						label: "Type",
						description: "Visual appearance of the link.",
						values: ["default", "button"],
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant (Button Type)",
						description: "Style variant when type is 'button'.",
						values: ["classic", "solid", "outline", "dashed", "soft", "subtle", "text", "unstyled"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Color scheme of the link.",
					},
					{
						name: "size",
						type: "radio",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the link.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "radio",
						defaultValue: "small",
						default: "small",
						label: "Radius (Button Type)",
						description: "Border radius when type is 'button'.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},
					{
						name: "loading",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Loading",
						description: "Disables the link and shows a loading state. Works only when type is 'button'.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "Disables the link.",
					},
					{
						name: "icon",
						type: "checkbox",
						defaultValue: undefined,
						default: <Home />,
						label: "Icon",
						description: "Adds an icon to the link.",
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
						label: "Icon Position (Button Type)",
						description: "Position of the icon relative to the label.",
						values: ["left", "right"],
					},
					{
						name: "justify",
						type: "radio",
						defaultValue: "center",
						default: "center",
						label: "Justify (Button Type)",
						description: "Horizontal alignment when type is 'button'.",
						values: ["start", "center", "end"],
					},
				]}
				componentRef={refLink}
			>
				<Link ref={refLink} href="#" />
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Link } from "lambda-ui-components";

export default function App() {
	return (
		<Link href="#" color="primary">
			Click me
		</Link>
	);
}`}
			/>
		</>
	);
};
