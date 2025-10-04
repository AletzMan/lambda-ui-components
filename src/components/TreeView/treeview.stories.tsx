import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "./TreeView";
import type { TreeNode } from "./treeview.types";
import { useState } from "react";

const meta: Meta<typeof TreeView> = {
	title: "Components/TreeView",
	component: TreeView,
	argTypes: {
		data: { table: { disable: true } },
		defaultExpanded: { table: { disable: true } },
		selectedId: { table: { disable: true } },
		onNodeSelect: { table: { disable: true } },
		renderLabel: { table: { disable: true } },
		size: { control: "inline-radio", options: ["small", "medium", "large"] },
	},
};

export default meta;

type Story = StoryObj<typeof TreeView>;

const treeData: TreeNode[] = [
	{
		id: "root",
		label: "Raíz",
		children: [
			{
				id: "1",
				label: "Carpeta 1",
				children: [
					{ id: "1-1", label: "Archivo 1-1" },
					{ id: "1-2", label: "Archivo 1-2" },
				],
			},
			{
				id: "2",
				label: "Carpeta 2",
				children: [
					{ id: "2-1", label: "Archivo 2-1" },
					{ id: "2-2", label: "Archivo 2-2", disabled: true },
				],
			},
			{ id: "3", label: "Archivo suelto" },
		],
	},
	{
		id: "main",
		label: "Main",
		children: [
			{
				id: "main-1",
				label: "Carpeta 1",
				children: [
					{ id: "main-1-1", label: "Archivo 1-1" },
					{ id: "main-1-2", label: "Archivo 1-2" },
				],
			},
			{
				id: "main-2",
				label: "Carpeta 2",
				children: [
					{ id: "main-2-1", label: "Archivo 2-1" },
					{ id: "main-2-2", label: "Archivo 2-2", disabled: true },
				],
			},
			{ id: "main-3", label: "Archivo suelto" },
		],
	},
];

export const Default: Story = {
	render: (args) => {
		const [selectedId, setSelectedId] = useState<string | undefined>();
		return (
			<div style={{ maxWidth: 400 }}>
				<TreeView
					{...args}
					data={treeData}
					selectedId={selectedId}
					onNodeSelect={setSelectedId}
					defaultExpanded={["root", "main"]}
				/>
				<div style={{ marginTop: 16 }}>
					<strong>Seleccionado:</strong> {selectedId || "Ninguno"}
				</div>
			</div>
		);
	},
	args: {
		size: "medium",
	},
};

export const CustomLabel: Story = {
	render: (args) => (
		<TreeView
			{...args}
			data={treeData}
			renderLabel={(node) => (
				<span style={{ color: node.disabled ? "#aaa" : "#0a0" }}>
					{node.label} {node.disabled ? "(Deshabilitado)" : ""}
				</span>
			)}
		/>
	),
	args: {
		size: "medium",
	},
};
