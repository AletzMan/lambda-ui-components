import { FooterDocs } from "@/components/layout/FooterDocs";
import { NavButton } from "../ui/NavButton";

interface BarNavButtonProps {
	buttonLeft?: {
		href: string;
		text: string;
	};
	buttonRight?: {
		href: string;
		text: string;
	};
}

export const BarNavButton = ({ buttonLeft, buttonRight }: BarNavButtonProps) => {
	return (
		<div className="grid grid-cols-2 gap-10 mt-10 w-full">
			{buttonLeft && <NavButton href={buttonLeft.href} text={buttonLeft.text} direction="left" />}
			{buttonRight && (
				<NavButton href={buttonRight.href} text={buttonRight.text} direction="right" />
			)}
		</div>
	);
};
