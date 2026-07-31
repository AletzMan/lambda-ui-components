"use client";
import { GitHubIcon } from "@/components/icons/GitHub";
import { AppLogo } from "@/components/icons/AppLogo";
import { Heart } from "lucide-react";
import Link from "next/link";

export function HomeFooter() {
	return (
		<footer className="w-full bg-(--surface-b) border-t border-(--border-color) py-10 px-4 mt-20">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
				{/* Branding */}
				<div className="flex flex-col items-center md:items-start gap-3">
					<div className="flex items-center gap-3">
						<AppLogo width={32} height={32} />
						<span className="text-xl font-bold tracking-wide text-(--foreground-title-color)">
							Lambda UI
						</span>
					</div>
					<span className="text-xs text-(--foreground-secondary-color)">
						The modern React component library.
					</span>
				</div>

				{/* Navigation */}
				<div className="flex flex-col md:flex-row gap-8 text-sm font-medium">
					<div className="flex flex-col gap-2">
						<span className="font-semibold text-(--foreground-title-color)">Docs</span>
						<Link
							className="opacity-60 hover:opacity-100 transition-opacity no-underline"
							href="/docs/components"
						>
							Components
						</Link>
						<Link
							className="opacity-60 hover:opacity-100 transition-opacity no-underline"
							href="/docs/components/examples"
						>
							Examples
						</Link>
					</div>
					<div className="flex flex-col gap-2">
						<span className="font-semibold text-(--foreground-title-color)">Community</span>
						<Link
							className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity no-underline"
							href="https://github.com/AletzMan/lambda-ui-components"
							target="_blank"
						>
							{<GitHubIcon className="inline w-4 h-4" />}GitHub
						</Link>
					</div>
					<div className="flex flex-col gap-2">
						<span className="font-semibold text-(--foreground-title-color)">Project</span>
						<Link
							href="https://github.com/AletzMan/lambda-ui-components/blob/main/LICENSE"
							target="_blank"
						>
							MIT License
						</Link>
						<span className="text-xs text-(--foreground-secondary-color)">
							v1.0.0 &middot; Open Source
						</span>
					</div>
				</div>
			</div>

			<div className="border-t border-(--border-color) mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<span className="text-xs text-(--foreground-secondary-color)">
					&copy; {new Date().getFullYear()} Lambda UI. Made with{" "}
					<Heart className="inline w-4 h-4 text-pink-400 mx-1" /> in Mexico by AletzMan.
				</span>
				<span className="flex items-center gap-1  text-xs text-(--foreground-secondary-color)">
					<Link
						className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity no-underline"
						href="https://github.com/AletzMan/lambda-ui-components"
						target="_blank"
					>
						{<GitHubIcon className="w-4 h-4" />}Contribute on GitHub
					</Link>
				</span>
			</div>
		</footer>
	);
}
