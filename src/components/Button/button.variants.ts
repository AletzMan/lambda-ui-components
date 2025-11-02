import { VariantProps, cva } from "class-variance-authority";
import styles from "./button.module.css";

export const button = cva(styles[`lambda-btn`], {
	variants: {
		color: {
			neutral: styles[`lambda-btn-neutral`],
			primary: styles[`lambda-btn-primary`],
			secondary: styles[`lambda-btn-secondary`],
			danger: styles[`lambda-btn-danger`],
			success: styles[`lambda-btn-success`],
			warning: styles[`lambda-btn-warning`],
			info: styles[`lambda-btn-info`],
		},
		variant: {
			classic: styles[`lambda-btn-classic`],
			solid: styles[`lambda-btn-solid`],
			outline: styles[`lambda-btn-outline`],
			dashed: styles[`lambda-btn-dashed`],
			soft: styles[`lambda-btn-soft`],
			subtle: styles[`lambda-btn-subtle`],
			text: styles[`lambda-btn-text`],
			unstyled: styles[`lambda-btn-unstyled`],
		},
		size: {
			tiny: styles[`lambda-btn-tiny`],
			small: styles[`lambda-btn-small`],
			medium: styles[`lambda-btn-medium`],
			large: styles[`lambda-btn-large`],
		},
		radius: {
			none: styles[`lambda-btn-radius-none`],
			tiny: styles[`lambda-btn-radius-tiny`],
			small: styles[`lambda-btn-radius-small`],
			medium: styles[`lambda-btn-radius-medium`],
			large: styles[`lambda-btn-radius-large`],
			full: styles[`lambda-btn-radius-full`],
		},
		block: {
			true: styles[`lambda-btn-width-block`],
			false: styles[`lambda-btn-width-normal`],
		},
		isCircle: {
			true: styles[`lambda-btn-circle`],
			false: styles[`lambda-btn-normal`],
		},
		iconPosition: {
			left: styles[`lambda-btn-icon-left`],
			right: styles[`lambda-btn-icon-right`],
		},
		loading: {
			true: styles[`lambda-btn-loading`],
			false: styles[`lambda-btn-normal`],
		},
		disabled: {
			false: styles[`lambda-btn-enabled`],
			true: styles[`lambda-btn-disabled`],
		},
		joinposition: {
			first: styles[`lambda-btn-first`],
			middle: styles[`lambda-btn-middle`],
			last: styles[`lambda-btn-last`],
			single: styles[`lambda-btn-single`],
		},
		onlyIcon: {
			true: styles[`lambda-btn-only-icon`],
			false: styles[`lambda-btn-without-icon`],
		},
	},
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "medium",
		radius: "small",
		block: false,
		isCircle: false,
		disabled: false,
		iconPosition: "left",
		loading: false,
		joinposition: "single",
	},
});

export type ButtonVariants = VariantProps<typeof button>;
