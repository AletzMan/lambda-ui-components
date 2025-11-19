import { AppLogo } from "@/components/icons/AppLogo";
import { Ban } from "lucide-react";
import Link from "next/link";
import { Link as LambdaLink } from "lambda-ui-components";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-[calc(100svh-72px)] ">
			<div className="flex flex-col items-center gap-6 p-6 rounded-lg">
				{/* Logo animado */}
				<AppLogo width={60} height={60} className="animate-bounce" />

				{/* Icono grande */}
				<Ban size={110} className="text-(--danger-base-color) animate-pulse" />

				{/* Mensaje */}
				<h1 className="text-5xl font-extrabold text-(--neutral-hover-color)">404</h1>
				<h2 className="text-xl font-semibold text-(--foreground-title-color) mb-2">
					Oops! Page not found
				</h2>
				<p className="text-center text-(--foreground-secondary-color) max-w-md mb-4">
					We couldn't find the page you were looking for. You can go back to the
					<Link href="/docs/overview/introduction" className="text-blue-500 underline ml-1">
						Started guide
					</Link>
					.
				</p>

				{/* Botón grande */}
				<LambdaLink
					href="/"
					variant="solid"
					color="primary"
					type="button"
					radius="small"
					size="large"
				>
					Go Home
				</LambdaLink>
			</div>
		</div>
	);
}
