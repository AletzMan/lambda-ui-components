
import { VariantProps, cva } from "class-variance-authority";
import styles from "./select.module.css";

export const select = cva(styles["select-container"], {
    variants: {
        size: {
            tiny: styles["select-container-tiny"],
            small: styles["select-container-small"],
            medium: styles["select-container-medium"],
            large: styles["select-container-large"],
        },
        variant: {
            outline: styles["select-container-outline"],
            flat: styles["select-container-flat"],
            underline: styles["select-container-underline"],
        },
        radius: {
            none: styles["select-container-radius-none"],
            small: styles["select-container-radius-small"],
            medium: styles["select-container-radius-medium"],
            large: styles["select-container-radius-large"],
            pill: styles["select-container-radius-pill"],
        },
        disabled: {
            true: styles["select-container-disabled"],
            false: styles["select-container-enabled"],
        },
        invalid: {
            true: styles["select-container-invalid"],
            false: "",
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "small",
        disabled: false,
        invalid: false,
    },
});
export const buttonSelect = cva(styles["select-btn"], {
    variants: {
        size: {
            tiny: styles["select-btn-tiny"],
            small: styles["select-btn-small"],
            medium: styles["select-btn-medium"],
            large: styles["select-btn-large"],
        },
        variant: {
            outline: styles["select-btn-outline"],
            flat: styles["select-btn-flat"],
            underline: styles["select-btn-underline"],
        },
        radius: {
            none: styles["select-btn-radius-none"],
            small: styles["select-btn-radius-small"],
            medium: styles["select-btn-radius-medium"],
            large: styles["select-btn-radius-large"],
            pill: styles["select-btn-radius-pill"],
        },
        disabled: {
            true: styles["select-btn-disabled"],
            false: styles["select-btn-enabled"],
        },
        invalid: {
            true: styles["select-btn-invalid"],
            false: "",
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "small",
        disabled: false,
        invalid: false,
    },
});

export const selectIcon = cva(styles["select-icon"], {
    variants: {
        variant: {
            outline: styles["select-icon-outline"],
            flat: styles["select-icon-flat"],
            underline: styles["select-icon-underline"],
        },
        size: {
            tiny: styles["select-icon-tiny"],
            small: styles["select-icon-small"],
            medium: styles["select-icon-medium"],
            large: styles["select-icon-large"],
        },
        disabled: {
            true: styles["select-icon-disabled"],
            false: styles["select-icon-enabled"],
        },
        invalid: {
            true: styles["select-icon-invalid"],
            false: "",
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        disabled: false,
        invalid: false,
    },
});

export const dropdown = cva(styles["select-dropdown"], {
    variants: {
        size: {
            tiny: styles["select-dropdown-tiny"],
            small: styles["select-dropdown-small"],
            medium: styles["select-dropdown-medium"],
            large: styles["select-dropdown-large"],
        },
        direction: {
            up: styles["select-dropdown-up"],
            down: styles["select-dropdown-down"],
        },
        variant: {
            outline: styles["select-dropdown-outline"],
            flat: styles["select-dropdown-flat"],
            underline: styles["select-dropdown-underline"],
        },
        radius: {
            none: styles["select-dropdown-radius-none"],
            small: styles["select-dropdown-radius-small"],
            medium: styles["select-dropdown-radius-medium"],
            large: styles["select-dropdown-radius-large"],
            pill: styles["select-dropdown-radius-pill"],
        },
        isOpen: {
            true: styles["select-dropdown-opn"],
            false: styles["select-dropdown-cls"],
        }
    },
    defaultVariants: {
        direction: "down",
        isOpen: false,
        radius: "small",
        size: "medium",
        variant: "outline"
    }
});

export const labelSelect = cva(styles["select-label"], {
    variants: {
        size: {
            tiny: styles["select-label-tiny"],
            small: styles["select-label-small"],
            medium: styles["select-label-medium"],
            large: styles["select-label-large"],
        },
        direction: {
            up: styles["select-label-up"],
            down: styles["select-label-down"],
        },
        radius: {
            none: styles["select-label-radius-none"],
            small: styles["select-label-radius-small"],
            medium: styles["select-label-radius-medium"],
            large: styles["select-label-radius-large"],
            pill: styles["select-label-radius-pill"],
        },
        required: {
            true: styles["select-label-required"]
        }
    },
    defaultVariants: {
        direction: "down",
        radius: "small",
        size: "medium",
        required: false
    }
});

export const selectedView = cva(styles["select-view"], {
    variants: {
        size: {
            tiny: styles["select-view-tiny"],
            small: styles["select-view-small"],
            medium: styles["select-view-medium"],
            large: styles["select-view-large"],
        },
        disabled: {
            true: styles["select-view-disabled"],
            false: styles["select-view-enabled"],
        },
    },
    defaultVariants: {
        size: "medium",
        disabled: false,
    }
});
export const textContent = cva(styles["select-option-text-content"], {
    variants: {
        size: {
            tiny: styles["select-option-text-content-tiny"],
            small: styles["select-option-text-content-small"],
            medium: styles["select-option-text-content-medium"],
            large: styles["select-option-text-content-large"],
        },
    },
    defaultVariants: {
        size: "medium",
    }
});

export type SelectVariants = VariantProps<typeof select>;