import { ReactNode } from "react";
import { AvatarVariants } from "./avatar.variants";

export interface AvatarProps {
	name: string;
	src?: string;
	size?: AvatarVariants["size"];
	className?: string;
	style?: React.CSSProperties;
	animate?: boolean;
}

export interface AvatarGroupProps {
	users: { name: string; src?: string }[];
	max?: number;
	size?: AvatarVariants["size"];
	className?: string;
	style?: React.CSSProperties;
	children?: ReactNode;
}
