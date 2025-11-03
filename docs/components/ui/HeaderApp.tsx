"use client";
import { AppLogo } from "../icons/AppLogo";
import { ButtonTheme, Divider, Flex, Link, Tag } from "lambda-ui-components";
import { GitHubIcon } from "../icons/GitHub";

const links = [
	{ name: "Docs", href: "/docs" },
	{ name: "Components", href: "/components" },
	{ name: "Blog", href: "/blog" },
	{ name: "Changelog", href: "/changelog" },
];

export function HeaderApp() {
	return (
		<header className="sticky top-0 z-50 flex items-center justify-between w-full px-2 py-4 bg-linear-to-b from-(--primary-background-color) to-cyan-400/0 backdrop-blur-sm">
			<Flex gap={6} align="center">
				<AppLogo width={40} height={40} />
				<div className="text-lg font-bold text-(--foreground-color)">Lambda UI</div>
				<Tag size="tiny" variant="soft" radius="medium" text="v1.0.0" />
				<span className="flex items-center gap-1">
					<span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
					<span className="text-xs text-green-500 font-medium">Stable</span>
				</span>
			</Flex>
			<Flex gap={6} align="center" className="max-md:hidden">
				<nav className="flex gap-1">
					{links.map((link) => (
						<div key={link.name} className="flex items-center gap-x-2 ml-[2px]">
							<Link
								key={link.name}
								href={link.href}
								size="tiny"
								variant="text"
								color="neutral"
								type="button"
								radius="small"
							>
								{link.name}
							</Link>
							{link.name !== "Changelog" && <Divider orientation="vertical" color="white" />}
						</div>
					))}
				</nav>
			</Flex>
			<Flex gap={6} align="center">
				<Link
					size="small"
					variant="text"
					color="primary"
					radius="small"
					href="https://github.com/lambda-ui/lambda-ui-components"
					target="_blank"
					icon={<GitHubIcon />}
					type="button"
				/>
				<ButtonTheme size="small" variant="text" radius="small" color="primary" />
			</Flex>
		</header>
	);
}
