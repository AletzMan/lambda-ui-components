import { cva, VariantProps } from "class-variance-authority";
import styles from "./tag.module.css";

export const tagStyles = cva(styles["lambda-tag"], {
	variants: {
		color: {
			primary: styles["lambda-tag-primary"],
			secondary: styles["lambda-tag-secondary"],
			danger: styles["lambda-tag-danger"],
			success: styles["lambda-tag-success"],
			warning: styles["lambda-tag-warning"],
			info: styles["lambda-tag-info"],
		},
		size: {
			tiny: styles["lambda-tag-tiny"],
			small: styles["lambda-tag-small"],
			medium: styles["lambda-tag-medium"],
			large: styles["lambda-tag-large"],
		},
		variant: {
			solid: styles["lambda-tag-solid"],
			soft: styles["lambda-tag-soft"],
			outline: styles["lambda-tag-outline"],
			dashed: styles["lambda-tag-dashed"],
			subtle: styles["lambda-tag-subtle"],
		},
		radius: {
			none: styles["lambda-tag-radius-none"],
			tiny: styles["lambda-tag-radius-tiny"],
			small: styles["lambda-tag-radius-small"],
			medium: styles["lambda-tag-radius-medium"],
			large: styles["lambda-tag-radius-large"],
			full: styles["lambda-tag-radius-full"],
		},
	},
	defaultVariants: {
		color: "primary",
		size: "small",
		variant: "subtle",
		radius: "small",
	},
});

export const countStyles = cva(styles["lambda-tag-count"], {
	variants: {
		size: {
			tiny: styles["lambda-tag-count-tiny"],
			small: styles["lambda-tag-count-small"],
			medium: styles["lambda-tag-count-medium"],
			large: styles["lambda-tag-count-large"],
		},
	},
	defaultVariants: {
		size: "small",
	},
});

export const closeButtonStyles = cva(styles["lambda-tag-close-button"], {
	variants: {
		size: {
			tiny: styles["lambda-tag-close-button-tiny"],
			small: styles["lambda-tag-close-button-small"],
			medium: styles["lambda-tag-close-button-medium"],
			large: styles["lambda-tag-close-button-large"],
		},
	},
	defaultVariants: {
		size: "small",
	},
});

export type TagProps = VariantProps<typeof tagStyles> & VariantProps<typeof countStyles>;
