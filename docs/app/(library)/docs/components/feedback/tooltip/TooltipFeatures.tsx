"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Tooltip, Button } from "lambda-ui-components";

export const TooltipFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Tooltip"
				description="Experiment with all the properties of the Tooltip component in real time."
				propConfigs={[
					{
						name: "content",
						type: "string",
						defaultValue: "This is a tooltip",
						default: "",
						label: "Content",
						description: "The content to display inside the tooltip.",
					},
					{
						name: "position",
						type: "radio",
						defaultValue: "top-center",
						default: "top-center",
						label: "Position",
						description: "Position of the tooltip relative to the target.",
						values: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right", "left-center", "right-center"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "secondary",
						default: "secondary",
						label: "Color",
						description: "Color scheme of the tooltip.",
					},
					{
						name: "offset",
						type: "number",
						defaultValue: 8,
						default: 8,
						label: "Offset",
						description: "Distance in pixels between tooltip and target.",
					},
					{
						name: "delayShow",
						type: "number",
						defaultValue: 100,
						default: 100,
						label: "Delay Show (ms)",
						description: "Delay before showing the tooltip.",
					},
					{
						name: "delayHide",
						type: "number",
						defaultValue: 100,
						default: 100,
						label: "Delay Hide (ms)",
						description: "Delay before hiding the tooltip.",
					},
					{
						name: "disabled",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Disabled",
						description: "If true, the tooltip will not appear.",
					},
				]}
			>
				<Tooltip content="This is a tooltip">
					<Button label="Hover me" />
				</Tooltip>
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Tooltip, Button } from "lambda-ui-components";

