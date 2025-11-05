"use client";
import { AppLogo } from "../icons/AppLogo";
import {
	Button,
	ButtonTheme,
	Divider,
	Drawer,
	Flex,
	Link as LambdaLink,
	Tag,
} from "lambda-ui-components";
import { GitHubIcon } from "../icons/GitHub";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { SideBar } from "@/app/(library)/components/layout/SideBar";

const links = [
	{ name: "Docs", href: "/docs" },
	{ name: "Components", href: "/components" },
	{ name: "Blog", href: "/blog" },
	{ name: "Changelog", href: "/changelog" },
];

export function HeaderApp() {
	const [isOpen, setIsOpen] = useState(false);
	const pathName = usePathname();
	console.log(pathName);
	const isNotHome = pathName !== "/";
	return (
		<header
			className="sticky top-0 z-50 flex items-center justify-between w-full px-2 py-4 
		bg-linear-to-b from-(--primary-background-color) to-cyan-400/0 backdrop-blur-sm"
		>
			<Flex gap={6} align="center">
				<Link className="flex items-center gap-2" href="/">
					<AppLogo width={40} height={40} />
					<div className="text-lg font-bold text-(--foreground-color)">Lambda UI</div>
				</Link>
				<Tag size="tiny" variant="soft" radius="medium" text="v1.0.0" />
				<span className="flex items-center gap-1">
					<span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
					<span className="text-xs text-green-500 font-medium">Stable</span>
				</span>
			</Flex>
			<div className={`max-md:hidden flex gap-6 items-center ${isNotHome ? "hidden" : ""}`}>
				<nav className="flex gap-1">
					{links.map((link) => (
						<div key={link.name} className="flex items-center gap-x-2 ml-[3px]">
							<LambdaLink
								key={link.name}
								href={link.href}
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
			<Flex gap={12} align="center">
				<LambdaLink
					size="tiny"
					variant="text"
					color="primary"
					radius="small"
					href="https://github.com/lambda-ui/lambda-ui-components"
					target="_blank"
					icon={<GitHubIcon />}
					type="button"
				/>
				<ButtonTheme size="tiny" variant="text" radius="small" color="primary" />
				{isNotHome && (
					<div className="min-[780px]:hidden">
						<Button
							size="tiny"
							variant="text"
							radius="small"
							color="primary"
							icon={<MenuIcon />}
							onClick={() => setIsOpen(true)}
						/>
					</div>
				)}
			</Flex>
			<Drawer
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				width="xsmall"
				showCloseButton={false}
				title={
					<Link className="flex items-center gap-2" href="/">
						<AppLogo width={40} height={40} />
						<div className="text-lg font-bold text-(--foreground-color)">Lambda UI</div>
					</Link>
				}
			>
				<SideBar />
			</Drawer>
		</header>
	);
}
