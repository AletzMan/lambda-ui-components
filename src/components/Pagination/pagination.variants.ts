import { cva, VariantProps } from "class-variance-authority";
import styles from "./pagination.module.css";

export const paginationWrapper = cva(styles["lambda-pagination-wrapper"], {
	variants: {
		disabled: {
			true: styles["lambda-pagination-wrapper-disabled"],
			false: "",
		},
	},
	defaultVariants: {
		disabled: false,
	},
});

export const paginationListContainer = cva(styles["lambda-pagination-list-container"], {
	variants: {
		size: {
			tiny: styles["lambda-pagination-list-container-tiny"],
			small: styles["lambda-pagination-list-container-small"],
			medium: styles["lambda-pagination-list-container-medium"],
			large: styles["lambda-pagination-list-container-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export const paginationButton = cva(styles["lambda-pagination-button"], {
	variants: {
		size: {
			tiny: styles["lambda-pagination-button-tiny"],
			small: styles["lambda-pagination-button-small"],
			medium: styles["lambda-pagination-button-medium"],
			large: styles["lambda-pagination-button-large"],
		},
		variant: {
			outline: styles["lambda-pagination-button-outline"],
			soft: styles["lambda-pagination-button-soft"],
			solid: styles["lambda-pagination-button-solid"],
			bordered: styles["lambda-pagination-button-bordered"],
		},
		radius: {
			none: styles["lambda-pagination-button-radius-none"],
			tiny: styles["lambda-pagination-button-radius-tiny"],
			small: styles["lambda-pagination-button-radius-small"],
			medium: styles["lambda-pagination-button-radius-medium"],
			large: styles["lambda-pagination-button-radius-large"],
			full: styles["lambda-pagination-button-radius-full"],
		},
		isActive: {
			true: styles["lambda-pagination-button-active"],
			false: "",
		},
		disabled: {
			true: styles["lambda-pagination-button-disabled"],
			false: "",
		},
		isNavigation: {
			true: styles["lambda-pagination-button-navigation"],
			false: "",
		},
	},
	compoundVariants: [
		{
			variant: "outline",
			isActive: true,
			className: styles["lambda-pagination-button-outline-active"],
		},
		{ variant: "soft", isActive: true, className: styles["lambda-pagination-button-soft-active"] },
		{
			variant: "solid",
			isActive: true,
			className: styles["lambda-pagination-button-solid-active"],
		},
		{
			variant: "bordered",
			isActive: true,
			className: styles["lambda-pagination-button-bordered-active"],
		},
		{
			isNavigation: true,
			disabled: true,
			className: styles["lambda-pagination-button-navigation-disabled"],
		},
	],
	defaultVariants: {
		size: "medium",
		variant: "outline",
		radius: "small",
		isActive: false,
		disabled: false,
		isNavigation: false,
	},
});

export type PaginationWrapperVariants = VariantProps<typeof paginationWrapper>;
export type PaginationListContainerVariants = VariantProps<typeof paginationListContainer>;
export type PaginationVariants = VariantProps<typeof paginationButton>;
