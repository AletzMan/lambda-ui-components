import { cva, VariantProps } from "class-variance-authority";
import styles from "./tooltip.module.css";

export const tooltipContainer = cva(styles["lambda-tooltip-container"], {
    variants: {
        size: {
            small: styles["lambda-tooltip-container-small"],
            medium: styles["lambda-tooltip-container-medium"],
            large: styles["lambda-tooltip-container-large"],
        },
        color: {
            primary: styles["lambda-tooltip-container-primary"],
            secondary: styles["lambda-tooltip-container-secondary"],
            success: styles["lambda-tooltip-container-success"],
            danger: styles["lambda-tooltip-container-danger"],
            warning: styles["lambda-tooltip-container-warning"],
            info: styles["lambda-tooltip-container-info"],
        },
        position: {
            'top-left': styles["lambda-tooltip-container-top-left"],
            'top-center': styles["lambda-tooltip-container-top-center"],
            'top-right': styles["lambda-tooltip-container-top-right"],
            'bottom-left': styles["lambda-tooltip-container-bottom-left"],
            'bottom-center': styles["lambda-tooltip-container-bottom-center"],
            'bottom-right': styles["lambda-tooltip-container-bottom-right"],
        }
    },
    defaultVariants: {
        size: "medium",
        color: "secondary",
        position: 'top-center',
    },
});

export const tooltipArrow = cva(styles["lambda-tooltip-arrow"], {
    variants: {
        // La "posición" de la flecha es la opuesta a la posición principal del tooltip
        // Si el tooltip está "top", la flecha está en la "bottom" del tooltip box.
        // Si el tooltip está "bottom", la flecha está en la "top" del tooltip box.
        // La alineación horizontal (left/center/right) también importa.
        arrowPosition: {
            'bottom-left': styles["lambda-tooltip-arrow-bottom-left"],
            'bottom-center': styles["lambda-tooltip-arrow-bottom-center"],
            'bottom-right': styles["lambda-tooltip-arrow-bottom-right"],
            'top-left': styles["lambda-tooltip-arrow-top-left"],
            'top-center': styles["lambda-tooltip-arrow-top-center"],
            'top-right': styles["lambda-tooltip-arrow-top-right"],
        },
        size: {
            small: styles["lambda-tooltip-arrow-small"],
            medium: styles["lambda-tooltip-arrow-medium"],
            large: styles["lambda-tooltip-arrow-large"],
        },
        color: {
            primary: styles["lambda-tooltip-arrow-primary"],
            secondary: styles["lambda-tooltip-arrow-secondary"],
            success: styles["lambda-tooltip-arrow-success"],
            danger: styles["lambda-tooltip-arrow-danger"],
            warning: styles["lambda-tooltip-arrow-warning"],
            info: styles["lambda-tooltip-arrow-info"],
        }
    },
    defaultVariants: {
        arrowPosition: 'bottom-center',
        size: 'medium',
        color: 'secondary',
    },
});

export type TooltipContainerVariants = VariantProps<typeof tooltipContainer>;
export type TooltipArrowVariants = VariantProps<typeof tooltipArrow>; 