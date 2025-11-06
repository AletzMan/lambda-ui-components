import { CodeBlock } from "lambda-ui-components";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
interface PropertyLayoutProps {
	children: React.ReactNode;
	title: string;
	id?: string;
	code?: string;
}

export default function PropertyLayout({ children, title, id, code }: PropertyLayoutProps) {
	return (
		<article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-(--primary-base-color) pr-3">
			<h2
				id={id}
				className="text-2xl font-bold text-left tracking-tight text-(--foreground-color) mb-4 w-full scroll-mt-20"
			>
				{title}
			</h2>
			<div className="w-full text-base text-(--foreground-secondary-color)">{children}</div>
			{code && <CodeBlock code={code} language="tsx" />}
			<hr className="my-10 border-(--border-color)" />
		</article>
	);
}
