"use client";
import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
// El tema se importa dinámicamente según la prop theme.
import styles from "./codeblock.module.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import clsx from "clsx";
import {
	codeBlockCopyButtonVariants,
	codeBlockTabVariants,
	codeBlockTasbVariants,
	codeBlockVariants,
} from "./codeblock.variants";
import { CodeBlockProps } from "./codeblock.types";

// Extensión temporal de props para permitir líneas resaltadas

import { CheckIcon, CopyIcon } from "lucide-react";

export const CodeBlock: React.FC<CodeBlockProps> = ({
	code = "",
	language = "javascript",
	showLineNumbers = false,
	tabs,
	buttonCopy = false,
	className = "",
	highlightLines,
	theme = "dark",
}) => {
	const [activeTab, setActiveTab] = useState(0);
	const [copied, setCopied] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const codeToShow = tabs ? tabs[activeTab].code : code;
	const langToShow = tabs ? tabs[activeTab].language : language;

	const codeRef = useRef<HTMLElement>(null);

	// Mount effect
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Cambia el tema dinámicamente
	useEffect(() => {
		const themeId = "prism-theme-style";
		let link = document.getElementById(themeId) as HTMLLinkElement | null;
		const themeHref =
			theme === "dark"
				? "https://unpkg.com/prismjs/themes/prism-okaidia.css"
				: "https://unpkg.com/prismjs/themes/prism.css";

		if (link) {
			link.href = themeHref;
		} else {
			link = document.createElement("link");
			link.id = themeId;
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = themeHref;
			document.head.appendChild(link);
		}
		return () => {
			// Opcional: si quieres limpiar el tema cuando el componente se desmonta
			// link?.parentNode?.removeChild(link);
		};
	}, [theme]);

	useEffect(() => {
		if (codeRef.current && isMounted) {
			Prism.highlightElement(codeRef.current);
		}
	}, [codeToShow, langToShow, highlightLines, showLineNumbers, theme, code, language, tabs, isMounted]);

	return (
		<div className={clsx(codeBlockVariants({ showLineNumbers, theme }), className)}>
			{tabs && (
				<div className={codeBlockTasbVariants({ theme })}>
					{tabs.map((tab, idx) => (
						<button
							key={tab.label}
							className={clsx(codeBlockTabVariants({ theme, active: idx === activeTab }))}
							onClick={() => setActiveTab(idx)}
							type="button"
						>
							{tab.icon}
							{tab.label}
						</button>
					))}
				</div>
			)}
			<pre
				suppressHydrationWarning
				className={clsx(
					styles["lambda-pre"],
					{ "line-numbers": showLineNumbers && isMounted },
					{ [styles["lambda-pre-line-highlight"]]: highlightLines && isMounted },
					{ [styles["lambda-pre-line-numbers"]]: showLineNumbers && isMounted },
					{ [styles["lambda-pre-dark"]]: theme === "dark" },
					{ [styles["lambda-pre-light"]]: theme === "light" },
					"scrollBar"
				)}
				data-line={isMounted ? highlightLines : undefined}
			>
				<code
					suppressHydrationWarning
					ref={codeRef}
					className={`language-${langToShow} ${styles["lambda-code"]}`}
				>
					{codeToShow}
				</code>
			</pre>
			{buttonCopy && (
				<button
					className={codeBlockCopyButtonVariants({ theme })}
					aria-label={copied ? "Copied successfully" : "Copy code to clipboard"}
					type="button"
					onClick={() => {
						navigator.clipboard.writeText(codeToShow);
						setCopied(true);
						setTimeout(() => setCopied(false), 2000);
					}}
				>
					{copied ? <CheckIcon /> : <CopyIcon />}
				</button>
			)}
		</div>
	);
};

export default CodeBlock;
