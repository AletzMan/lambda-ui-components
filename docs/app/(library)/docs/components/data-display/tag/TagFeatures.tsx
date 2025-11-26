"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Tag } from "lambda-ui-components";
import { Tag as TagIcon, X, CheckCircle, AlertTriangle, Info } from "lucide-react";

export const TagFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Tag"
				description="Experiment with all the properties of the Tag component in real time."
				propConfigs={[
					{
						name: "text",
						type: "string",
						defaultValue: "Tag",
						default: "Tag",
						label: "Text",
						description: "Text to display in the tag.",
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "subtle",
						default: "subtle",
						label: "Variant",
						description: "Visual style of the tag.",
						values: ["solid", "soft", "outline", "dashed", "subtle"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "primary",
						default: "primary",
						label: "Color",
						description: "Color scheme of the tag.",
						values: ["neutral", "primary", "secondary", "success", "danger", "warning", "info"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the tag.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Radius",
						description: "Border radius of the tag.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					}
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6">
						<Tag {...props} onClose={props.onClose ? () => alert("Closed!") : undefined} />
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>Tags are used to categorize or label content. They can contain text, icons, and be closable.</p>
					</div>
				}
				id="usage"
				code={`import { Tag } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-2">
			<Tag text="React" />
			<Tag text="TypeScript" color="info" />
			<Tag text="New" variant="solid" color="success" />
		</div>
	);
}`}
			>
				<div className="flex gap-4 justify-center items-center py-6">
					<Tag text="React" />
					<Tag text="TypeScript" color="info" />
					<Tag text="New" variant="solid" color="success" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Variants"
				description={
					<div>
						<p>Tag supports five variants: <code className="code-tag">solid</code>, <code className="code-tag">soft</code>, <code className="code-tag">outline</code>, <code className="code-tag">dashed</code>, and <code className="code-tag">subtle</code>.</p>
					</div>
				}
				id="variants"
				code={`import { Tag } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-2">
			<Tag text="Solid" variant="solid" />
			<Tag text="Soft" variant="soft" />
			<Tag text="Outline" variant="outline" />
			<Tag text="Dashed" variant="dashed" />
			<Tag text="Subtle" variant="subtle" />
		</div>
	);
}`}
			>
				<div className="flex flex-wrap gap-4 justify-center items-center py-6">
					<Tag text="Solid" variant="solid" />
					<Tag text="Soft" variant="soft" />
					<Tag text="Outline" variant="outline" />
					<Tag text="Dashed" variant="dashed" />
					<Tag text="Subtle" variant="subtle" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Colors"
				description={
					<div>
						<p>Tags come in various colors to communicate different states or categories.</p>
					</div>
				}
				id="colors"
				code={`import { Tag } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-2">
			<Tag text="Neutral" color="neutral" />
			<Tag text="Primary" color="primary" />
			<Tag text="Secondary" color="secondary" />
			<Tag text="Success" color="success" />
			<Tag text="Warning" color="warning" />
			<Tag text="Danger" color="danger" />
			<Tag text="Info" color="info" />
		</div>
	);
}`}
			>
				<div className="flex flex-wrap gap-4 justify-center items-center py-6">
					<Tag text="Neutral" color="neutral" />
					<Tag text="Primary" color="primary" />
					<Tag text="Secondary" color="secondary" />
					<Tag text="Success" color="success" />
					<Tag text="Warning" color="warning" />
					<Tag text="Danger" color="danger" />
					<Tag text="Info" color="info" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Sizes"
				description={
					<div>
						<p>Available in four sizes: <code className="code-tag">tiny</code>, <code className="code-tag">small</code>, <code className="code-tag">medium</code>, and <code className="code-tag">large</code>.</p>
					</div>
				}
				id="sizes"
				code={`import { Tag } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex items-center gap-2">
			<Tag text="Tiny" size="tiny" />
			<Tag text="Small" size="small" />
			<Tag text="Medium" size="medium" />
			<Tag text="Large" size="large" />
		</div>
	);
}`}
			>
				<div className="flex flex-wrap items-center gap-4 justify-center py-6">
					<Tag text="Tiny" size="tiny" />
					<Tag text="Small" size="small" />
					<Tag text="Medium" size="medium" />
					<Tag text="Large" size="large" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Icons"
				description={
					<div>
						<p>You can add icons to tags using the <code className="code-tag">icon</code> prop.</p>
					</div>
				}
				id="with-icons"
				code={`import { Tag } from "lambda-ui-components";
import { Tag as TagIcon, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function App() {
	return (
		<div className="flex gap-2">
			<Tag text="Label" icon={<TagIcon size={14} />} />
			<Tag text="Approved" color="success" icon={<CheckCircle size={14} />} />
			<Tag text="Warning" color="warning" icon={<AlertTriangle size={14} />} />
			<Tag text="Info" color="info" icon={<Info size={14} />} />
		</div>
	);
}`}
			>
				<div className="flex flex-wrap gap-4 justify-center items-center py-6">
					<Tag text="Label" icon={<TagIcon size={14} />} />
					<Tag text="Approved" color="success" icon={<CheckCircle size={14} />} />
					<Tag text="Warning" color="warning" icon={<AlertTriangle size={14} />} />
					<Tag text="Info" color="info" icon={<Info size={14} />} />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Closable Tags"
				description={
					<div>
						<p>Add the <code className="code-tag">onClose</code> prop to make a tag closable.</p>
					</div>
				}
				id="closable"
				code={`import { Tag } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-2">
			<Tag text="Closable" onClose={() => alert('Closed!')} />
			<Tag text="Removable" color="danger" variant="soft" onClose={() => {}} />
		</div>
	);
}`}
			>
				<div className="flex gap-4 justify-center items-center py-6">
					<Tag text="Closable" onClose={() => alert('Closed!')} />
					<Tag text="Removable" color="danger" variant="soft" onClose={() => { }} />
				</div>
			</PropertyLayout>

		</>
	);
};
