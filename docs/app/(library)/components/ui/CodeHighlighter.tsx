import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import { ButtonCopy } from "./ButtonCopy";

interface InfoCode {
	code: string;
	language?: "tsx" | "css";
	icon?: React.ReactNode;
}

interface CodeHighlighterProps {
	codeData: InfoCode[];
}

export default function CodeHighlighter({ codeData }: CodeHighlighterProps) {
	const highlightedCode: string[] = codeData.map((code) =>
		Prism.highlight(code.code, Prism.languages[code.language || "tsx"], code.language || "tsx")
	);

	return (
		<div className="relative">
			<header className="flex items-center justify-between bg-(--surface-b) p-2">
				<div className="flex items-center gap-2">
					<span className="text-sm font-semibold">Code Highlighter</span>
				</div>
			</header>
			<pre className="bg-(--surface-a) rounded-sm border border-(--surface-b) p-3 text-sm overflow-x-auto text-left whitespace-pre-wrap">
				{highlightedCode.map((code, index) => (
					<code
						key={index}
						className={`language-${codeData[index].language || "tsx"}`}
						dangerouslySetInnerHTML={{ __html: code }}
					/>
				))}
			</pre>
			<div className="absolute top-1.5 right-1.5">
				<ButtonCopy codeToShow={codeData[0].code} />
			</div>
		</div>
	);
}
