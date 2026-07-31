"use client";
import { GitHubIcon } from "@/components/icons/GitHub";
import { Link } from "lambda-ui-components";
import { Rocket } from "lucide-react";
import { basePath } from "../utils/basePath";

export function CallToActionSection() {


	return (
		<section className="w-full flex flex-col items-center justify-center py-25 my-25">
			<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
				Ready to build your next masterpiece?
			</h2>
			<p className="text-lg text-(--foreground-secondary-color) text-center mb-8 max-w-xl">
				Start using Lambda UI Components and create beautiful, modern interfaces in minutes.
			</p>
			<div className="flex gap-4">
				<Link
					label="Get Started"
					size="large"
					color="primary"
					variant="solid"
					radius="small"
					href={`${basePath}/docs/overview/introduction`}
					target="_blank"
					iconPosition="left"
					icon={<Rocket />}
					type="button"
				/>
				<Link
					label="Star on GitHub"
					size="large"
					color="neutral"
					variant="solid"
					icon={<GitHubIcon />}
					href="https://github.com/AletzMan/lambda-ui-components"
					target="_blank"
					type="button"
				/>
			</div>
		</section>
	);
}
