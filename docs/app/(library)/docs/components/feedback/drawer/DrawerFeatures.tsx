"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Drawer, Button } from "lambda-ui-components";
import { useState } from "react";

export const DrawerFeatures = () => {
	const [isOpenPlayground, setIsOpenPlayground] = useState(false);
	const [isOpenLeft, setIsOpenLeft] = useState(false);
	const [isOpenRight, setIsOpenRight] = useState(false);
	const [isOpenTop, setIsOpenTop] = useState(false);
	const [isOpenBottom, setIsOpenBottom] = useState(false);

	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Drawer"
				description="Experiment with all the properties of the Drawer component in real time."
				propConfigs={[
					{
						name: "title",
						type: "string",
						defaultValue: "Drawer Title",
						default: "",
						label: "Title",
						description: "Content for the drawer header/title.",
					},
					{
						name: "placement",
						type: "radio",
						defaultValue: "left",
						default: "left",
						label: "Placement",
						description: "Side from which the drawer slides in.",
						values: ["left", "right", "top", "bottom"],
					},
					{
						name: "width",
						type: "radio",
						defaultValue: "small",
						default: "small",
						label: "Width",
						description: "Width of the drawer (for left/right placement).",
						values: ["xsmall", "small", "medium", "half", "full"],
					},
					{
						name: "backdropType",
						type: "radio",
						defaultValue: "dark",
						default: "dark",
						label: "Backdrop Type",
						description: "Style of the backdrop overlay.",
						values: ["dark", "blur", "transparent"],
					},
					{
						name: "showCloseButton",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Show Close Button",
						description: "If true, displays a close button in the header.",
					},
					{
						name: "closeOnOverlayClick",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Close on Overlay Click",
						description: "If true, clicking the overlay closes the drawer.",
					},
					{
						name: "closeOnEscape",
						type: "boolean",
						defaultValue: true,
						default: true,
						label: "Close on Escape",
						description: "If true, pressing Escape closes the drawer.",
					},
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6">
						<Button onClick={() => setIsOpenPlayground(true)} label="Open Drawer" />
						<Drawer
							{...props}
							isOpen={isOpenPlayground}
							onClose={() => setIsOpenPlayground(false)}
							footer={
								<div className="flex gap-2 justify-end">
									<Button onClick={() => setIsOpenPlayground(false)} label="Close" variant="outline" />
								</div>
							}
						>
							<div className="p-4">
								<p>This is the drawer content. You can put any content here.</p>
								<p className="mt-4 text-sm text-(--foreground-secondary-color)">
									Try changing the placement, width, and other properties to see how they affect the drawer.
								</p>
							</div>
						</Drawer>
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Drawer, Button } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} label="Open Drawer" />
			<Drawer
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Navigation"
				placement="left"
			>
				<div className="p-4">
					<p>Drawer content goes here</p>
				</div>
			</Drawer>
		</>
	);
}`}
			/>

			<PropertyLayout
				title="Placement Options"
				description={
					<p>The <code className="code-tag">placement</code> prop controls which side of the screen the drawer slides in from. Options are <code className="code-tag">left</code>, <code className="code-tag">right</code>, <code className="code-tag">top</code>, and <code className="code-tag">bottom</code>.</p>
				}
				id="placement"
				code={`import { Drawer, Button } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [placement, setPlacement] = useState("left");

	return (
		<>
			<Button onClick={() => { setPlacement("left"); setIsOpen(true); }} label="Left" />
			<Button onClick={() => { setPlacement("right"); setIsOpen(true); }} label="Right" />
			<Button onClick={() => { setPlacement("top"); setIsOpen(true); }} label="Top" />
			<Button onClick={() => { setPlacement("bottom"); setIsOpen(true); }} label="Bottom" />
			
			<Drawer
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title={\`\${placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer\`}
				placement={placement}
			>
				<div className="p-4">
					<p>This drawer slides in from the {placement}.</p>
				</div>
			</Drawer>
		</>
	);
}`}
			>
				<div className="flex flex-wrap gap-2 justify-center items-center py-6">
					<Button onClick={() => setIsOpenLeft(true)} label="Left Drawer" />
					<Button onClick={() => setIsOpenRight(true)} label="Right Drawer" />
					<Button onClick={() => setIsOpenTop(true)} label="Top Drawer" />
					<Button onClick={() => setIsOpenBottom(true)} label="Bottom Drawer" />

					<Drawer
						isOpen={isOpenLeft}
						onClose={() => setIsOpenLeft(false)}
						title="Left Drawer"
						placement="left"
					>
						<div className="p-4">
							<p>This drawer slides in from the left.</p>
						</div>
					</Drawer>

					<Drawer
						isOpen={isOpenRight}
						onClose={() => setIsOpenRight(false)}
						title="Right Drawer"
						placement="right"
					>
						<div className="p-4">
							<p>This drawer slides in from the right.</p>
						</div>
					</Drawer>

					<Drawer
						isOpen={isOpenTop}
						onClose={() => setIsOpenTop(false)}
						title="Top Drawer"
						placement="top"
					>
						<div className="p-4">
							<p>This drawer slides in from the top.</p>
						</div>
					</Drawer>

					<Drawer
						isOpen={isOpenBottom}
						onClose={() => setIsOpenBottom(false)}
						title="Bottom Drawer"
						placement="bottom"
					>
						<div className="p-4">
							<p>This drawer slides in from the bottom.</p>
						</div>
					</Drawer>
				</div>
			</PropertyLayout>
		</>
	);
};
