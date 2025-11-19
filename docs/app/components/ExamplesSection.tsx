"use client";
import {
	Button,
	Input,
	Select,
	Checkbox,
	Slider,
	Tabs,
	Dropdown,
	Divider,
	Tooltip,
	Tag,
} from "lambda-ui-components";
import { ExampleCard, ExampleCardProps } from "./ExampleCard";
import { useState } from "react";
import { File, FilePlus, FileUp, FolderOpen, LogOut, Printer, Settings, X } from "lucide-react";

export function ExamplesSection() {
	const [value, setValue] = useState(50);

	const examples: ExampleCardProps[] = [
		{
			title: "Button",
			children: <Button label="Button" />,
			code: `<Button label="Button" />`,
			status: "Stable",
		},
		{
			title: "Input",
			children: <Input label="Password" type="password" />,
			code: `<Input label="Password" type="password" />`,
			status: "Stable",
		},
		{
			title: "Select",
			children: (
				<Select
					label="Select"
					options={[
						{ value: "1", label: "Option 1" },
						{ value: "2", label: "Option 2" },
					]}
				/>
			),
			code: `
<Select
	label="Select"
	options={[
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
	]}
/>`,
			status: "Stable",
		},
		{
			title: "Checkbox",
			children: <Checkbox label="Checkbox" />,
			code: `<Checkbox label="Checkbox" />`,
			status: "Stable",
		},
		{
			title: "Slider",
			children: (
				<Slider
					value={value}
					radius={"full"}
					onChange={(value) => setValue(value as number)}
					onInput={(value) => setValue(value as number)}
				/>
			),
			code: `
<Slider
	value={value}
	radius={"full"}
	onChange={(value) => setValue(value as number)}
	onInput={(value) => setValue(value as number)}
/>`,
			status: "Stable",
		},
		{
			title: "Tabs",
			children: (
				<Tabs defaultValue="Tab 1" variant="box" color="primary" size="small">
					<Tabs.List>
						<Tabs.Tab title="Tab 1" />
						<Tabs.Tab title="Tab 2" />
						<Tabs.Tab title="Tab 3" />
					</Tabs.List>
					<Tabs.Panels>
						<Tabs.Panel>
							<p>Content 1</p>
						</Tabs.Panel>
						<Tabs.Panel>
							<p>Content 2</p>
						</Tabs.Panel>
						<Tabs.Panel>
							<p>Content 3</p>
						</Tabs.Panel>
					</Tabs.Panels>
				</Tabs>
			),
			code: `
<Tabs defaultValue="Tab 1" variant="box" color="primary" size="small">
	<Tabs.List>
		<Tabs.Tab title="Tab 1" />
    	<Tabs.Tab title="Tab 2" />
		<Tabs.Tab title="Tab 3" />
	</Tabs.List>
	<Tabs.Panels>
		<Tabs.Panel>
			<p>Content 1</p>
		</Tabs.Panel>
		<Tabs.Panel>
			<p>Content 2</p>
		</Tabs.Panel>
		<Tabs.Panel>
			<p>Content 3</p>
		</Tabs.Panel>
	</Tabs.Panels>
</Tabs>
            `,
			status: "Stable",
		},
		{
			title: "Dropdown",
			children: (
				<Dropdown icon={<File />} text="File" radius="small">
					<Dropdown.Item
						icon={<FolderOpen />}
						text="Open"
						shortcutKeys={["Ctrl", "O"]}
						onClick={() => alert("Open")}
					/>
					<Dropdown.Item icon={<FilePlus />} text="New" shortcutKeys={["Ctrl", "N"]} />
					<Dropdown.Item icon={<X />} text="Close" shortcutKeys={["Ctrl", "C"]} />
					<Divider contentPosition="start">Document</Divider>
					<Dropdown.Item icon={<Printer />} text="Print" shortcutKeys={["Ctrl", "P"]} />
					<Dropdown.Item icon={<FileUp />} text="Export" shortcutKeys={["Ctrl", "E"]} />
					<Divider contentPosition="start">Settings</Divider>
					<Dropdown.Item
						icon={<Settings />}
						text="Preferences"
						shortcutKeys={["Ctrl", "P"]}
						url="/preferences"
					/>
					<Dropdown.Item
						icon={<LogOut />}
						text="Logout"
						shortcutKeys={["Ctrl", "L"]}
						url="/logout"
					/>
					<Divider contentPosition="start">User</Divider>
					<Dropdown.ItemCustom>
						<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
							<img
								style={{
									width: "24px",
									height: "24px",
									borderRadius: "50%",
									border: "2px solid purple",
								}}
								src="https://placehold.co/50x50?text=J+D"
								alt=""
							/>
							<div style={{ display: "flex", flexDirection: "column", gap: "0.05rem" }}>
								<span style={{ fontWeight: "bold" }}>John Doe</span>
								<span style={{ color: "var(--disabled-color)", fontSize: "var(--font-size-xs)" }}>
									john.doe@gmail.com
								</span>
							</div>
						</div>
					</Dropdown.ItemCustom>
				</Dropdown>
			),
			code: `
<Dropdown icon={<File />} text="File" radius="small">
    <Dropdown.Item
	icon={<FolderOpen />}
	text="Open"
	shortcutKeys={["Ctrl", "O"]}
	onClick={() => alert("Open")}
    />
    <Dropdown.Item icon={<FilePlus />} text="New" shortcutKeys={["Ctrl", "N"]} />
    <Dropdown.Item icon={<X />} text="Close" shortcutKeys={["Ctrl", "C"]} />
    <Divider contentPosition="start">Document</Divider>
    <Dropdown.Item icon={<Printer />} text="Print" shortcutKeys={["Ctrl", "P"]} />
    <Dropdown.Item icon={<FileUp />} text="Export" shortcutKeys={["Ctrl", "E"]} />
    <Divider contentPosition="start">Settings</Divider>
    <Dropdown.Item icon={<Settings />} text="Preferences" shortcutKeys={["Ctrl", "P"]} url="/preferences" />
    <Dropdown.Item icon={<LogOut />} text="Logout" shortcutKeys={["Ctrl", "L"]} url="/logout" />
    <Divider contentPosition="start">User</Divider>
    <Dropdown.ItemCustom>
		<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
			<img
				style={{
					width: "24px",
				height: "24px",
					borderRadius: "50%",
					border: "2px solid purple",
				}}
				src="https://placehold.co/50x50?text=J+D"
							alt=""
			/>
			<div style={{ display: "flex", flexDirection: "column", gap: "0.05rem" }}>
				<span style={{ fontWeight: "bold" }}>John Doe</span>
				<span style={{ color: "var(--disabled-color)", fontSize: "var(--font-size-xs)" }}>
					john.doe@gmail.com
				</span>
			</div>
		</div>
	</Dropdown.ItemCustom>
</Dropdown>
            `,
			status: "Stable",
		},
		{
			title: "Tooltip",
			children: (
				<Tooltip
					content="Tooltip Example"
					color="primary"
					position="top-center"
					delayShow={100}
					delayHide={100}
					offset={10}
				>
					<Tag text="Hover me" className="px-10" />
				</Tooltip>
			),
			code: `
<Tooltip
	content="Tooltip Example"
	color="primary"
	position="top-center"
	delayShow={100}
	delayHide={100}
	offset={10}
>
	<div className=" bg-cyan-400/10 px-2 py-1 rounded-sm">Hover me</div>
</Tooltip>
            `,
			status: "Stable",
		},
	];
	return (
		<section className="flex flex-col items-center justify-center gap-8 w-full my-25">
			<h2 className="text-5xl font-bold mb-6">See in action</h2>
			<section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 px-14 min-h-[400px] w-full">
				{examples.map((example, index) => (
					<ExampleCard key={index} {...example}>
						{example.children}
					</ExampleCard>
				))}
			</section>
		</section>
	);
}
