"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Tag, TreeView } from "lambda-ui-components";
import { useState } from "react";
import {
	Users,
	Settings,
	Briefcase,
	TrendingUp,
	DollarSign,
	BookOpen,
	UserCheck,
	Scale,
} from "lucide-react";

const treeData = [
	{
		id: "root",
		label: "Root",
		children: [
			{
				id: "child-1",
				label: "Child 1",
				children: [
					{ id: "grandchild-1", label: "Grandchild 1" },
					{ id: "grandchild-2", label: "Grandchild 2" },
				],
			},
			{
				id: "child-2",
				label: "Child 2",
			},
		],
	},
	{
		id: "child-3",
		label: "Child 3",
		children: [
			{
				id: "grandchild-3",
				label: "Grandchild 3",
			},
			{
				id: "grandchild-4",
				label: "Grandchild 4",
				children: [
					{
						id: "grandgrandchild-1",
						label: "Grandgrandchild 1",
					},
					{
						id: "grandgrandchild-2",
						label: "Grandgrandchild 2",
					},
					{
						id: "grandgrandchild-3",
						label: "Grandgrandchild 3",
					},
				],
			},
		],
	},
];

const treeDataDirectory = [
	{
		id: "root",
		label: "Components",
		children: [
			{
				id: "ui",
				label: "UI",
				children: [
					{ id: "button", label: "Button.tsx" },
					{ id: "input", label: "Input.tsx" },
				],
			},
			{
				id: "layout",
				label: "Layout",
				children: [
					{ id: "header", label: "Header.tsx" },
					{ id: "sidebar", label: "Sidebar.tsx" },
				],
			},
		],
	},
	{
		id: "hooks",
		label: "Hooks",
		children: [
			{ id: "use-fetch", label: "useFetch.ts" },
			{ id: "use-state", label: "useState.ts" },
		],
	},
];

const treeDataOrganization = [
	{
		id: "corp",
		label: "Corporativo Global",
		icon: <Users size={16} />,
		children: [
			{
				id: "tech",
				label: "Tecnología",
				icon: <Settings size={16} />,
				children: [
					{ id: "dev", label: "Desarrollo", icon: <Briefcase size={16} /> },
					{ id: "ops", label: "Operaciones", icon: <TrendingUp size={16} /> },
				],
			},
			{
				id: "mkt",
				label: "Marketing",
				icon: <DollarSign size={16} />,
				children: [
					{ id: "social", label: "Redes Sociales", icon: <BookOpen size={16} /> },
				],
			},
		],
	},
];

