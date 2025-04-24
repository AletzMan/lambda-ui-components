import styles from "./textarea.module.css";
import { cva, VariantProps } from "class-variance-authority";

export const textarea = cva(styles[`lambda-textarea`], {
    variants: {
        size: {
            tiny: styles["lambda-textarea-tiny"],
            small: styles["lambda-textarea-small"],
            medium: styles["lambda-textarea-medium"],
            large: styles["lambda-textarea-large"],
        },
        radius: {
            none: styles["lambda-textarea-radius-none"],
            small: styles["lambda-textarea-radius-small"],
            medium: styles["lambda-textarea-radius-medium"],
            large: styles["lambda-textarea-radius-large"],
        },
        variant: {
            outline: styles["lambda-textarea-outline"],
            borderless: styles["lambda-textarea-borderless"],
        },
        invalid: {
            true: styles["lambda-textarea-invalid"],
            false: "",
        },
        disabled: {
            false: styles["lambda-textarea-enabled"],
            true: styles["lambda-textarea-disabled"],
        },
    },
    defaultVariants: {
        variant: "outline",
        radius: 'small',
        disabled: false,
        size: 'medium',
        invalid: false,
    },
});

export const labelString = cva(styles[`lambda-textarea-label`], {
    variants: {
        radius: {
            none: styles["lambda-textarea-label-radius-none"],
            small: styles["lambda-textarea-label-radius-small"],
            medium: styles["lambda-textarea-label-radius-medium"],
            large: styles["lambda-textarea-label-radius-large"],
        },
        size: {
            tiny: styles["lambda-textarea-label-tiny"],
            small: styles["lambda-textarea-label-small"],
            medium: styles["lambda-textarea-label-medium"],
            large: styles["lambda-textarea-label-large"],
        },
        disabled: {
            false: styles["lambda-textarea-label-enabled"],
            true: styles["lambda-textarea-label-disabled"],
        }

    },
    defaultVariants: {
        disabled: false,
        radius: 'small',
        size: 'medium',
    },
});
export type TextAreaVariants = VariantProps<typeof textarea>;  