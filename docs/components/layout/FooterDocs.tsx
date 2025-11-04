"use client";
import { GitHubIcon } from "@/components/icons/GitHub";
import { AppLogo } from "@/components/icons/AppLogo";
import { Heart } from "lucide-react";
import Link from "next/link";

export function FooterDocs() {
	return (
		<footer className="flex flex-col items-center w-full py-10 px-4 mt-20">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
				{/* Branding */}
				<div className="flex flex-col items-center gap-3">
					<AppLogo width={32} height={32} />
					<span className="text-xs text-(--foreground-secondary-color)">
						The modern React component library.
					</span>
				</div>
			</div>

			<div className="mt-2 flex flex-col items-center justify-between gap-4">
				<span className="text-xs text-(--foreground-secondary-color)">
					&copy; {new Date().getFullYear()} Lambda UI. Made with{" "}
					<Heart className="inline w-4 h-4 text-pink-400 mx-1" /> in Mexico by AletzMan.
				</span>
			</div>
		</footer>
	);
}
