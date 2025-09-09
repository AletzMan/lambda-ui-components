// src/components/Link/Link.variants.ts

// Puedes definir variantes CVA aquí si el tipo 'default' las necesita.
// Si no, este archivo puede estar vacío o contener solo comentarios.

import { cva, VariantProps } from "class-variance-authority";
import styles from "./Link.module.css";

export const linkProps = cva(styles["lambda-link"], {
	variants: {
		color: {
			primary: styles["lambda-link-primary"],
			secondary: styles["lambda-link-secondary"],
			success: styles["lambda-link-success"],
			danger: styles["lambda-link-danger"],
			warning: styles["lambda-link-warning"],
			info: styles["lambda-link-info"],
		},
		size: {
			tiny: styles["lambda-link-tiny"],
			small: styles["lambda-link-small"],
			medium: styles["lambda-link-medium"],
			large: styles["lambda-link-large"],
		},
		disabled: {
			true: styles["lambda-link-disabled"],
		},
	},
	defaultVariants: {
		color: "primary",
		size: "medium",
		disabled: false,
	},
});

export const linkButtonProps = cva(styles["lambda-link-button"], {
	variants: {
		justify: {
			start: styles["lambda-link-button-start"],
			center: styles["lambda-link-button-center"],
			end: styles["lambda-link-button-end"],
		},
	},
	defaultVariants: {
		justify: "center",
	},
});

export type LinkDefaultVariants = VariantProps<typeof linkProps>;
export type LinkButtonVariants = VariantProps<typeof linkButtonProps>;
