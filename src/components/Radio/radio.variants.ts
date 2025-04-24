import { VariantProps, cva } from "class-variance-authority";
import styles from "./radio.module.css";

export const radioprop = cva(styles["radio"], {
    variants: {
        color: {
            primary: styles["radio-primary"],
            secondary: styles["radio-secondary"],
            danger: styles["radio-danger"],
            success: styles["radio-success"],
            warning: styles["radio-warning"],
            info: styles["radio-info"],
        },
        size: {
            tiny: styles["radio-tiny"],
            small: styles["radio-small"],
            medium: styles["radio-medium"],
            large: styles["radio-large"],
        },
        variant: {
            solid: styles["radio-solid"],
            flat: styles["radio-flat"],
            outline: styles["radio-outline"],
        },
        type: {
            radio: styles["radio-radio"],
            button: styles["radio-button"]
        },
        disabled: {
            true: styles["radio-disabled"],
            false: "",
        },
    }, compoundVariants: [

    ],
    defaultVariants: {
        size: "medium",
        variant: "solid",
        color: "primary",
        disabled: false,
        type: "radio",
    },
});

export const view = cva(styles["radio-view"], {
    variants: {
        color: {
            primary: styles["radio-view-primary"],
            secondary: styles["radio-view-secondary"],
            danger: styles["radio-view-danger"],
            success: styles["radio-view-success"],
            warning: styles["radio-view-warning"],
            info: styles["radio-view-info"],
        },
        size: {
            tiny: styles["radio-view-tiny"],
            small: styles["radio-view-small"],
            medium: styles["radio-view-medium"],
            large: styles["radio-view-large"],
        },
        variant: {
            solid: styles["radio-view-solid"],
            flat: styles["radio-view-flat"],
            outline: styles["radio-view-outline"],
        },
        type: {
            radio: styles["radio-view-radio"],
            button: styles["radio-view-button"]
        },
        checked: {
            true: styles["radio-view-checked"],
            false: "",
        },
        disabled: {
            true: styles["radio-view-disabled"],
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        variant: "solid",
        color: "primary",
        checked: false,
        type: "radio",
        disabled: false,
    },
});

export const wrapper = cva(styles["radio-wrapper"], {
    variants: {
        positionLabel: {
            left: styles["radio-wrapper-left"],
            right: styles["radio-wrapper-right"],
            top: styles["radio-wrapper-top"],
            bottom: styles["radio-wrapper-bottom"],
        },
        color: {
            primary: styles["radio-wrapper-primary"],
            secondary: styles["radio-wrapper-secondary"],
            danger: styles["radio-wrapper-danger"],
            success: styles["radio-wrapper-success"],
            warning: styles["radio-wrapper-warning"],
            info: styles["radio-wrapper-info"],
        },
        size: {
            tiny: styles["radio-wrapper-tiny"],
            small: styles["radio-wrapper-small"],
            medium: styles["radio-wrapper-medium"],
            large: styles["radio-wrapper-large"],
        },
        variant: {
            solid: styles["radio-wrapper-solid"],
            flat: styles["radio-wrapper-flat"],
            outline: styles["radio-wrapper-outline"],
        },
        type: {
            radio: styles["radio-wrapper-radio"],
            button: styles["radio-wrapper-button"]
        },
        disabled: {
            true: styles["radio-wrapper-disabled"],
            false: "",
        },
    },
    defaultVariants: {
        positionLabel: "right",
        color: "primary",
        size: "medium",
        type: "radio",
        variant: "solid",
        disabled: false
    },
});

export const iconView = cva(styles["radio-icon"], {
    variants: {
        color: {
            primary: styles["radio-icon-primary"],
            secondary: styles["radio-icon-secondary"],
            danger: styles["radio-icon-danger"],
            success: styles["radio-icon-success"],
            warning: styles["radio-icon-warning"],
            info: styles["radio-icon-info"],
        },
        size: {
            tiny: styles["radio-icon-tiny"],
            small: styles["radio-icon-small"],
            medium: styles["radio-icon-medium"],
            large: styles["radio-icon-large"],
        },
        type: {
            radio: styles["radio-icon-radio"],
            button: styles["radio-icon-button"]
        },
        disabled: {
            true: styles["radio-icon-disabled"],
            false: "",
        },
        checked: {
            true: styles["radio-icon-checked"],
            false: "",
        },
    },
    defaultVariants: {
        color: "primary",
        disabled: false,
        size: "medium",
        type: "radio",
        checked: false,
    },
});

export const labelName = cva(styles["radio-label"], {
    variants: {
        type: {
            radio: styles["radio-label-radio"],
            button: styles["radio-label-button"]
        },
        size: {
            tiny: styles["radio-label-tiny"],
            small: styles["radio-label-small"],
            medium: styles["radio-label-medium"],
            large: styles["radio-label-large"],
        },
        disabled: {
            true: styles["radio-label-disabled"],
            false: "",
        },
    },
    defaultVariants: {
        disabled: false,
        type: "radio",
        size: "medium"
    },
});

export type RadioVariants = VariantProps<typeof wrapper>