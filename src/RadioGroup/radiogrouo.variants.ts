import styles from "./radiogroup.module.css";
import { VariantProps, cva } from "class-variance-authority";


export const RadioGroups = cva(styles["radio-group"], {
    variants: {
        orientation: {
            vertical: styles["radio-group-vertical"],
            horizontal: styles["radio-group-horizontal"]
        },
        size: {
            tiny: styles["radio-group-tiny"],
            small: styles["radio-group-small"],
            medium: styles["radio-group-medium"],
            large: styles["radio-group-large"],
        },
        color: {
            primary: styles["radio-group-primary"],
            secondary: styles["radio-group-secondary"],
            danger: styles["radio-group-danger"],
            success: styles["radio-group-success"],
            warning: styles["radio-group-warning"],
            info: styles["radio-group-info"],
        },
        type: {
            radio: styles["radio-group-radio"],
            button: styles["radio-group-button"]
        },
        variant: {
            solid: styles["radio-group-solid"],
            flat: styles["radio-group-flat"],
            outline: styles["radio-group-outline"],
        },
        radius: {
            none: styles["radio-group-radius-none"],
            small: styles["radio-group-radius-small"],
            medium: styles["radio-group-radius-medium"],
            pill: styles["radio-group-radius-pill"],
        },
    },
    compoundVariants: [

    ],
    defaultVariants: {
        orientation: 'vertical',
        radius: "medium",
        size: "medium",
        type: "radio",
        variant: "solid",
        color: "primary",
    },
});


export type RadioGroupVariants = VariantProps<typeof RadioGroups>;