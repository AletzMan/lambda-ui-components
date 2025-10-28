import { cva, VariantProps } from "class-variance-authority";
import styles from "./codeblock.module.css";

export const codeBlockVariants = cva(styles["codeblock"], {
	variants: {
		showLineNumbers: {
			true: styles["codeblock-line-numbers"],
			false: "",
		},
		tabStyle: {
			default: styles["tabs"],
			minimal: styles["tabs-minimal"],
		},
	},
	defaultVariants: {
		showLineNumbers: false,
		tabStyle: "default",
	},
});

export const codeBlockTabVariants = cva(styles["codeblock-tab"], {
	variants: {
		tabStyle: {
			default: styles["codeblock-tab-default"],
			minimal: styles["codeblock-tab-minimal"],
		},
		active: {
			true: styles["codeblock-tab-active"],
			false: "",
		},
	},
	defaultVariants: {
		tabStyle: "default",
		active: false,
	},
});

export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>;
