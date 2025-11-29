"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { SwitchTheme } from "lambda-ui-components";

export const SwitchThemeFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="SwitchTheme"
				description="Experiment with the SwitchTheme component properties. Click the button to open the dropdown and switch themes."
				propConfigs={[
					{
						name: "variant",
						type: "select",
						defaultValue: "soft",
						default: "soft",
						label: "Variant",
						description: "Visual style of the button.",
						values: ["solid", "soft", "subtle", "text"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the button.",
						values: ["small", "medium", "large"],
					},
					{
						name: "showLabel",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show Label",
						description: "Whether to show the theme name next to the icon.",
					},
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6 h-40">
						<SwitchTheme {...props} />
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>The SwitchTheme component provides a dropdown menu to switch between all available themes (Light, Dark, Retro, Lavender, Mint, Sunset, Ocean, Midnight, etc.).</p>
					</div>
				}
				id="usage"
				code={`import { SwitchTheme } from "lambda-ui-components";

export default function App() {
	return <SwitchTheme />;
}`}
			>
				<div className="flex justify-center items-center py-6 h-40">
					<SwitchTheme />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Variants"
				description={
					<div>
						<p>SwitchTheme supports different visual variants to match your UI design.</p>
					</div>
				}
				id="variants"
				code={`import { SwitchTheme } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<SwitchTheme variant="solid" />
			<SwitchTheme variant="soft" />
			<SwitchTheme variant="subtle" />
			<SwitchTheme variant="text" />
		</div>
	);
}`}
			>
				<div className="flex flex-wrap gap-4 justify-center items-center py-6 h-40">
					<div className="flex flex-col items-center gap-2">
						<SwitchTheme variant="solid" />
						<span className="text-xs text-(--foreground-secondary-color)">Solid</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<SwitchTheme variant="soft" />
						<span className="text-xs text-(--foreground-secondary-color)">Soft</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<SwitchTheme variant="subtle" />
						<span className="text-xs text-(--foreground-secondary-color)">Subtle</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<SwitchTheme variant="text" />
						<span className="text-xs text-(--foreground-secondary-color)">Text</span>
					</div>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Label"
				description={
					<div>
						<p>You can enable <code className="code-tag">showLabel</code> to display the current theme name.</p>
					</div>
				}
				id="with-label"
				code={`import { SwitchTheme } from "lambda-ui-components";

export default function App() {
	return <SwitchTheme showLabel />;
}`}
			>
				<div className="flex justify-center items-center py-6 h-40">
					<SwitchTheme showLabel />
				</div>
			</PropertyLayout>
		</>
	);
};
