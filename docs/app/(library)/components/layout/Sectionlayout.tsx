interface SectionLayoutProps {
	children: React.ReactNode;
	title: string;
}

export function SectionLayout({ children, title }: SectionLayoutProps) {
	return (
		<section className="relative max-w-4xl mx-auto py-16 px-6 md:px-10 bg-transparent backdrop-blur-[1px]">
			<header className="mb-10 text-center">
				<h1 className="flex items-center gap-2 text-4xl font-bold text-left tracking-tight text-(--primary-base-color) mb-3 w-full">
					{title}
				</h1>
			</header>
			{children}
		</section>
	);
}
