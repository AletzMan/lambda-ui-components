import { FooterDocs } from "@/components/layout/FooterDocs";
import { BarNavButton } from "./BarNavButton";

interface SectionLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle?: string;
	footer?: boolean;
	buttonsLeft?: {
		href: string;
		text: string;
	};
	buttonsRight?: {
		href: string;
		text: string;
	};
}

export function SectionLayout({
	children,
	title,
	subtitle,
	footer = true,
	buttonsLeft,
	buttonsRight,
}: SectionLayoutProps) {
	return (
		<section className="relative flex flex-col justify-between mx-auto pt-16 pb-2 px-6 md:px-10 bg-transparent backdrop-blur-[1.5px] w-full min-h-[calc(100svh-72px)] overflow-hidden">
			<header className="mb-10 text-center">
				<h1 className="flex items-center gap-2 text-4xl font-bold text-left tracking-tight text-(--primary-base-color) mb-1 w-full">
					{title}
				</h1>
				{subtitle && (
					<p className="text-md text-(--foreground-secondary-color) text-left mb-2">{subtitle}</p>
				)}
			</header>
			{children}
			<BarNavButton buttonLeft={buttonsLeft} buttonRight={buttonsRight} />
			{footer && <FooterDocs />}
		</section>
	);
}
