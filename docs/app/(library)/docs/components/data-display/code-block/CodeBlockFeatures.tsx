"use client";
import PropertyLayout from "../../components/PropertyLayout";
import PlaygroundLayout from "../../components/PlaygroundLayout";
import { CodeBlock } from "lambda-ui-components";
import "prismjs/components/prism-python";

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

const sampleJSX = `import { Button } from "lambda-ui-components";

export default function App() {
  return (
    <Button 
      label="Click me" 
      color="primary" 
      onClick={() => alert("Hello!")}
    />
  );
}`;


const samplePython = `def quicksort(arr):
		if len(arr) <= 1:
			return arr
		pivot = arr[len(arr) // 2]
		left = [x for x in arr if x < pivot]
		middle = [x for x in arr if x == pivot]
		right = [x for x in arr if x > pivot]
		return quicksort(left) + middle + quicksort(right)

	print(quicksort([3,6,8,10,1,2,1]))`;


const sampleJS = `function fibonacci(n) {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

export const CodeBlockFeatures = () => {
	return (
		<>
			<PlaygroundLayout<HTMLElement>
				id="playground"
				title="Playground"
				componentName="CodeBlock"
				description="Experiment with all the properties of the CodeBlock component in real time."
				propConfigs={[
					{
						name: "theme",
						type: "radio",
						defaultValue: "dark",
						default: "dark",
						label: "Theme",
						description: "Color theme of the code block.",
						values: ["light", "dark"],
					},
					{
						name: "showLineNumbers",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Show Line Numbers",
						description: "Display line numbers.",
					},
					{
						name: "buttonCopy",
						type: "boolean",
						defaultValue: false,
						default: false,
						label: "Copy Button",
						description: "Show copy to clipboard button.",
					},
				]}
			>
				{(props) => (
					<div className="flex justify-center items-center py-6">
						<CodeBlock
							{...props}
							code={sampleCode}
							language="javascript"
						/>
					</div>
				)}
			</PlaygroundLayout>

			<PropertyLayout
				title="Usage"
				description={
					<div>
						<p>Basic code block with syntax highlighting. Supports multiple programming languages.</p>
					</div>
				}
				id="usage"
				code={`import { CodeBlock } from "lambda-ui-components";

const code = \`function hello() {
  console.log("Hello, World!");
}\`;

export default function App() {
	return (
		<CodeBlock 
			code={code}
			language="javascript"
			theme="dark"
		/>
	);
}`}
			/>

			<PropertyLayout
				title="With Highlighted Lines"
				description={
					<div>
						<p>Highlight specific lines using <code className="code-tag">highlightLines</code> prop. Format: "2,4-6" to highlight lines 2, 4, 5, and 6.</p>
					</div>
				}
				id="highlight-lines"
				code={`import { CodeBlock } from "lambda-ui-components";

export default function App() {
	return (
		<CodeBlock 
			code={code}
			language="javascript"
			highlightLines="2-3,6"
			showLineNumbers
			theme="dark"
		/>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<CodeBlock
						code={sampleCode}
						language="javascript"
						highlightLines="2-3,6"
						showLineNumbers
						theme="dark"
					/>
				</div>
			</PropertyLayout>

			<PropertyLayout
				title="With Tabs"
				description={
					<div>
						<p>Display multiple code snippets with tabs using the <code className="code-tag">tabs</code> prop.</p>
					</div>
				}
				id="tabs"
				code={`import { CodeBlock } from "lambda-ui-components";

const tabs = [
	{
		label: "JavaScript",
		language: "javascript",
		code: jsCode
	},
	{
		label: "Python",
		language: "python",
		code: pythonCode
	}
];

export default function App() {
	return (
		<CodeBlock 
			tabs={tabs}
			buttonCopy
			theme="dark"
		/>
	);
}`}
			>
				<div className="flex justify-center items-center py-6">
					<CodeBlock
						tabs={[
							{
								label: "JavaScript",
								language: "javascript",
								code: sampleJS
							},
							{
								label: "Python",
								language: "python",
								code: samplePython
							}
						]}
						buttonCopy
						theme="dark"
					/>
				</div>
			</PropertyLayout>
		</>
	);
};
