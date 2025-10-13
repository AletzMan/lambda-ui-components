import { cva, VariantProps } from "class-variance-authority";
import styles from "./avatar.module.css";

export const avatarVariants = cva(styles["lambda-avatar"], {
	variants: {
		size: {
			tiny: styles["lambda-avatar-tiny"],
			small: styles["lambda-avatar-small"],
			medium: styles["lambda-avatar-medium"],
			large: styles["lambda-avatar-large"],
		},
		overflow: {
			true: styles["lambda-avatar-overflow"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
