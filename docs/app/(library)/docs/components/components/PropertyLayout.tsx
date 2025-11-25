import { CodeBlock, Divider, Tabs } from "lambda-ui-components";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import { Code2Icon, EyeIcon } from "lucide-react";
interface PropertyLayoutProps {
	children?: React.ReactNode;
	title: string;
	description?: React.ReactNode;
	propertyName?: string;
	id?: string;
	code?: string;
}

export default function PropertyLayout({
	children,
	title,
	description,
	propertyName,
	id,
	code,
}: PropertyLayoutProps) {
	return (
		<article className="px-4 my-6">
			<div className="flex flex-col gap-1 mb-10">
				<h2
					id={id}
					className="flex items-center text-2xl font-bold text-left tracking-tight text-(--foreground-color) w-full scroll-mt-20"
				>
					{title}
					{propertyName && (
						<span
							className="font-mono text-(--foreground-secondary-color) text-xs ml-2 
						opacity-80 bg-(--surface-c)/45 px-1 py-0.5 rounded-xs border border-(--surface-c)"
						>
							{propertyName}
						</span>
					)}
				</h2>
				{description && (
					<div className="text-sm leading-relaxed text-(--foreground-secondary-color) mt-1 max-w-prose">
						{description}
					</div>
				)}
			</div>

			{code && (
				<Tabs variant="border" size="small" radius="small" color="primary">
					<Tabs.List>
						{children && <Tabs.Tab title="Preview" icon={<EyeIcon />} />}
						<Tabs.Tab title="Code" icon={<Code2Icon />} />
					</Tabs.List>
					<Tabs.Panels>
						{children && (
							<Tabs.Panel>
								<div className="w-full text-base text-(--foreground-secondary-color)">
									{children}
								</div>
							</Tabs.Panel>
						)}
						<Tabs.Panel>
							<CodeBlock code={code} language="tsx" buttonCopy />
						</Tabs.Panel>
					</Tabs.Panels>
				</Tabs>
			)}
			<Divider spacing={70} variant="dashed" className="opacity-80" />
		</article>
	);
}
