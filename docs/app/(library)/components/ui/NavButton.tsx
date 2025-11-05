import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface NavButtonProps {
	href: string;
	text: string;
	direction?: "left" | "right";
	className?: string;
	subLabel?: string;
}

export const NavButton = ({
	href,
	text,
	direction = "left",
	className = "",
	subLabel,
}: NavButtonProps) => {
	const isLeft = direction === "left";
	return (
		<Link
			href={href}
			className={`
        group flex items-center gap-4 px-2 py-2 rounded-lg   
		max-w-[290px] 
		w-full
        bg-(--surface-a) transition-all
		border border-(--surface-b)/70
		outline-2 outline-offset-2 outline-transparent hover:outline-(--primary-opacity-color)
        shadow-sm font-semibold no-underline
        focus:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-base-color) focus-visible:ring-offset-2
        ${isLeft ? "justify-start col-start-1" : "justify-end col-start-2 place-self-end"}
		 ${className}
      `}
			aria-label={text}
		>
			{isLeft && (
				<span className="flex items-center gap-2 ">
					<ChevronLeft className="w-6 h-6 text-(--primary-base-color) group-hover:-translate-x-1 transition-transform" />
					<span className="flex flex-col items-start">
						<span className="text-base font-semibold text-(--primary-base-color)">{text}</span>
						<span className="text-xs text-(--foreground-secondary-color)">
							{subLabel || "Previous page"}
						</span>
					</span>
				</span>
			)}
			{!isLeft && (
				<span className="flex items-center gap-2">
					<span className="flex flex-col items-end">
						<span className="text-base font-semibold text-(--primary-base-color)">{text}</span>
						<span className="text-xs text-(--foreground-secondary-color)">
							{subLabel || "Next page"}
						</span>
					</span>
					<ChevronRight className="w-6 h-6 text-(--primary-base-color) group-hover:translate-x-1 transition-transform" />
				</span>
			)}
		</Link>
	);
};
