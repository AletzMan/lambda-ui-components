"use client";
import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";

import {
	Layers,
	Palette,
	SunMoon,
	ShieldCheck,
	Zap,
	Sliders,
	Code2,
	Accessibility,
} from "lucide-react";
import { Flex } from "../../../dist/main";

export function FeatureSection() {
	const features = [
		{
			title: "Modern",
			description: "A modern, flexible, and production-ready React component library.",
			color: "text-cyan-500",
			icon: Palette,
		},
		{
			title: "Dark mode",
			description: "Seamless light/dark switching.",
			color: "text-amber-500",
			icon: SunMoon,
		},
		{
			title: "Flexible",
			description: "Highly composable and customizable for any project.",
			color: "text-fuchsia-500",
			icon: Layers,
		},
		{
			title: "Production-ready",
			description: "Reliable and robust for real-world apps.",
			color: "text-indigo-500",
			icon: ShieldCheck,
		},
		{
			title: "Accessible",
			description: "Built with accessibility best practices.",
			color: "text-green-500",
			icon: Accessibility,
		},
		{
			title: "TypeScript support",
			description: "100% typed for a great developer experience.",
			color: "text-blue-500",
			icon: Code2,
		},
		{
			title: "Multiple Themes",
			description: "Choose from a variety of pre-built themes or create your own.",
			color: "text-pink-500",
			icon: Sliders,
		},
	];
	return (
		<Flex className="flex w-full max-[839px]:w-full max-[839px]:justify-center justify-center px-14 py-16">
			<section className="flex flex-col items-center justify-center gap-8 w-full">
				<motion.h2
					className="text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-indigo-500 to-cyan-500 bg-clip-text text-transparent"
					initial={{ backgroundPosition: "0% 50%" }}
					animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
					transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
					style={{ backgroundSize: "200% 200%" }}
				>
					Why Lambda UI?
				</motion.h2>
				<section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4  min-h-[400px] w-full">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							title={feature.title}
							description={feature.description}
							color={feature.color}
							icon={feature.icon}
						/>
					))}
				</section>
			</section>
		</Flex>
	);
}
