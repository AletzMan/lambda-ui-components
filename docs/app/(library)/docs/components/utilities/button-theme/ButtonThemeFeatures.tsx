"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { ButtonTheme } from "lambda-ui-components";

export const ButtonThemeFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="ButtonTheme"
				description="Experiment with the ButtonTheme component properties. Click the button to toggle between light and dark themes."
				propConfigs={[
					{
						name: "animation",
						type: "radio",
						defaultValue: "scale",
						default: "scale",
						label: "Animation",
						description: "Animation type when toggling theme.",
						values: ["fade", "rotate", "scale", "flip", "slide", "none"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the button.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "neutral",
						default: "neutral",
						label: "Color",
						description: "Color scheme of the button.",
						values: ["neutral", "primary", "secondary", "success", "danger", "warning", "info"],
					},
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6">
						<ButtonTheme {...props} />
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>The ButtonTheme component provides a simple way to toggle between light and dark themes with animated icon transitions.</p>
					</div>
				}
				id="usage"
				code={`import { ButtonTheme } from "lambda-ui-components";

export default function App() {
	return <ButtonTheme />;
}`}
			>
				<div className="flex justify-center items-center py-6">
					<ButtonTheme />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Animations"
				description={
					<div>
						<p>ButtonTheme supports six animation types: <code className="code-tag">fade</code>, <code className="code-tag">rotate</code>, <code className="code-tag">scale</code>, <code className="code-tag">flip</code>, <code className="code-tag">slide</code>, and <code className="code-tag">none</code>.</p>
					</div>
				}
				id="animations"
				code={`import { ButtonTheme } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<ButtonTheme animation="fade" />
			<ButtonTheme animation="rotate" />
			<ButtonTheme animation="scale" />
			<ButtonTheme animation="flip" />
			<ButtonTheme animation="slide" />
			<ButtonTheme animation="none" />
		</div>
	);
}`}
			>
				<div className="flex flex-wrap gap-4 justify-center items-center py-6">
					<div className="flex flex-col items-center gap-2">
						<ButtonTheme animation="fade" />
						<span className="text-xs text-(--foreground-secondary-color)">Fade</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ButtonTheme animation="rotate" />
						<span className="text-xs text-(--foreground-secondary-color)">Rotate</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ButtonTheme animation="scale" />
						<span className="text-xs text-(--foreground-secondary-color)">Scale</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ButtonTheme animation="flip" />
						<span className="text-xs text-(--foreground-secondary-color)">Flip</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ButtonTheme animation="slide" />
						<span className="text-xs text-(--foreground-secondary-color)">Slide</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ButtonTheme animation="none" />
						<span className="text-xs text-(--foreground-secondary-color)">None</span>
					</div>
				</div>
			</PropertyLayout>


		</>
	);
};