export default function App() {
	return (
		<Tooltip content="This is a helpful tooltip">
			<Button label="Hover me" />
		</Tooltip>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Tooltip content="This is a helpful tooltip">
						<Button label="Hover me" />
					</Tooltip>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Positions"
				description={
					<div>
						<p>Tooltip supports 8 different positions: <code className="code-tag">top-left</code>, <code className="code-tag">top-center</code>, <code className="code-tag">top-right</code>, <code className="code-tag">bottom-left</code>, <code className="code-tag">bottom-center</code>, <code className="code-tag">bottom-right</code>, <code className="code-tag">left-center</code>, and <code className="code-tag">right-center</code>.</p>
					</div>
				}
				id="positions"
				code={`import { Tooltip, Button } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex flex-col gap-4 py-6 px-8">
			<div className="flex gap-4 w-full justify-between" >
				<Tooltip content="Top Left" position="top-left">
					<Button label="Top Left" size="tiny" />
				</Tooltip>
				<Tooltip content="Top Center" position="top-center">
					<Button label="Top Center" size="tiny" />
				</Tooltip>
				<Tooltip content="Top Right" position="top-right">
					<Button label="Top Right" size="tiny" />
				</Tooltip>
			</div>
			<div className="flex gap-4 w-full justify-between">
				<Tooltip content="Left Center" position="left-center">
					<Button label="Left Center" size="tiny" />
				</Tooltip>
				<Tooltip content="Right Center" position="right-center">
					<Button label="Right Center" size="tiny" />
				</Tooltip>
			</div>
			<div className="flex gap-4 w-full justify-between">
				<Tooltip content="Bottom Left" position="bottom-left">
					<Button label="Bottom Left" size="tiny" />
				</Tooltip>
				<Tooltip content="Bottom Center" position="bottom-center">
					<Button label="Bottom Center" size="tiny" />
				</Tooltip>
				<Tooltip content="Bottom Right" position="bottom-right">
					<Button label="Bottom Right" size="tiny" />
				</Tooltip>
			</div>
		</div>
			);
}`}
			>
				<div className="flex flex-col gap-4 py-6 px-8">
					<div className="flex gap-4 w-full justify-between" >
						<Tooltip content="Top Left" position="top-left">
							<Button label="Top Left" size="tiny" />
						</Tooltip>
						<Tooltip content="Top Center" position="top-center">
							<Button label="Top Center" size="tiny" />
						</Tooltip>
						<Tooltip content="Top Right" position="top-right">
							<Button label="Top Right" size="tiny" />
						</Tooltip>
					</div>
					<div className="flex gap-4 w-full justify-between">
						<Tooltip content="Left Center" position="left-center">
							<Button label="Left Center" size="tiny" />
						</Tooltip>
						<Tooltip content="Right Center" position="right-center">
							<Button label="Right Center" size="tiny" />
						</Tooltip>
					</div>
					<div className="flex gap-4 w-full justify-between">
						<Tooltip content="Bottom Left" position="bottom-left">
							<Button label="Bottom Left" size="tiny" />
						</Tooltip>
						<Tooltip content="Bottom Center" position="bottom-center">
							<Button label="Bottom Center" size="tiny" />
						</Tooltip>
						<Tooltip content="Bottom Right" position="bottom-right">
							<Button label="Bottom Right" size="tiny" />
						</Tooltip>
					</div>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Colors"
				description={
					<div>
						<p>Tooltip supports all color variants from the theme.</p>
					</div>
				}
				id="colors"
				code={`import { Tooltip, Button } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<Tooltip content="Neutral tooltip" color="neutral">
				<Button label="Neutral" color="neutral" />
			</Tooltip>
			<Tooltip content="Primary tooltip" color="primary">
				<Button label="Primary" color="primary" />
			</Tooltip>
			<Tooltip content="Secondary tooltip" color="secondary">
				<Button label="Secondary" color="secondary" />
			</Tooltip>
			<Tooltip content="Success tooltip" color="success">
				<Button label="Success" color="success" />
			</Tooltip>
			<Tooltip content="Danger tooltip" color="danger">
				<Button label="Danger" color="danger" />
			</Tooltip>
			<Tooltip content="Info tooltip" color="info">
				<Button label="Info" color="info" />
			</Tooltip>
			<Tooltip content="Warning tooltip" color="warning">
				<Button label="Warning" color="warning" />
			</Tooltip>
		</div>
	);
}`}
			>
				<div className="flex gap-4 justify-center items-center py-6">
					<Tooltip content="Neutral tooltip" color="neutral">
						<Button label="Neutral" color="neutral" />
					</Tooltip>
					<Tooltip content="Primary tooltip" color="primary">
						<Button label="Primary" color="primary" />
					</Tooltip>
					<Tooltip content="Secondary tooltip" color="secondary">
						<Button label="Secondary" color="secondary" />
					</Tooltip>
					<Tooltip content="Success tooltip" color="success">
						<Button label="Success" color="success" />
					</Tooltip>
					<Tooltip content="Danger tooltip" color="danger">
						<Button label="Danger" color="danger" />
					</Tooltip>
					<Tooltip content="Info tooltip" color="info">
						<Button label="Info" color="info" />
					</Tooltip>
					<Tooltip content="Warning tooltip" color="warning">
						<Button label="Warning" color="warning" />
					</Tooltip>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Delay"
				description={
					<div>
						<p>Control when the tooltip appears and disappears using <code className="code-tag">delayShow</code> and <code className="code-tag">delayHide</code> props.</p>
					</div>
				}
				id="delay"
				code={`import { Tooltip, Button } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<Tooltip content="Instant tooltip" delayShow={0} delayHide={0}>
				<Button label="No Delay" />
			</Tooltip>
			<Tooltip content="Delayed tooltip" delayShow={500} delayHide={200}>
				<Button label="With Delay" />
			</Tooltip>
		</div>
	);
}`}
			>
				<div className="flex gap-4 justify-center items-center py-6">
					<Tooltip content="Instant tooltip" delayShow={0} delayHide={0}>
						<Button label="No Delay" />
					</Tooltip>
					<Tooltip content="Delayed tooltip" delayShow={500} delayHide={200}>
						<Button label="With Delay" />
					</Tooltip>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Disabled"
				description={
					<div>
						<p>Disable the tooltip using the <code className="code-tag">disabled</code> prop.</p>
					</div>
				}
				id="disabled"
				code={`import { Tooltip, Button } from "lambda-ui-components";

export default function App() {
	return (
		<Tooltip content="This won't appear" disabled>
			<Button label="Disabled Tooltip" />
		</Tooltip>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Tooltip content="This won't appear" disabled>
						<Button label="Disabled Tooltip" />
					</Tooltip>
				</div>
			</PropertyLayout>
		</>
	);
};
