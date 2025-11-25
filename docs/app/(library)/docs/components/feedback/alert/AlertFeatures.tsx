"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Alert } from "lambda-ui-components";
import { useState } from "react";
import { Rocket } from "lucide-react";

export const AlertFeatures = () => {
	const [showAlert, setShowAlert] = useState(true);

	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Alert"
				description="Experiment with all the properties of the Alert component in real time."
				propConfigs={[
					{
						name: "message",
						type: "string",
						defaultValue: "This is an alert message",
						default: "",
						label: "Message",
						description: "The content of the alert message.",
					},
					{
						name: "title",
						type: "string",
						defaultValue: "Alert Title",
						default: "",
						label: "Title",
						description: "The title of the alert.",
						isRequired: [true]
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Controls the color scheme of the alert.",
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "soft",
						default: "soft",
						label: "Variant",
						description: "Defines the visual style of the alert.",
						values: ["outline", "soft", "solid"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Controls the size of the alert.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Radius",
						description: "Defines the border radius of the alert.",
						values: ["none", "tiny", "small", "medium", "large"],
					},
					{
						name: "showIcon",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Show Icon",
						description: "If true, displays an icon based on the color.",
					},
				]}
			>
				<Alert
					message="This is an alert message"
					title="Alert Title"
					color="info"
				/>
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Alert } from "lambda-ui-components";

export default function App() {
	return (
		<Alert
			color="success"
			variant="soft"
			title="Success!"
			message="Your changes have been saved successfully." 
		/>
	);
}`}
			/>

			<PropertyLayout
				title="Custom Icon"
				description={
					<div>
						<p>You can use a custom SVG icon with the <code className="code-tag">customIcon</code> prop. </p>
						<p><span className="note-tag">Note:</span> Custom icons only work with the <code className="code-tag">neutral</code> color <code className="code-tag">variant</code>, as other colors use predefined semantic icons.</p>
					</div>
				}
				id="custom-icon"
				code={`import { Alert } from "lambda-ui-components";
import { Rocket } from "lucide-react";

export default function App() {
	return (
		<Alert
			color="primary"
			variant="soft"
			title="New Feature!"
			message="Check out our latest update."
			customIcon={<Rocket />}
		/>
	);
}`}
			>
				<div className="flex justify-center items-center py-6 w-full">
					<Alert
						color="neutral"
						variant="soft"
						title="New Feature!"
						message="Check out our latest update."
						customIcon={<Rocket />}
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Close Button"
				description={
					<div>
						<p>When you provide an <code className="code-tag">onClose</code> callback, a close button will automatically appear on the alert. This allows users to dismiss the alert.</p>
					</div>
				}
				id="with-close"
				code={`import { Alert } from "lambda-ui-components";
import { useState } from "react";

export default function App() { 

	return (
		<>
			{showAlert && (
				<Alert
					color="warning"
					variant="soft"
					title="Warning"
					message="This action cannot be undone."
					onClose={() => alert("Close")}
				/>
			)}
		</>
	);
}`}
			>
				<div className="flex justify-center items-center py-6 w-full">
					<Alert
						color="warning"
						variant="soft"
						title="Warning"
						message="This action cannot be undone."
						onClose={() => alert("Close")}
					/>
				</div>
			</PropertyLayout>
		</>
	);
};
