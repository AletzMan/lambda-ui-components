import { AppLogo } from "../icons/AppLogo";
import { Divider, Flex, Link as LambdaLink, Tag } from "lambda-ui-components";
import Link from "next/link";
import HeaderOptions from "./HeaderOptions";
import { basePath } from "@/app/utils/basePath";

const links = [
	{ name: "Docs", href: "/docs/overview/introduction" },
	{ name: "Components", href: "/docs/components/forms/checkbox" },
	{ name: "About", href: "/docs/overview/about" },
	{ name: "Changelog", href: "/docs/overview/changelog" },
];

export function HeaderApp() {

	return (
		<header
			className="sticky top-0 z-50 flex items-center justify-between w-[calc(100svw-20px)] px-2 py-4 
		bg-(--surface-a) "
		>
			<Flex gap={6} align="center">
				<Link className="flex items-center gap-2" href="/">
					<AppLogo width={40} height={40} />
					<div className="text-lg font-bold text-(--foreground-color)">Lambda UI</div>
				</Link>
				<Tag size="tiny" variant="soft" radius="medium" text="v1.3.4" />
				<span className="flex items-center gap-1">
					<span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
					<span className="text-xs text-green-500 font-medium">Stable</span>
				</span>
			</Flex>
			<div className={`max-md:hidden flex gap-6 items-center `}>
				<nav className="flex gap-1">
					{links.map((link) => (
						<div key={link.name} className="flex items-center gap-x-2 ml-[3px]">
							<LambdaLink
								key={link.name}
								href={`${basePath}${link.href}`}
								size="tiny"
								variant="text"
								color="primary"
								type="button"
								radius="small"
							>
								{link.name}
							</LambdaLink>
							{link.name !== "Changelog" && (
								<Divider className="opacity-40" orientation="vertical" color="primary" />
							)}
						</div>
					))}
				</nav>
			</div>
			<HeaderOptions />
		</header>
	);
}
