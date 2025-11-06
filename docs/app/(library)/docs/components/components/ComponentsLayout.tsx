"use client";
import { NavigationMenu, NavigationMenuData, useActiveSectionObserver } from "lambda-ui-components";
import { BarNavButton } from "@/app/(library)/components/layout/BarNavButton";
import { FooterDocs } from "@/components/layout/FooterDocs";

interface ComponentsLayoutProps {
	title?: string;
	description?: string;
	children: React.ReactNode;
	menuData: NavigationMenuData[];
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
	title,
	description,
	buttonLeft,
	buttonRight,
	menuData,
}: ComponentsLayoutProps) => {
	const activeId = useActiveSectionObserver({ selectors: "h2", rootMargin: "72px 0px -80% 0px" });
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
			<div className="flex flex-col gap-10">
				<div className="sticky top-20 bg-(--surface-a)/45 backdrop-blur-[5px] p-1 ">
					<div className="grid grid-cols-[1fr_250px] max-[1220px]:grid-cols-1">
						<div className="flex flex-col gap-10">
							{children}

							<BarNavButton buttonLeft={buttonLeft} buttonRight={buttonRight} />
							<FooterDocs />
						</div>
						<aside className="sticky top-18 h-[calc(100vh-90px)] bg-(--background-color)/85 max-[1220px]:hidden">
							<NavigationMenu
								data={menuData}
								currentPath={"#" + activeId || ""}
								alwaysOpen
								showLines
								styleLines="dotted"
								defaultExpanded={["features", "api-reference"]}
							/>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};
