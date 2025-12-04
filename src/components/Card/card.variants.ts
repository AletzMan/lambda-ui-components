import styles from "./card.module.css";
import { cva, VariantProps } from "class-variance-authority";

export const card = cva(styles[`lambda-card`], {
	variants: {
		variant: {
			outline: styles[`lambda-card-outline`],
			borderless: styles[`lambda-card-borderless`],
		},
		size: {
			small: styles[`lambda-card-small`],
			medium: styles[`lambda-card-medium`],
			large: styles[`lambda-card-large`],
		},
		radius: {
			default: styles[`lambda-card-radius-default`],
			none: styles[`lambda-card-radius-none`],
			tiny: styles[`lambda-card-radius-tiny`],
			small: styles[`lambda-card-radius-small`],
			medium: styles[`lambda-card-radius-medium`],
			large: styles[`lambda-card-radius-large`],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "medium",
		radius: "default",
	},
});

export type CardVariants = VariantProps<typeof card>;
