import { ReactNode, forwardRef, isValidElement } from "react";
import styles from "./button.module.css";
import { Loader } from "lucide-react";
import clsx from 'clsx';
import { useInputGroup } from "../InputGroup/InputGroup";
import { button } from "./button.variants";
import { ButtonProps } from "./button.types";


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "solid",
            color = "primary",
            size = "medium",
            radius = "small",
            icon,
            label,
            iconPosition = "left",
            loadingText,
            loading,
            ...props
        },
        ref
    ) => {
        let contextSize, contextDisabled;
        try {
            const context = useInputGroup();
            contextSize = context.size;
            contextDisabled = context.disabled;
        } catch (_e) {
            contextSize = size;
            contextDisabled = props.disabled;
        }

        const content = props.children || (label && <span className={styles["lambda-btn-label"]}>{(loading && loadingText) ? loadingText : label}</span>);

        return (
            <button
                ref={ref}
                aria-label={props['aria-label']}
                aria-busy={loading ? true : undefined}
                className={clsx(
                    button({
                        variant,
                        size: contextSize,
                        color,
                        disabled: contextDisabled,
                        radius,
                        loading,
                        iconPosition,
                        className,
                    }),
                    { [styles["lambda-btn-only-icon"]]: !(isValidElement<ReactNode>(props.children) || label) }
                )}
                disabled={contextDisabled || undefined}
                {...props}
            >
                {(icon || loading) && (
                    <span className={clsx(styles["lambda-btn-icon"], { [styles["lambda-btn-icon-only"]]: !label })}>
                        {loading ? <Loader className={styles["lambda-btn-icon-loading"]} /> : icon}
                    </span>
                )}
                {content}
            </button>
        );
    }
);