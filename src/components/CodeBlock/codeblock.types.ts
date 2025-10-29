// types.ts
import type { ReactNode } from "react";

export interface CodeTab {
	/**
	 * The label of the tab
	 */
	label: string;

	/**
	 * The icon of the tab
	 */
	icon?: ReactNode;
	/**
	 * The language of the code
	 */
	language: string;
	/**
	 * The code to be displayed
	 */
	code: string;
}

export interface CodeBlockProps {
	/**
	 * Theme for code block: 'light' (default) or 'dark'
	 */
	theme?: "light" | "dark";
	/**
	 * The code to be displayed
	 */
	code?: string;
	/**
	 * The language of the code
	 */
	language?: string;
	/**
	 * Líneas a resaltar, formato: '2,4-6'
	 */
	highlightLines?: string;
	/**
	 * Whether to show line numbers
	 */
	showLineNumbers?: boolean;
	/**
	 * Whether to show copy button
	 */
	buttonCopy?: boolean;
	/**
	 * The tabs to be displayed
	 */
	tabs?: CodeTab[];
	/**
	 * The class name to be applied to the code block
	 */
	className?: string;
	/**
	 * The children to be displayed
	 */
	children?: ReactNode;
}
