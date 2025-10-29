import { cva, VariantProps } from "class-variance-authority";
import styles from "./codeblock.module.css";

export const codeBlockVariants = cva(styles["codeblock"], {
	variants: {
		showLineNumbers: {
			true: styles["codeblock-line-numbers"],
			false: "",
		},
		theme: {
			dark: styles["codeblock-dark"],
			light: styles["codeblock-light"],
		},
	},
	defaultVariants: {
		showLineNumbers: false,
		theme: "dark",
	},
});

export const codeBlockTasbVariants = cva(styles["codeblock-tabs"], {
	variants: {
		theme: {
			dark: styles["codeblock-tabs-dark"],
			light: styles["codeblock-tabs-light"],
		},
	},
	defaultVariants: {
		theme: "dark",
	},
});

export const codeBlockTabVariants = cva(styles["codeblock-tab"], {
	variants: {
		theme: {
			dark: styles["codeblock-tab-dark"],
			light: styles["codeblock-tab-light"],
		},
		active: {
			true: styles["codeblock-tab-active"],
			false: "",
		},
	},
	defaultVariants: {
		theme: "dark",
		active: false,
	},
});

export const codeBlockCopyButtonVariants = cva(styles["copy-button"], {
	variants: {
		theme: {
			dark: styles["copy-button-dark"],
			light: styles["copy-button-light"],
		},
	},
	defaultVariants: {
		theme: "dark",
	},
});

export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>;
