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
		<header className="sticky top-0 z-50 flex items-center justify-between w-full px-2 py-2 bg-(--surface-a) border-b border-(--border-color)">
			<Flex gap={6} align="center">
				<AppLogo width={40} height={40} />
				<div className="text-lg font-bold text-(--foreground-color)">Lambda UI</div>
				<Tag size="tiny" variant="soft" radius="medium" text="v1.0.0" />
			</Flex>
			<Flex gap={6} align="center">
				<nav className="flex gap-1">
					{links.map((link) => (
						<Flex key={link.name} align="center">
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
							{link.name !== "Changelog" && <Divider orientation="vertical" />}
						</Flex>
					))}
				</nav>
			</Flex>
			<Flex gap={6} align="center">
				<Link
					size="small"
					variant="text"
					color="neutral"
					radius="small"
					href="https://github.com/lambda-ui/lambda-ui-components"
					target="_blank"
					icon={<GitHubIcon />}
					type="button"
				/>
				<ButtonTheme size="small" variant="text" radius="small" />
			</Flex>
		</header>
	);
}
