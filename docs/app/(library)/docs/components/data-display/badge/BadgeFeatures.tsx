"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Badge, Button } from "lambda-ui-components";
import { Bell, Mail, ShoppingCart } from "lucide-react";

export const BadgeFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Badge"
				description="Experiment with all the properties of the Badge component in real time. Note: Badge uses absolute positioning and should be placed inside a relative container."
				propConfigs={[
					{
						name: "text",
						type: "string",
						defaultValue: undefined,
						default: undefined,
						label: "Text",
						description: "Text to display in the badge. Leave empty to use count or show as indicator.",
					},
					{
						name: "count",
						type: "number",
						defaultValue: undefined,
						default: undefined,
						label: "Count",
						description: "Numeric count to display. Set to 0 to hide. Takes precedence over text.",
					},
					{
						name: "maxCount",
						type: "number",
						defaultValue: undefined,
						default: undefined,
						label: "Max Count",
						description: "Maximum count to display. Values exceeding this show as 'max+'.",
					},
					{
						name: "color",
						type: "color",
						defaultValue: "default",
						default: "default",
						label: "Color",
						description: "Color scheme of the badge.",
						values: ["default", "primary", "secondary", "success", "danger", "warning", "info"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the badge.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "full",
						default: "full",
						label: "Radius",
						description: "Border radius of the badge.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					},
				]}
			>
				{(props) => (
					<div className="relative inline-block">
						<Button icon={<Bell />} />
						<Badge {...props} />
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>Badge uses absolute positioning and should be placed inside a container with <code className="code-tag">relative</code> positioning. It can display text, numbers, or serve as a simple indicator.</p>
					</div>
				}
				id="usage"
				code={`import { Badge, Button } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<Button label="Messages">
				<Badge text="New" />
			</Button>
			<Button label="Notifications">
				<Badge count={5} color="danger" />
			</Button>
			<Button label="Mail" icon={<Mail />}>
				<Badge color="danger" />
			</Button>
		</div>
	);
}`}
			>
				<div className="flex gap-10 justify-center items-center py-6 px-4">
					<Button label="Messages">
						Messages
						<Badge text="New" />
					</Button>
					<Button label="Notifications">
						Notifications
						<Badge count={5} color="danger" />
					</Button>
					<Button label="Mail" icon={<Mail />} >
						<Badge color="danger" />
					</Button>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Count"
				description={
					<div>
						<p>Use the <code className="code-tag">count</code> prop to display a numeric badge. The badge automatically hides when count is 0 or undefined.</p>
					</div>
				}
				id="count"
				code={`import { Badge, Button } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<Button label="Inbox">
				Inbox
				<Badge count={5} />
			</Button>
			<Button label="Tasks">
				Tasks
				<Badge count={10} color="primary" />
			</Button>
			<Button label="Alerts">
				Alerts
				<Badge count={99} color="success" />
			</Button>
		</div>
	);
}`}
			>
				<div className="flex gap-8 justify-center items-center py-6">
					<Button label="Inbox">
						Inbox
						<Badge count={5} />
					</Button>
					<Button label="Tasks">
						Tasks
						<Badge count={10} color="primary" />
					</Button>
					<Button label="Alerts">
						Alerts
						<Badge count={99} color="success" />
					</Button>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Max Count"
				description={
					<div>
						<p>Use <code className="code-tag">maxCount</code> to limit the displayed number. When <code className="code-tag">count</code> exceeds <code className="code-tag">maxCount</code>, the badge displays "maxCount+" to indicate there are more items.</p>
					</div>
				}
				id="max-count"
				code={`import { Badge, Button } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<Button label="Messages">
				Messages
				<Badge count={50} maxCount={9} />
			</Button>
			
			<Button label="Notifications">
				Notifications
				<Badge count={100} maxCount={99} color="danger" />
			</Button>
			
			<Button label="Updates">
				Updates
				<Badge count={1000} maxCount={999} color="warning" />
			</Button>
		</div>
	);
}`}
			>
				<div className="flex gap-8 justify-center items-center py-6">
					<Button label="Messages">
						Messages
						<Badge count={50} maxCount={9} />
					</Button>

					<Button label="Notifications">
						Notifications
						<Badge count={100} maxCount={99} color="danger" />
					</Button>

					<Button label="Updates">
						Updates
						<Badge count={1000} maxCount={999} color="warning" />
					</Button>
				</div>
			</PropertyLayout>

		</>
	);
};
