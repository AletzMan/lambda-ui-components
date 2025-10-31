import { cva } from "class-variance-authority";
import styles from "./buttonTheme.module.css";

export const buttonThemeIconVariants = cva(styles[`lambda-btn-theme-icon`], {
	variants: {
		size: {
			tiny: styles[`lambda-btn-theme-icon-tiny`],
			small: styles[`lambda-btn-theme-icon-small`],
			medium: styles[`lambda-btn-theme-icon-medium`],
			large: styles[`lambda-btn-theme-icon-large`],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});
