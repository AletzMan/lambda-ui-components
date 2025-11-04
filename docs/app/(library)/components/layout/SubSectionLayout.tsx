interface SubSectionLayoutProps {
	children: React.ReactNode;
	title: string;
}
export function SubSectionLayout({ children, title }: SubSectionLayoutProps) {
	return (
		<article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-(--primary-base-color)">
			<h2 className="text-2xl font-bold text-left tracking-tight text-(--foreground-color) mb-4 w-full">
				{title}
			</h2>
			<div className="w-full text-base text-(--foreground-secondary-color)">{children}</div>
			<hr className="my-10 border-(--border-color)" />
		</article>
	);
}
