interface SubSectionLayoutProps {
	children: React.ReactNode;
	title: string;
	id?: string;
}

export function SubSectionLayout({ children, title, id }: SubSectionLayoutProps) {
	return (
		<article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-(--primary-base-color) pr-3">
			<h2
				id={id}
				className="text-2xl font-bold text-left tracking-tight text-(--foreground-color) mb-4 w-full scroll-mt-20"
			>
				{title}
			</h2>
			<div className="w-full text-base text-(--foreground-secondary-color)">{children}</div>
			<hr className="my-10 border-(--border-color)" />
		</article>
	);
}
