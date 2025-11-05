"use client";
import { List } from "lucide-react";
import { NavigationMenu, NavigationMenuData } from "lambda-ui-components";
import { usePathname } from "next/navigation";
import { BarNavButton } from "@/app/(library)/components/layout/BarNavButton";

interface ComponentsLayoutProps {
	title?: string;
	description?: string;
	children: React.ReactNode;
	data: NavigationMenuData[];
	buttonLeft?: {
		href: string;
		text: string;
	};
	buttonRight?: {
		href: string;
		text: string;
	};
}

export const ComponentsLayout = ({
	children,
	data,
	title,
	description,
	buttonLeft,
	buttonRight,
}: ComponentsLayoutProps) => {
	const pathname = usePathname();
	return (
		<section className="flex flex-col gap-10 px-6 py-4">
			<header className="mb-10 text-center">
				<h1 className="flex items-center gap-2 text-4xl font-bold text-left tracking-tight text-(--primary-base-color) mb-1 w-full">
					{title}
				</h1>
				{description && (
					<p className="text-md text-(--foreground-secondary-color) text-left mb-2">
						{description}
					</p>
				)}
			</header>
			<div className="grid grid-cols-[1fr_250px]">
				<div>
					{children}
					<BarNavButton buttonLeft={buttonLeft} buttonRight={buttonRight} />
				</div>
				<aside>
					<h1>
						<List /> On this page
					</h1>
					<NavigationMenu data={data} currentPath={pathname} />
				</aside>
			</div>
		</section>
	);
};
