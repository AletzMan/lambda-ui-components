import { useState, forwardRef, SelectHTMLAttributes, useRef, useEffect, useCallback } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./select.module.css";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import { InvalidMessage } from "../_internal/components/InvalidMessage/InvalidMessage";

const select = cva(styles["select-container"], {
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
const buttonSelect = cva(styles["select-btn"], {
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

const selectIcon = cva(styles["select-icon"], {
    variants: {
        variant: {
            outline: styles["select-icon-outline"],
            flat: styles["select-icon-flat"],
            underline: styles["select-icon-underline"],
        },
    },
    defaultVariants: {
        variant: "outline",
    },
});

const dropdown = cva(styles["select-dropdown"], {
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

const labelSelect = cva(styles["select-label"], {
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
        size: "medium"
    }
});

const selectedView = cva(styles["select-view"], {
    variants: {
        size: {
            tiny: styles["select-view-tiny"],
            small: styles["select-view-small"],
            medium: styles["select-view-medium"],
            large: styles["select-view-large"],
        },
    },
    defaultVariants: {
        size: "medium"
    }
});

export interface IListCollection {
    label: string
    value: string
    avatar?: string
    description?: string
}

export interface SelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "disabled">,
    VariantProps<typeof select> {
    label?: string
    options: IListCollection[]
    invalid?: boolean
    required?: boolean
    placeholder?: string
    errorMessage?: string
    value?: string
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
    ({ label, options, size, variant, radius, disabled, invalid, required, errorMessage, value, placeholder = "Select an option", ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState<string | null | undefined>(value);
        const [direction, setDirection] = useState<"up" | "down">("down");
        const selectRef = useRef<HTMLDivElement>(null);
        const listRef = useRef<HTMLUListElement>(null);

        const lenghtOptions = useCallback(() => {
            if (options.length > 0) {
                const maxLength = Math.max(...options.map((option) => option.label.length));
                return maxLength;
            }
            return placeholder.length;
        }, [options, placeholder]);


        const checkDirection = () => {
            setTimeout(() => {
                if (selectRef.current && listRef.current) {
                    const { bottom } = selectRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const { height: listHeight } = listRef.current.getBoundingClientRect();
                    if (viewportHeight - bottom < listHeight) {
                        setDirection("up");
                    } else {
                        setDirection("down");
                    }
                }
            }, 210);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        useEffect(() => {
            document.addEventListener("click", (e) => handleClickOutside(e));
            return () => {

                document.removeEventListener("click", handleClickOutside);
            };
        }, []);


        useEffect(() => {
            if (isOpen) {
                checkDirection();
            }

            const handleScroll = () => {
                if (isOpen) checkDirection();
            };

            const handleResize = () => {
                if (isOpen) checkDirection();
            };

            window.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleResize);

            return () => {

                window.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleResize);
            };
        }, [isOpen]);

        const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (!disabled) {
                setIsOpen((prev) => !prev);
            }
        };

        const handleOptionClick = (value: string) => {
            setSelectedValue(value);
            setIsOpen(false);
            if (props.onChange) {
                props.onChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>);
            }
        };

        return (
            <div className={clsx([styles["select-wrapper"]], { [styles["select-wrapper-disabled"]]: disabled })} ref={ref} >
                {label && <label className={labelSelect({ direction, radius, size, required })}>{label}</label>}
                <div className={select({ size, variant, radius, disabled, invalid })} ref={selectRef} role="select">
                    <button className={buttonSelect({ size, variant, radius, invalid, disabled })} onClick={toggleDropdown} style={{ width: `${lenghtOptions() * 18}px` }}>
                        {selectedValue
                            ? <div className={selectedView({ size })}>
                                {options.find((opt) => opt.value === selectedValue)?.avatar && <img className={styles["select-view-avatar"]} src={options.find((opt) => opt.value === selectedValue)?.avatar} />}
                                {options.find((opt) => opt.value === selectedValue)?.label}
                            </div>
                            : <span className={styles["select-placeholder"]}>{placeholder}</span>}
                        {isOpen ? <div className={selectIcon({ variant })}><ChevronUp className={styles["select-icon-svg"]} /></div> : <div className={selectIcon({ variant })}><ChevronDown className={styles["select-icon-svg"]} /></div>}
                    </button>
                    {isOpen && (
                        <ul className={dropdown({ size, direction, radius, variant, isOpen, className: "scrollBar" })} ref={listRef} >
                            {options?.map((option) => (
                                <li
                                    key={option.value}
                                    className={`${styles["select-option"]} ${selectedValue === option.value && styles["select-option-selected"]}`}
                                    onClick={() => handleOptionClick(option.value)}
                                >
                                    <div className={styles["select-option-wrapper"]}>
                                        <div className={selectedView({ size })}>
                                            {option.avatar && <img className={styles["select-view-avatar"]} src={option?.avatar} />}
                                            {option.label}
                                        </div>
                                        {option?.description && <p className={styles["select-view-description"]}>{option?.description}</p>}
                                    </div>
                                    {selectedValue === option.value && <Check className={styles["select-icon-svg"]} />}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {invalid && errorMessage && <InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />}
            </div>
        );
    }
);
