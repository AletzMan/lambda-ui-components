import { cva } from "class-variance-authority";
import styles from "./styles.module.css";
import clsx from "clsx";

const helper = cva(styles["lambda-helper"], {
    variants: {
        size: {
            tiny: styles["lambda-helper-tiny"],
            small: styles["lambda-helper-small"],
            medium: styles["lambda-helper-medium"],
            large: styles["lambda-helper-large"],
        },
        disabled: {
            false: styles["lambda-helper-enabled"],
            true: styles["lambda-helper-disabled"],
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false
    }
});


interface HelperTextProps {
    text: string
    size?: "tiny" | "small" | "medium" | "large" | null
    disabled?: boolean | null
    focused?: boolean | null
    id?: string | undefined
}

export function HelperText({ text, size = "medium", disabled = false, focused, id }: HelperTextProps) {
    return (
        <label className={clsx(helper({ disabled, size }), { [styles["lambda-helper-focused"]]: focused })} id={id}>
            {text}
        </label>
    );
}