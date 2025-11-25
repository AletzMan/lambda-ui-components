"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Tabs } from "lambda-ui-components";
import { Home, Settings, User } from "lucide-react";

export const TabsFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Tabs"
				description="Experiment with all the properties of the Tabs component in real time."
				childrenComponentsNames={[`Tabs.List>
		<Tabs.Tab title="Home" icon={<Home />} />
		<Tabs.Tab title="Profile" icon={<User />} />
		<Tabs.Tab title="Settings" icon={<Settings />} disabled/>
	</Tabs.List>
	<Tabs.Panels>
		<Tabs.Panel>
			<div className="p-4">
				<h3 className="text-lg font-semibold mb-2">Home Content</h3>
				<p>Welcome to the home tab!</p>
			</div>
		</Tabs.Panel>
		<Tabs.Panel>
			<div className="p-4">
				<h3 className="text-lg font-semibold mb-2">Profile Content</h3>
				<p>This is your profile information.</p>
			</div>
		</Tabs.Panel>
		<Tabs.Panel>
			<div className="p-4">
				<h3 className="text-lg font-semibold mb-2">Settings Content</h3>
				<p>Manage your settings here.</p>
			</div>
		</Tabs.Panel>
	</Tabs.Panels>`]}
				propConfigs={[
					{
						name: "variant",
						type: "radio",
						defaultValue: "underline",
						default: "underline",
						label: "Variant",
						description: "Defines the visual style of the tabs.",
						values: ["underline", "soft", "box", "border"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Controls the size of the tabs.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "color",
						type: "color",
						defaultValue: "neutral",
						default: "neutral",
						label: "Color",
						description: "Controls the color scheme of the tabs.",
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "tiny",
						default: "tiny",
						label: "Radius",
						description: "Defines the border radius of the tabs.",
						values: ["none", "tiny", "small", "medium", "large", "full"],
					}
				]}
			>
				<Tabs>
					<Tabs.List>
						<Tabs.Tab title="Home" icon={<Home />} />
						<Tabs.Tab title="Profile" icon={<User />} />
						<Tabs.Tab title="Settings" icon={<Settings />} disabled />
					</Tabs.List>

					<Tabs.Panels>
						<Tabs.Panel>
							<div className="p-4">
								<h3 className="text-lg font-semibold mb-2">Home Content</h3>
								<p>Welcome to the home tab!</p>
							</div>
						</Tabs.Panel>
						<Tabs.Panel>
							<div className="p-4">
								<h3 className="text-lg font-semibold mb-2">Profile Content</h3>
								<p>This is your profile information.</p>
							</div>
						</Tabs.Panel>
						<Tabs.Panel>
							<div className="p-4">
								<h3 className="text-lg font-semibold mb-2">Settings Content</h3>
								<p>Manage your settings here.</p>
							</div>
						</Tabs.Panel>
					</Tabs.Panels>
				</Tabs>
			</PlaygroundLayout>
			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Tabs } from "lambda-ui-components";
import { Home, Settings, User } from "lucide-react";

export default function App() {
	return (
		<Tabs variant="underline" color="primary">
			<Tabs.List>
				<Tabs.Tab title="Home" icon={<Home />} />
				<Tabs.Tab title="Profile" icon={<User />} />
				<Tabs.Tab title="Settings" icon={<Settings />} />
			</Tabs.List>

			<Tabs.Panels>
				<Tabs.Panel>Home content</Tabs.Panel>
				<Tabs.Panel>Profile content</Tabs.Panel>
				<Tabs.Panel>Settings content</Tabs.Panel>
			</Tabs.Panels>
		</Tabs>
	);
}`}
			/>
		</>
	);
};
