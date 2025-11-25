import { ReactNode } from "react";
import { AvatarVariants } from "./avatar.variants";

export interface AvatarProps {
	/**
	 * Name of the user. Used to generate initials when no image is provided.
	 * The initials are automatically generated from the first letters of the name.
	 */
	name: string;
	
	/**
	 * Image URL for the avatar. If provided, displays the image instead of initials.
	 */
	src?: string;
	
	/**
	 * Size of the avatar.
	 * @default "medium"
	 */
	size?: AvatarVariants["size"];
	
	/**
	 * Additional CSS class name for custom styling.
	 */
	className?: string;
	
	/**
	 * Inline styles to apply to the avatar.
	 */
	style?: React.CSSProperties;
	
	/**
	 * Enable hover and tap animations.
	 * @default false
	 */
	animate?: boolean;
}

export interface AvatarGroupProps {
	/**
	 * Array of user objects to display as avatars.
	 * Each user should have a name and optionally an image src.
	 */
	users: { name: string; src?: string }[];
	
	/**
	 * Maximum number of avatars to display.
	 * Remaining avatars will be shown as a "+N" indicator.
	 * @default 5
	 */
	max?: number;
	
	/**
	 * Size of all avatars in the group.
	 * @default "medium"
	 */
	size?: AvatarVariants["size"];
	
	/**
	 * Additional CSS class name for custom styling.
	 */
	className?: string;
	
	/**
	 * Inline styles to apply to the avatar group container.
	 */
	style?: React.CSSProperties;
	
	/**
	 * Additional content to render after the avatars.
	 */
	children?: ReactNode;
}
