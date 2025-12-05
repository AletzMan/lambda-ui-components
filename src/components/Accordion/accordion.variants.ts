import { cva, VariantProps } from "class-variance-authority";
import styles from "./Accordion.module.css";

export const accordionVariants = cva(styles["lambda-accordion"], {
	variants: {
		radius: {
			default: styles["lambda-accordion-radius-default"],
			none: styles["lambda-accordion-radius-none"],
			tiny: styles["lambda-accordion-radius-tiny"],
			small: styles["lambda-accordion-radius-small"],
			medium: styles["lambda-accordion-radius-medium"],
			large: styles["lambda-accordion-radius-large"],
		},
		variant: {
			default: styles["lambda-accordion-default"],
			flush: styles["lambda-accordion-flush"],
			split: styles["lambda-accordion-split"],
			soft: styles["lambda-accordion-soft"],
		},
		size: {
			tiny: styles["lambda-accordion-size-tiny"],
			small: styles["lambda-accordion-size-small"],
			medium: styles["lambda-accordion-size-medium"],
			large: styles["lambda-accordion-size-large"],
		},
	},
	defaultVariants: {
		variant: "default",
		radius: "default",
		size: "medium",
	},
});

export const accordionItemVariants = cva(styles["lambda-accordion-item"], {
	variants: {
		radius: {
			default: styles["lambda-accordion-item-radius-default"],
			none: styles["lambda-accordion-item-radius-none"],
			tiny: styles["lambda-accordion-item-radius-tiny"],
			small: styles["lambda-accordion-item-radius-small"],
			medium: styles["lambda-accordion-item-radius-medium"],
			large: styles["lambda-accordion-item-radius-large"],
		},
		variant: {
			default: styles["lambda-accordion-item-default"],
			flush: styles["lambda-accordion-item-flush"],
			split: styles["lambda-accordion-item-split"],
			soft: styles["lambda-accordion-item-soft"],
		},
		state: {
			open: styles["lambda-accordion-item-open"],
			closed: styles["lambda-accordion-item-closed"],
		},
		disabled: {
			true: styles["lambda-accordion-item-disabled"],
			false: "",
		},
	},
	compoundVariants: [
		{
			state: "open",
		},
	],
	defaultVariants: {
		radius: "default",
		state: "closed",
		disabled: false,
		variant: "default",
	},
});

export const accordionHeaderVariants = cva(styles["lambda-accordion-header"], {
	variants: {
		variant: {
			default: styles["lambda-accordion-header-default"],
			flush: styles["lambda-accordion-header-flush"],
			split: styles["lambda-accordion-header-split"],
			soft: styles["lambda-accordion-header-soft"],
		},
		state: {
			open: styles["lambda-accordion-header-open"],
			closed: styles["lambda-accordion-header-closed"],
		},
		disabled: {
			true: styles["lambda-accordion-header-disabled"],
			false: "",
		},
		size: {
			tiny: styles["lambda-accordion-header-tiny"],
			small: styles["lambda-accordion-header-small"],
			medium: styles["lambda-accordion-header-medium"],
			large: styles["lambda-accordion-header-large"],
		},
	},
	compoundVariants: [
		{
			state: "open",
		},
	],
	defaultVariants: {
		state: "closed",
		disabled: false,
		size: "medium",
		variant: "default",
	},
});

export const accordionContentVariants = cva(styles["lambda-accordion-content"], {
	variants: {
		state: {
			open: styles["lambda-accordion-content-open"],
			closed: styles["lambda-accordion-content-closed"],
		},
		size: {
			tiny: styles["lambda-accordion-content-tiny"],
			small: styles["lambda-accordion-content-small"],
			medium: styles["lambda-accordion-content-medium"],
			large: styles["lambda-accordion-content-large"],
		},
		variant: {
			default: styles["lambda-accordion-content-default"],
			flush: styles["lambda-accordion-content-flush"],
			split: styles["lambda-accordion-content-split"],
			soft: styles["lambda-accordion-content-soft"],
		},
	},
	compoundVariants: [
		{
			state: "open",
		},
	],
	defaultVariants: {
		state: "closed",
		size: "medium",
		variant: "default",
	},
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;
