"use client";
import { NavigationMenu, NavigationMenuData } from "lambda-ui-components";
import { BarNavButton } from "@/app/(library)/components/layout/BarNavButton";
import { useEffect, useState } from "react";
import { FooterDocs } from "@/components/layout/FooterDocs";

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
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		const elements = document.querySelectorAll("h2");
		if (!elements.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: "0px 0px -70% 0px", // activa cuando el título entra al 30% superior
				threshold: 0.1,
			}
		);

		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	console.log(activeId);
	return (
		<section className="relative flex flex-col gap-10 px-6 py-4">
			<header className="mb-10 text-center ">
				<h1 className="flex items-center gap-2 text-4xl font-bold text-left tracking-tight text-(--primary-base-color) mb-1 w-full ">
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
					<FooterDocs />
				</div>
				<aside className="sticky top-18 h-[calc(100vh-90px)] bg-(--background-color) border-l border-(--border-color)/30 shadow shadow-gray-900/10">
					<NavigationMenu
						data={data}
						currentPath={"#" + activeId || ""}
						alwaysOpen
						showLines
						styleLines="dotted"
					/>
				</aside>
			</div>
		</section>
	);
};
