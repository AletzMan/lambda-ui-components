import { cva } from "class-variance-authority";
import styles from "./styles.module.css"
import { TriangleAlert } from "lucide-react";


interface InvalidMessageProps {
    size?: "medium" | "small" | "large" | "tiny" | null | undefined
    invalid?: boolean
    errorMessage?: string
    marginArrow?: number
}

const invalidMessage = cva(styles["lambda-message-invalid"], {
    variants: {
        size: {
            tiny: styles["lambda-message-invalid-tiny"],
            small: styles["lambda-message-invalid-small"],
            medium: styles["lambda-message-invalid-medium"],
            large: styles["lambda-message-invalid-large"],
        },
        invalid: {
            true: styles["lambda-input-group-invalid"],
            false: "",
        },
    },
    defaultVariants: {
        size: "medium",
        invalid: false,
    },
})


export function InvalidMessage({ size, invalid, errorMessage, marginArrow }: InvalidMessageProps) {

    console.log(marginArrow)
    return (
        <div className={invalidMessage({ invalid, size })} style={{ "--after-left": marginArrow ? `${marginArrow + 6}px` : "6px" } as React.CSSProperties}><TriangleAlert className={styles["lambda-message-invalid-icon"]} />{errorMessage}</div>
    );
};