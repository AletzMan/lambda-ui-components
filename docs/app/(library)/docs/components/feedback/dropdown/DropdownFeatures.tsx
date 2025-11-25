"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Dropdown, Divider } from "lambda-ui-components";
import { Settings, User, LogOut, Mail, Bell, HelpCircle } from "lucide-react";

export const DropdownFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Dropdown"
				description="Experiment with all the properties of the Dropdown component in real time."
				childrenComponentsNames={[`<Dropdown.Item 
		icon={<User />} 
		text="Profile" 
		onSelectOption={() => console.log("Profile")} 
	/> 
	<Dropdown.Item 
		icon={<Settings />}  
		text="Settings" 
		onSelectOption={() => console.log("Settings")} 
	/>
	<Divider />
	<Dropdown.Item 
		icon={<LogOut />} 
		text="Logout" 
		onSelectOption={() => console.log("Logout")} 
	/>`]}
				propConfigs={[
					{
						name: "text",
						type: "string",
						defaultValue: "Options",
						default: "",
						label: "Text",
						description: "The text displayed on the dropdown button.",
					},
					{
						name: "variant",
						type: "radio",
						defaultValue: "solid",
						default: "solid",
						label: "Variant",
						description: "Visual style of the dropdown button.",
						values: ["solid", "outline", "text", "soft"],
					},
					{
						name: "size",
						type: "radio",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the dropdown button.",
						values: ["tiny", "small", "medium", "large"],
					},
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6">
						<Dropdown {...props}>
							<Dropdown.Item icon={<User />} text="Profile" onSelectOption={() => console.log("Profile")} />
							<Dropdown.Item icon={<Settings />} text="Settings" onSelectOption={() => console.log("Settings")} />
							<Divider />
							<Dropdown.Item icon={<LogOut />} text="Logout" onSelectOption={() => console.log("Logout")} />
						</Dropdown>
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Dropdown, Divider } from "lambda-ui-components";
import { User, Settings, LogOut } from "lucide-react";

export default function App() {
	return (
		<Dropdown text="Options">
			<Dropdown.Item 
				icon={<User />} 
				text="Profile" 
				onSelectOption={() => console.log("Profile")} 
			/>
			<Dropdown.Item 
				icon={<Settings />} 
				text="Settings" 
				onSelectOption={() => console.log("Settings")} 
			/>
			<Divider />
			<Dropdown.Item 
				icon={<LogOut />} 
				text="Logout" 
				onSelectOption={() => console.log("Logout")} 
			/>
		</Dropdown>
	);
}`}
			/>

			<PropertyLayout
				title="With Icons Only"
				description={
					<p>You can create an icon-only dropdown by omitting the <code className="code-tag">text</code> prop and only providing an <code className="code-tag">icon</code>.</p>
				}
				id="icon-only"
				code={`import { Dropdown } from "lambda-ui-components";
import { Settings, User, Bell, Mail } from "lucide-react";

export default function App() {
	return (
		<Dropdown icon={<Settings />}>
			<Dropdown.Item icon={<User />} text="Profile" />
			<Dropdown.Item icon={<Bell />} text="Notifications" />
			<Dropdown.Item icon={<Mail />} text="Messages" />
		</Dropdown>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Dropdown icon={<Settings />}>
						<Dropdown.Item icon={<User />} text="Profile" onSelectOption={() => console.log("Profile")} />
						<Dropdown.Item icon={<Bell />} text="Notifications" onSelectOption={() => console.log("Notifications")} />
						<Dropdown.Item icon={<Mail />} text="Messages" onSelectOption={() => console.log("Messages")} />
					</Dropdown>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Keyboard Shortcuts"
				description={
					<p>Display keyboard shortcuts next to menu items using the <code className="code-tag">shortcutKeys</code> prop.</p>
				}
				id="shortcuts"
				code={`import { Dropdown, Divider } from "lambda-ui-components";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";

export default function App() {
	return (
		<Dropdown text="Menu">
			<Dropdown.Item 
				icon={<User />} 
				text="Profile" 
				shortcutKeys={["⌘", "P"]}
			/>
			<Dropdown.Item 
				icon={<Settings />} 
				text="Settings" 
				shortcutKeys={["⌘", ","]}
			/>
			<Dropdown.Item 
				icon={<HelpCircle />} 
				text="Help" 
				shortcutKeys={["⌘", "?"]}
			/>
			<Divider />
			<Dropdown.Item 
				icon={<LogOut />} 
				text="Logout" 
				shortcutKeys={["⌘", "Q"]}
			/>
		</Dropdown>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Dropdown text="Menu">
						<Dropdown.Item
							icon={<User />}
							text="Profile"
							shortcutKeys={["⌘", "P"]}
							onSelectOption={() => console.log("Profile")}
						/>
						<Dropdown.Item
							icon={<Settings />}
							text="Settings"
							shortcutKeys={["⌘", ","]}
							onSelectOption={() => console.log("Settings")}
						/>
						<Dropdown.Item
							icon={<HelpCircle />}
							text="Help"
							shortcutKeys={["⌘", "?"]}
							onSelectOption={() => console.log("Help")}
						/>
						<Divider />
						<Dropdown.Item
							icon={<LogOut />}
							text="Logout"
							shortcutKeys={["⌘", "Q"]}
							onSelectOption={() => console.log("Logout")}
						/>
					</Dropdown>
				</div>
			</PropertyLayout>
		</>
	);
};
