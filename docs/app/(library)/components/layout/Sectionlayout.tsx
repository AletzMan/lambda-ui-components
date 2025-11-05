import { FooterDocs } from "@/components/layout/FooterDocs";
import { NavButton } from "../ui/NavButton";

interface SectionLayoutProps {
	children: React.ReactNode;
	title: string;
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
	footer = true,
	buttonsLeft,
	buttonsRight,
}: SectionLayoutProps) {
	return (
		<section className="relative max-w-4xl mx-auto py-16 px-6 md:px-10 bg-transparent backdrop-blur-[1px] w-full overflow-hidden">
			<header className="mb-10 text-center">
				<h1 className="flex items-center gap-2 text-4xl font-bold text-left tracking-tight text-(--primary-base-color) mb-3 w-full">
					{title}
				</h1>
			</header>
			{children}
			<div className="grid grid-cols-2 gap-10 my-10 w-full">
				{buttonsLeft && (
					<NavButton href={buttonsLeft.href} text={buttonsLeft.text} direction="left" />
				)}
				{buttonsRight && (
					<NavButton href={buttonsRight.href} text={buttonsRight.text} direction="right" />
				)}
			</div>

			{footer && <FooterDocs />}
		</section>
	);
}
