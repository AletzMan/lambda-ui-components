import { motion } from "framer-motion";
import { isValidElement } from "react";

export function FeatureCard({
	title,
	description,
	color,
	icon: Icon,
}: {
	title: string;
	description: string;
	color: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
	return (
		<div
			className={`
          relative overflow-hidden
          flex flex-col items-start justify-start p-6 rounded-lg 
          bg-linear-to-br from-(--surface-b) to-(--background-color)
          border border-(--surface-b) 
          shadow-lg shadow-black/20 min-h-40
        `}
		>
			<div
				className={`
            absolute inset-0 rounded-lg
            border-2 border-transparent  
            pointer-events-none 
          `}
			></div>

			<div className="flex flex-row items-center justify-start gap-3 w-full mb-3 z-10">
				<motion.div
					initial={{ scale: 1, rotate: 0, filter: "brightness(1)" }}
					animate={{
						scale: [1, 1.08, 1],
						rotate: [0, 6, -6, 0],
						filter: ["brightness(1)", "brightness(1.13)", "brightness(1)"],
					}}
					transition={{
						duration: 2.8,
						ease: "easeInOut",
						repeat: Infinity,
					}}
					className={`
              p-2 rounded-full 
              bg-(--lambda-color-primary-600) 
              text-white shadow-md shadow-black/20  
            `}
				>
					{<Icon />}
				</motion.div>

				<h2 className={`text-lg font-extrabold ${color}`}>{title}</h2>
			</div>

			<p className="text-sm text-(--foreground-secondary-color) leading-relaxed z-10 max-w-[calc(100%-64px)]">
				{description}
			</p>
			{<Icon className={`absolute bottom-1 right-1 w-16 h-16 opacity-5 ${color}`} />}
		</div>
	);
}