export const TreeViewFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="TreeView"
				description="Experiment with the TreeView component properties."
				propConfigs={[
					{
						name: "size",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Size",
						description: "Size of the tree items.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "isDirectory",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Is Directory",
						description: "Render as a directory structure (folder icons).",
					},
					{
						name: "showLines",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show Lines",
						description: "Show connection lines between nodes.",
					},
					{
						name: "styleLines",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Style Lines",
						description: "Style of the connection lines.",
						values: ["solid", "dashed", "dotted"],
					},
				]}
			>
				{(props) => (
					<div className="flex justify-start items-start h-full w-full max-w-sm">
						<TreeView {...props} data={treeData} />
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>Basic usage of TreeView with hierarchical data.</p>
					</div>
				}
				id="usage"
				code={`import { TreeView } from "lambda-ui-components";

const data = [
	{
		id: "root",
		label: "Root",
		children: [
			{
				id: "child-1",
				label: "Child 1",
				children: [
					{ id: "grandchild-1", label: "Grandchild 1" },
					{ id: "grandchild-2", label: "Grandchild 2" },
				],
			},
			{ id: "child-2", label: "Child 2" },
		],
	},
];

export default function App() {
	return <TreeView data={data} />;
}`}
			>
				<div className="w-full max-w-sm border border-border rounded-md p-4">
					<TreeView data={treeData} />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Directory Mode"
				description={
					<div>
						<p>Use <code className="code-tag">isDirectory</code> prop to render the tree as a file system structure with folder icons.</p>
					</div>
				}
				id="directory"
				code={`import { TreeView } from "lambda-ui-components";

const data = [
	{
		id: "src",
		label: "src",
		children: [
			{ id: "components", label: "components" },
			{ id: "hooks", label: "hooks" },
		],
	},
];

export default function App() {
	return <TreeView data={data} isDirectory />;
}`}
			>
				<div className="w-full max-w-sm border border-border rounded-md p-4">
					<TreeView data={treeDataDirectory} isDirectory />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Lines"
				description={
					<div>
						<p>Enable connection lines with <code className="code-tag">showLines</code> and customize their style with <code className="code-tag">styleLines</code>.</p>
					</div>
				}
				id="lines"
				code={`import { TreeView } from "lambda-ui-components";

export default function App() {
	return (
		<TreeView 
			data={data} 
			showLines 
			styleLines="dashed" 
		/>
	);
}`}
			>
				<div className="w-full max-w-sm border border-border rounded-md p-4">
					<TreeView data={treeData} showLines styleLines="dashed" />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Custom Icons"
				description={
					<div>
						<p>You can provide custom icons for each node in the data structure.</p>
					</div>
				}
				id="custom-icons"
				code={`import { TreeView } from "lambda-ui-components";
import { Users, Settings } from "lucide-react";

const data = [
	{
		id: "corp",
		label: "Corporativo",
		icon: <Users size={16} />,
		children: [
			{ id: "tech", label: "Tecnología", icon: <Settings size={16} /> },
		],
	},
];

export default function App() {
	return <TreeView data={data} />;
}`}
			>
				<div className="w-full max-w-sm border border-border rounded-md p-4">
					<TreeView data={treeDataOrganization} />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Selection"
				description={
					<div>
						<p>Manage selection state with <code className="code-tag">selectedId</code> and <code className="code-tag">onNodeSelect</code>.</p>
					</div>
				}
				id="selection"
				code={`import { TreeView } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [selected, setSelected] = useState("child-1");

	return (
		<TreeView 
			data={data} 
			selectedId={selected} 
			onNodeSelect={setSelected} 
		/>
	);
}`}
			>
				<div className="w-full max-w-sm border border-border rounded-md p-4">
					{(() => {
						const [selected, setSelected] = useState<string | undefined>("child-1");
						return (
							<TreeView
								data={treeData}
								selectedId={selected}
								onNodeSelect={setSelected}
							/>
						);
					})()}
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Default Expanded"
				description={
					<div>
						<p>Use <code className="code-tag">defaultExpanded</code> to specify which nodes should be expanded initially.</p>
					</div>
				}
				id="default-expanded"
				code={`import { TreeView } from "lambda-ui-components";

const data = [
	{
		id: "root",
		label: "Root",
		children: [
			{
				id: "child-1",
				label: "Child 1",
				children: [{ id: "grandchild-1", label: "Grandchild 1" }],
			},
		],
	},
];

export default function App() {
	return <TreeView data={data} defaultExpanded={["root", "child-1"]} />;
}`}
			>
				<div className="w-full max-w-sm border border-border rounded-md p-4">
					<TreeView data={treeData} defaultExpanded={["root", "child-1"]} />
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Custom Label Rendering"
				description={
					<div>
						<p>Customize how node labels are rendered using the <code className="code-tag">renderLabel</code> prop.</p>
					</div>
				}
				id="render-label"
				code={`import { TreeView } from "lambda-ui-components";

export default function App() {
	return (
		<TreeView 
			data={data} 
			renderLabel={(node) => (
				<span style={{ fontWeight: node.children ? "flex items-center gap-2 font-bold rounded-sm px-2 py-1" : "font-medium text-gray-500" }}>
					{node.label} {node.children ? <Tag size="tiny" radius="tiny" color="danger" variant="solid" text={node.children.length.toString()} /> : ""}
				</span>
			)} 
		/>
	);
}`}
			>
				<div className="w-full max-w-sm border border-border rounded-md p-4">
					<TreeView
						data={treeData}
						renderLabel={(node) => (
							<span className={node.children ? "flex items-center gap-2 font-bold rounded-sm px-2 py-1 " : "font-medium text-gray-500"}>
								{node.label} {node.children ? <Tag size="tiny" radius="tiny" color="danger" variant="solid" text={node.children.length.toString()} /> : ""}
							</span>
						)}
					/>
				</div>
			</PropertyLayout>
		</>
	);
};
