"use client";
import { NavigationMenu, useActiveSectionObserver, NavigationMenuData } from "lambda-ui-components";
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
	const firstItemId = menuData![0].children![0].children![0].id;
	console.log(activeId);
	console.log(firstItemId);
	return (
		<section className="relative flex flex-col gap-10 px-6 py-4 w-full max-w-[1800px]">
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
				<div className="sticky top-20 bg-(--surface-a) backdrop-blur-[5px] p-2 rounded-sm">
					<div className="grid grid-cols-[1fr_300px] max-[1410px]:grid-cols-1 gap-2">
						<div className="flex flex-col gap-10 max-w-[1800px] mx-auto w-full">
							{children}

							<BarNavButton buttonLeft={buttonLeft} buttonRight={buttonRight} />
							<FooterDocs />
						</div>
						<aside className="sticky top-18 h-[calc(100vh-90px)] bg-(--background-color) max-[1410px]:hidden rounded-sm overflow-y-auto">
							<NavigationMenu
								data={menuData}
								currentPath={activeId ? "#" + activeId : "#" + firstItemId}
								size="small"
								alwaysOpen
								showLines
								styleLines="dotted"
								scrollBehavior="nearest"
								defaultExpanded={["features", "api-reference"]}
							/>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
};
