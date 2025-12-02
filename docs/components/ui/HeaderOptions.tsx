"use client";

import { Button, Drawer, Flex, Link as LambdaLink, SwitchTheme } from "lambda-ui-components";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AppLogo } from "../icons/AppLogo";
import { SideBar } from "@/app/(library)/components/layout/SideBar";
import { MenuIcon } from "lucide-react";
import { GitHubIcon } from "../icons/GitHub";

export default function HeaderOptions() {
	const [isOpen, setIsOpen] = useState(false);
	const pathName = usePathname();
	const isNotHome = pathName !== "/";
	return (
		<>
			<Flex gap={12} align="center">
				<LambdaLink
					size="tiny"
					variant="text"
					radius="small"
					href="https://github.com/AletzMan/lambda-ui-components"
					target="_blank"
					icon={<GitHubIcon />}
					type="button"
				/>
				<SwitchTheme size="tiny" variant="text" radius="small" />
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
		</>
	);
}
