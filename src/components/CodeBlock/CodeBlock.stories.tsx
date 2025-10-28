import type { Meta, StoryObj } from "@storybook/react";
import CodeBlock from "./CodeBlock";
import type { CodeBlockProps } from "./codeblock.types";
import "prismjs/components/prism-typescript";

const meta: Meta<CodeBlockProps> = {
	title: "Components/CodeBlock",
	component: CodeBlock,
	tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<CodeBlockProps>;

export const Basic: Story = {
	args: {
		code: `const x = 42;\nconsole.log(x);`,
		language: "javascript",
		showLineNumbers: true,
	},
};

export const WithTabs: Story = {
	args: {
		tabs: [
			{ label: "JS", language: "javascript", code: "const x = 42;\nconsole.log(x);" },
			{ label: "TS", language: "typescript", code: "const x: number = 42;\nconsole.log(x);" },
		],
		showLineNumbers: true,
		language: "typescript",
	},
};
