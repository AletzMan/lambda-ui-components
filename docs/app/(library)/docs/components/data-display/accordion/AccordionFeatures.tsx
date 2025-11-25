"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { Accordion } from "lambda-ui-components";

export const AccordionFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="Accordion"
				description="Experiment with all the properties of the Accordion component in real time."
				childrenComponentsNames={[`Accordion.Item value="item-1">
		<Accordion.Header>Section 1</Accordion.Header>
			<Accordion.Content>
				This is the content for section 1. It can contain any React elements.
			</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2">
		<Accordion.Header>Section 2</Accordion.Header>
			<Accordion.Content>
				This is the content for section 2 with more detailed information.
			</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3">
		<Accordion.Header>Section 3</Accordion.Header>
			<Accordion.Content>
				This is the content for section 3.
			</Accordion.Content>
	</Accordion.Item`]}
				propConfigs={[
					{
						name: "variant",
						type: "radio",
						defaultValue: "default",
						default: "default",
						label: "Variant",
						description: "Visual style of the accordion.",
						values: ["default", "flush", "split", "soft"],
					},
					{
						name: "size",
						type: "slider",
						defaultValue: "medium",
						default: "medium",
						label: "Size",
						description: "Size of the accordion.",
						values: ["tiny", "small", "medium", "large"],
					},
					{
						name: "radius",
						type: "slider",
						defaultValue: "small",
						default: "small",
						label: "Radius",
						description: "Radius of the accordion.",
						values: ["none", "tiny", "small", "medium", "large"],
					},
				]}
			>
				<Accordion defaultValue="item-1">
					<Accordion.Item value="item-1">
						<Accordion.Header>Section 1</Accordion.Header>
						<Accordion.Content>
							This is the content for section 1. It can contain any React elements.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Header>Section 2</Accordion.Header>
						<Accordion.Content>
							This is the content for section 2 with more detailed information.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Header>Section 3</Accordion.Header>
						<Accordion.Content>
							This is the content for section 3.
						</Accordion.Content>
					</Accordion.Item>
				</Accordion>
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				id="usage"
				code={`import { Accordion } from "lambda-ui-components";

export default function App() {
	return (
		<Accordion defaultValue="item-1">
			<Accordion.Item value="item-1">
				<Accordion.Header>What is Lambda UI?</Accordion.Header>
				<Accordion.Content>
					Lambda UI is a modern React component library designed for building beautiful user interfaces.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Header>How do I install it?</Accordion.Header>
				<Accordion.Content>
					You can install Lambda UI using npm or pnpm: npm install lambda-ui-components
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Header>Is it customizable?</Accordion.Header>
				<Accordion.Content>
					Yes! Lambda UI components are highly customizable with variants, sizes, and themes.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion>
	);
}`}
			/>


			<PropertyLayout
				title="Disabled Items"
				description={
					<div>
						<p>Individual accordion items can be disabled using the <code className="code-tag">disabled</code> prop.</p>
					</div>
				}
				id="disabled"
				code={`import { Accordion } from "lambda-ui-components";

export default function App() {
	return (
		<Accordion defaultValue="item-1">
			<Accordion.Item value="item-1">
				<Accordion.Header>Active Item</Accordion.Header>
				<Accordion.Content>This item is active and can be toggled.</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2" disabled>
				<Accordion.Header>Disabled Item</Accordion.Header>
				<Accordion.Content>This item is disabled.</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Header>Another Active Item</Accordion.Header>
				<Accordion.Content>This item is also active.</Accordion.Content>
			</Accordion.Item>
		</Accordion>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<Accordion defaultValue="item-1">
						<Accordion.Item value="item-1">
							<Accordion.Header>Active Item</Accordion.Header>
							<Accordion.Content>This item is active and can be toggled.</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-2" disabled>
							<Accordion.Header>Disabled Item</Accordion.Header>
							<Accordion.Content>This item is disabled.</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="item-3">
							<Accordion.Header>Another Active Item</Accordion.Header>
							<Accordion.Content>This item is also active.</Accordion.Content>
						</Accordion.Item>
					</Accordion>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="Controlled Accordion"
				description={
					<div>
						<p>You can control the accordion state using the <code className="code-tag">value</code> and <code className="code-tag">onValueChange</code> props.</p>
					</div>
				}
				id="controlled"
				code={`import { Accordion } from "lambda-ui-components";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState<string | number | null>("item-1");

	return (
		<div>
			<p>Current open item: {value || "none"}</p>
			<Accordion value={value} onValueChange={setValue}>
				<Accordion.Item value="item-1">
					<Accordion.Header>Controlled Item 1</Accordion.Header>
					<Accordion.Content>This is controlled content 1.</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Header>Controlled Item 2</Accordion.Header>
					<Accordion.Content>This is controlled content 2.</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}`}
			/>
		</>
	);
};
