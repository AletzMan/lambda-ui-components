import React, { useMemo } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import styles from "./codeblock.module.css";

export interface CodeTab {
	label: string;
	language: string;
	code: string;
}

interface CodeBlockProps {
	code?: string;
	language?: string;
	showLineNumbers?: boolean;
	tabs?: CodeTab[];
	className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
	code = "",
	language = "javascript",
	showLineNumbers = false,
	tabs,
	className = "",
}) => {
	const [activeTab, setActiveTab] = React.useState(0);
	const codeToShow = tabs ? tabs[activeTab].code : code;
	const langToShow = tabs ? tabs[activeTab].language : language;

	const highlighted = useMemo(() => {
		if (Prism.languages[langToShow]) {
			return Prism.highlight(codeToShow, Prism.languages[langToShow], langToShow);
		}
		return codeToShow;
	}, [codeToShow, langToShow]);

	const lines = codeToShow.split("\n");

	return (
		<div className={`${styles.codeblock} ${className}`}>
			{tabs && (
				<div className={styles.tabs}>
					{tabs.map((tab, idx) => (
						<button
							key={tab.label}
							className={`${styles.tab} ${idx === activeTab ? styles.active : ""}`}
							onClick={() => setActiveTab(idx)}
							type="button"
						>
							{tab.label}
						</button>
					))}
				</div>
			)}
			<pre className={styles.pre}>
				{showLineNumbers && (
					<code className={styles.lineNumbers} aria-hidden="true">
						{lines.map((_, i) => (
							<span key={i}>{i + 1}</span>
						))}
					</code>
				)}
				<code
					className={`language-${langToShow} ${styles.code}`}
					dangerouslySetInnerHTML={{ __html: highlighted }}
				/>
			</pre>
		</div>
	);
};

export default CodeBlock;
