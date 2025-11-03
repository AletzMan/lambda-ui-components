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
		/*{
			title: "Customizable",
			description: "Easy to theme and extend.",
			color: "text-pink-500",
			icon: <Sliders />,
		},
		{
			title: "Performance",
			description: "Optimized for speed and low bundle size.",
			color: "text-yellow-500",
			icon: <Zap />,
		},*/
	];
	return (
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
	);
}
