import type { Meta, StoryObj } from "@storybook/react-vite";
import CodeBlock from "./CodeBlock";
import type { CodeBlockProps } from "./codeblock.types";
import "prismjs/components/prism-typescript";

const meta: Meta<CodeBlockProps> = {
	title: "Components/CodeBlock",
	component: CodeBlock,
	argTypes: {
		code: {
			type: "string",
		},
		language: {
			type: "string",
		},
		highlightLines: {
			type: "string",
		},
		showLineNumbers: {
			type: "boolean",
		},
		buttonCopy: {
			type: "boolean",
		},
	},
};
export default meta;

type Story = StoryObj<CodeBlockProps>;

export const Basic: Story = {
	render: (args) => (
		<div style={{ width: "270px" }}>
			<CodeBlock {...args} />
		</div>
	),
	args: {
		code: `pnpm add lambda-ui-components`,
		highlightLines: undefined,
		showLineNumbers: false,
		buttonCopy: true,
		theme: "dark",
	},
};

export const DarkTheme: Story = {
	args: {
		code: `const x = 42;\nconsole.log(x);`,
		language: "javascript",
		highlightLines: "2",
		showLineNumbers: true,
		buttonCopy: true,
		theme: "dark",
	},
};

export const WithTabs: Story = {
	args: {
		tabs: [
			{
				label: "JS",
				language: "javascript",
				code: "const x = 42;\nconsole.log(x);",
			},
			{
				label: "TS",
				language: "typescript",
				code: "const x: number = 42;\nconsole.log(x);",
			},
		],
		highlightLines: "2",
		showLineNumbers: true,
		language: "typescript",
		buttonCopy: true,
		theme: "light",
	},
};

export const WithTabsIcon: Story = {
	args: {
		tabs: [
			{
				label: "index.js",
				language: "javascript",
				code: "const x = 42;\nconsole.log(x);",
				icon: (
					<svg width={16} height={16} viewBox="0 0 16 16">
						<path
							fill="#ffca28"
							d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"
						></path>
					</svg>
				),
			},
			{
				label: "index.ts",
				language: "typescript",
				code: "const x: number = 42;\nconsole.log(x);",
				icon: (
					<svg width={16} height={16} viewBox="0 0 16 16">
						<path
							fill="#0288d1"
							d="M2 2v12h12V2zm4 6h3v1H8v4H7V9H6zm5 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"
						></path>
					</svg>
				),
			},
		],
		highlightLines: "2",
		showLineNumbers: true,
		language: "typescript",
		buttonCopy: true,
		theme: "dark",
	},
};
