"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Skeleton } from "lambda-ui-components";

export const SkeletonFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Skeleton"
				description="Experiment with all the properties of the Skeleton component in real time."
				propConfigs={[
					{
						name: "shape",
						type: "radio",
						defaultValue: "rect",
						default: "rect",
						label: "Shape",
						description: "Shape of the skeleton.",
						values: ["rect", "circle"],
					},
					{
						name: "animationType",
						type: "radio",
						defaultValue: "fade",
						default: "fade",
						label: "Animation Type",
						description: "Type of loading animation.",
						values: ["fade", "wave"],
					},
					{
						name: "rounded",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Rounded",
						description: "If true and shape is rect, adds rounded corners.",
					},
					{
						name: "width",
						type: "number",
						defaultValue: 200,
						default: "100%",
						label: "Width",
						description: "Width of the skeleton (in pixels).",
					},
					{
						name: "height",
						type: "number",
						defaultValue: 16,
						default: 16,
						label: "Height",
						description: "Height of the skeleton (in pixels).",
					},
				]}
			>
				<Skeleton />
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Skeleton } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton width={200} height={16} />
			<Skeleton width={150} height={16} />
			<Skeleton width={180} height={16} />
		</div>
	);
}`}
			>
				<div className="flex flex-col gap-2 py-6">
					<Skeleton width={200} height={16} />
					<Skeleton width={150} height={16} />
					<Skeleton width={180} height={16} />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Circle Shape"
				description={
					<div>
						<p>Use the <code className="code-tag">circle</code> shape for avatars or profile pictures.</p>
					</div>
				}
				id="circle"
				code={`import { Skeleton } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4 items-center">
			<Skeleton shape="circle" height={40} />
			<Skeleton shape="circle" height={60} />
			<Skeleton shape="circle" height={80} />
		</div>
	);
}`}
			>
				<div className="flex gap-4 items-center py-6">
					<Skeleton shape="circle" height={40} />
					<Skeleton shape="circle" height={60} />
					<Skeleton shape="circle" height={80} />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Rounded Corners"
				description={
					<div>
						<p>Add rounded corners to rectangular skeletons with the <code className="code-tag">rounded</code> prop.</p>
					</div>
				}
				id="rounded"
				code={`import { Skeleton } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton width={200} height={100} rounded />
			<Skeleton width={200} height={16} rounded />
		</div>
	);
}`}
			>
				<div className="flex flex-col gap-2 py-6">
					<Skeleton width={200} height={100} rounded />
					<Skeleton width={200} height={16} rounded />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Wave Animation"
				description={
					<div>
						<p>Use the <code className="code-tag">wave</code> animation type for a shimmer effect.</p>
					</div>
				}
				id="wave"
				code={`import { Skeleton } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton width={200} height={16} animationType="wave" />
			<Skeleton width={150} height={16} animationType="wave" />
			<Skeleton width={180} height={16} animationType="wave" />
		</div>
	);
}`}
			>
				<div className="flex flex-col gap-2 py-6">
					<Skeleton width={200} height={16} animationType="wave" />
					<Skeleton width={150} height={16} animationType="wave" />
					<Skeleton width={180} height={16} animationType="wave" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Card Skeleton"
				description={
					<div>
						<p>Combine multiple skeletons to create loading states for complex components like cards.</p>
					</div>
				}
				id="card"
				code={`import { Skeleton } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex flex-col gap-3 p-4 border rounded-lg" style={{ width: 300 }}>
			<Skeleton width="100%" height={150} rounded />
			<Skeleton width="80%" height={20} />
			<Skeleton width="100%" height={16} />
			<Skeleton width="90%" height={16} />
		</div>
	);
}`}
			>
				<div className="flex justify-center py-6">
					<div className="flex flex-col gap-3 p-4 border rounded-lg" style={{ width: 300 }}>
						<Skeleton width="100%" height={150} rounded />
						<Skeleton width="80%" height={20} />
						<Skeleton width="100%" height={16} />
						<Skeleton width="90%" height={16} />
					</div>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="User Profile Skeleton"
				description={
					<div>
						<p>Example of a user profile loading state combining circle and rectangle skeletons.</p>
					</div>
				}
				id="profile"
				code={`import { Skeleton } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-3 items-center">
			<Skeleton shape="circle" height={60} />
			<div className="flex flex-col gap-2">
				<Skeleton width={150} height={16} />
				<Skeleton width={100} height={14} />
			</div>
		</div>
	);
}`}
			>
				<div className="flex justify-center py-6">
					<div className="flex gap-3 items-center">
						<Skeleton shape="circle" height={60} />
						<div className="flex flex-col gap-2">
							<Skeleton width={150} height={16} />
							<Skeleton width={100} height={14} />
						</div>
					</div>
				</div>
			</PropertyLayout>
		</>
	);
};
