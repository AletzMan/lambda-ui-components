"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Avatar } from "lambda-ui-components";

export const AvatarFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Avatar"
				description="Experiment with all the properties of the Avatar component in real time."
				propConfigs={[
					{
						name: "name",
						type: "string",
						defaultValue: "John Doe",
						default: "",
						label: "Name",
						description: "Name of the user (used for initials).",
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the avatar.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "animate",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Animate",
						description: "Enable hover animation.",
					},
				]}
			>
				<Avatar name="John Doe" />
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Avatar } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<Avatar name="John Doe" />
			<Avatar name="Jane Smith" />
			<Avatar name="Bob Johnson" />
		</div>
	);
}`}
			>
				<div className="flex gap-4 justify-center items-center py-6">
					<Avatar name="John Doe" />
					<Avatar name="Jane Smith" />
					<Avatar name="Bob Johnson" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Image"
				description={
					<div>
						<p>Provide an image URL using the <code className="code-tag">src</code> prop.</p>
					</div>
				}
				id="with-image"
				code={`import { Avatar } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<Avatar 
				name="John Doe" 
				src="https://i.pravatar.cc/150?img=1" 
			/>
			<Avatar 
				name="Jane Smith" 
				src="https://i.pravatar.cc/150?img=2" 
			/>
			<Avatar 
				name="Bob Johnson" 
				src="https://i.pravatar.cc/150?img=3" 
			/>
		</div>
	);
}`}
			>
				<div className="flex gap-4 justify-center items-center py-6">
					<Avatar name="John Doe" src="https://i.pravatar.cc/150?img=1" />
					<Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" />
					<Avatar name="Bob Johnson" src="https://i.pravatar.cc/150?img=3" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Sizes"
				description={
					<div>
						<p>Avatar supports five sizes: <code className="code-tag">tiny</code>, <code className="code-tag">small</code>, <code className="code-tag">medium</code>, <code className="code-tag">large</code>, and <code className="code-tag">xlarge</code>.</p>
					</div>
				}
				id="sizes"
				code={`import { Avatar } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4 items-center">
			<Avatar name="John Doe" size="tiny" />
			<Avatar name="John Doe" size="small" />
			<Avatar name="John Doe" size="medium" />
			<Avatar name="John Doe" size="large" /> 
		</div>
	);
}`}
			>
				<div className="flex gap-4 items-center justify-center py-6">
					<Avatar name="John Doe" size="tiny" />
					<Avatar name="John Doe" size="small" />
					<Avatar name="John Doe" size="medium" />
					<Avatar name="John Doe" size="large" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Animation"
				description={
					<div>
						<p>Enable hover animation using the <code className="code-tag">animate</code> prop.</p>
					</div>
				}
				id="animated"
				code={`import { Avatar } from "lambda-ui-components";

export default function App() {
	return (
		<div className="flex gap-4">
			<Avatar name="John Doe" animate />
			<Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" animate />
		</div>
	);
}`}
			>
				<div className="flex gap-4 justify-center items-center py-6">
					<Avatar name="John Doe" animate />
					<Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" animate />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Avatar Group"
				description={
					<div>
						<p>Use <code className="code-tag">Avatar.Group</code> to display multiple avatars in a stacked layout.</p>
					</div>
				}
				id="group"
				code={`import { Avatar } from "lambda-ui-components";

export default function App() {
	const users = [
		{ name: "John Doe", src: "https://i.pravatar.cc/150?img=1" },
		{ name: "Jane Smith", src: "https://i.pravatar.cc/150?img=2" },
		{ name: "Bob Johnson", src: "https://i.pravatar.cc/150?img=3" },
		{ name: "Alice Williams" },
		{ name: "Charlie Brown" },
	];

	return <Avatar.Group users={users} />;
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Avatar.Group
						users={[
							{ name: "John Doe", src: "https://i.pravatar.cc/150?img=1" },
							{ name: "Jane Smith", src: "https://i.pravatar.cc/150?img=2" },
							{ name: "Bob Johnson", src: "https://i.pravatar.cc/150?img=3" },
							{ name: "Alice Williams" },
							{ name: "Charlie Brown" },
						]}
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Group with Max"
				description={
					<div>
						<p>Limit the number of visible avatars using the <code className="code-tag">max</code> prop. Remaining avatars will be shown as a count.</p>
					</div>
				}
				id="group-max"
				code={`import { Avatar } from "lambda-ui-components";

export default function App() {
	const users = [
		{ name: "John Doe", src: "https://i.pravatar.cc/150?img=1" },
		{ name: "Jane Smith", src: "https://i.pravatar.cc/150?img=2" },
		{ name: "Bob Johnson", src: "https://i.pravatar.cc/150?img=3" },
		{ name: "Alice Williams" },
		{ name: "Charlie Brown" },
		{ name: "David Lee" },
		{ name: "Emma Davis" },
	];

	return <Avatar.Group users={users} max={3} />;
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Avatar.Group
						users={[
							{ name: "John Doe", src: "https://i.pravatar.cc/150?img=1" },
							{ name: "Jane Smith", src: "https://i.pravatar.cc/150?img=2" },
							{ name: "Bob Johnson", src: "https://i.pravatar.cc/150?img=3" },
							{ name: "Alice Williams" },
							{ name: "Charlie Brown" },
							{ name: "David Lee" },
							{ name: "Emma Davis" },
						]}
						max={3}
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Group Sizes"
				description={
					<div>
						<p>Avatar groups also support different sizes.</p>
					</div>
				}
				id="group-sizes"
				code={`import { Avatar } from "lambda-ui-components";

export default function App() {
	const users = [
		{ name: "John Doe", src: "https://i.pravatar.cc/150?img=1" },
		{ name: "Jane Smith", src: "https://i.pravatar.cc/150?img=2" },
		{ name: "Bob Johnson", src: "https://i.pravatar.cc/150?img=3" },
	];

	return (
		<div className="flex flex-col gap-4">
			<Avatar.Group users={users} size="small" />
			<Avatar.Group users={users} size="medium" />
			<Avatar.Group users={users} size="large" />
		</div>
	);
}`}
			>
				<div className="flex flex-col gap-4 justify-center items-center py-6">
					<Avatar.Group
						users={[
							{ name: "John Doe", src: "https://i.pravatar.cc/150?img=1" },
							{ name: "Jane Smith", src: "https://i.pravatar.cc/150?img=2" },
							{ name: "Bob Johnson", src: "https://i.pravatar.cc/150?img=3" },
						]}
						size="small"
					/>
					<Avatar.Group
						users={[
							{ name: "John Doe", src: "https://i.pravatar.cc/150?img=1" },
							{ name: "Jane Smith", src: "https://i.pravatar.cc/150?img=2" },
							{ name: "Bob Johnson", src: "https://i.pravatar.cc/150?img=3" },
						]}
						size="medium"
					/>
					<Avatar.Group
						users={[
							{ name: "John Doe", src: "https://i.pravatar.cc/150?img=1" },
							{ name: "Jane Smith", src: "https://i.pravatar.cc/150?img=2" },
							{ name: "Bob Johnson", src: "https://i.pravatar.cc/150?img=3" },
						]}
						size="large"
					/>
				</div>
			</PropertyLayout>
		</>
	);
};
