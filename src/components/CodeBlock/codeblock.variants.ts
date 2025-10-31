import { cva, VariantProps } from "class-variance-authority";
import styles from "./codeblock.module.css";

export const codeBlockVariants = cva(styles["lambda-codeblock"], {
	variants: {
		showLineNumbers: {
			true: styles["lambda-codeblock-line-numbers"],
			false: "",
		},
		theme: {
			dark: styles["lambda-codeblock-dark"],
			light: styles["lambda-codeblock-light"],
		},
	},
	defaultVariants: {
		showLineNumbers: false,
		theme: "dark",
	},
});

export const codeBlockTasbVariants = cva(styles["lambda-codeblock-tabs"], {
	variants: {
		theme: {
			dark: styles["lambda-codeblock-tabs-dark"],
			light: styles["lambda-codeblock-tabs-light"],
		},
	},
	defaultVariants: {
		theme: "dark",
	},
});

export const codeBlockTabVariants = cva(styles["lambda-codeblock-tab"], {
	variants: {
		theme: {
			dark: styles["lambda-codeblock-tab-dark"],
			light: styles["lambda-codeblock-tab-light"],
		},
		active: {
			true: styles["lambda-codeblock-tab-active"],
			false: "",
		},
	},
	defaultVariants: {
		theme: "dark",
		active: false,
	},
});

export const codeBlockCopyButtonVariants = cva(styles["lambda-copy-button"], {
	variants: {
		theme: {
			dark: styles["lambda-copy-button-dark"],
			light: styles["lambda-copy-button-light"],
		},
	},
	defaultVariants: {
		theme: "dark",
	},
});

export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>;
