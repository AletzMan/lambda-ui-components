import { useState, forwardRef, SelectHTMLAttributes, useRef, useEffect } from "react"
import { cva, VariantProps } from "class-variance-authority"
import styles from "./select.module.css"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

const select = cva(styles.sl, {
    variants: {
        size: {
            small: styles.sl_sm,
            medium: styles.sl_md,
            large: styles.sl_lg,
        },
        variant: {
            outline: styles.sl_outline,
            flat: styles.sl_flat,
            underline: styles.sl_underline,
        },
        radius: {
            none: styles.sl_none,
            small: styles.sl_small,
            medium: styles.sl_medium,
            pill: styles.sl_pill,
        },
        disabled: {
            true: styles.sl_disabled,
            false: styles.sl_enabled,
        },
        error: {
            true: styles.sl_error,
            false: "",
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "small",
        disabled: false,
        error: false,
    },
})
const buttonSelect = cva(styles.btn, {
    variants: {
        size: {
            small: styles.btn_sm,
            medium: styles.btn_md,
            large: styles.btn_lg,
        },
        variant: {
            outline: styles.btn_outline,
            flat: styles.btn_flat,
            underline: styles.btn_underline,
        },
        radius: {
            none: styles.btn_rd_none,
            small: styles.btn_rd_sm,
            medium: styles.btn_rd_md,
            pill: styles.btn_rd_pill,
        },
        disabled: {
            true: styles.btn_disabled,
            false: styles.btn_enabled,
        },
        error: {
            true: styles.btn_error,
            false: "",
        },
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: "small",
        disabled: false,
        error: false,
    },
})

const containerIcon = cva(styles.icon_cntr, {
    variants: {
        variant: {
            outline: styles.icon_cntr_outline,
            flat: styles.icon_cntr_flat,
            underline: styles.icon_cntr_underline,
        },
    },
    defaultVariants: {
        variant: "outline",
    },
})

const dropdown = cva(styles.ddwn, {
    variants: {
        size: {
            small: styles.ddwn_sm,
            medium: styles.ddwn_md,
            large: styles.ddwn_lg,
        },
        direction: {
            up: styles.ddwn_up,
            down: styles.ddwn_down,
        },
        variant: {
            outline: styles.ddwn_outline,
            flat: styles.ddwn_flat,
            underline: styles.ddwn_underline,
        },
        radius: {
            none: styles.ddwn_rd_none,
            small: styles.ddwn_rd_sm,
            medium: styles.ddwn_rd_md,
            pill: styles.ddwn_rd_pill,
        },
        isOpen: {
            true: styles.ddwn_opn,
            false: styles.ddwn_cls,
        }
    },
})

const labelSelect = cva(styles.lbl, {
    variants: {
        size: {
            small: styles.lbl_sz_sm,
            medium: styles.lbl_sz_md,
            large: styles.lbl_sz_lg,
        },
        direction: {
            up: styles.lbl_dr_up,
            down: styles.lbl_dr_down,
        },
        radius: {
            none: styles.lbl_rd_none,
            small: styles.lbl_rd_sm,
            medium: styles.lbl_rd_md,
            pill: styles.lbl_rd_pill,
        }
    },
    defaultVariants: {
        direction: "down",
        radius: "medium",
        size: "medium"
    }
})

const errorLabel = cva(styles.err, {
    variants: {
        size: {
            small: styles.err_sm,
            medium: styles.err_md,
            large: styles.err_lg,
        },
    },
})

export interface SelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "disabled">,
    VariantProps<typeof select> {
    label?: string
    options: { value: string; label: string }[]
    error?: boolean
    placeholder?: string
    errorMessage?: string
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
    ({ label, options, size, variant, radius, disabled, error, errorMessage, placeholder = "Select an option", ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false)
        const [selectedValue, setSelectedValue] = useState<string | null>(null)
        const [direction, setDirection] = useState<"up" | "down">("down")
        const selectRef = useRef<HTMLDivElement>(null)
        const listRef = useRef<HTMLUListElement>(null)


        const checkDirection = () => {
            setTimeout(() => {
                if (selectRef.current && listRef.current) {
                    const { bottom } = selectRef.current.getBoundingClientRect()
                    const viewportHeight = window.innerHeight
                    const { height: listHeight } = listRef.current.getBoundingClientRect()
                    if (viewportHeight - bottom < listHeight) {
                        setDirection("up")
                    } else {
                        setDirection("down")
                    }
                }
            }, 210)
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        useEffect(() => {
            document.addEventListener("click", (e) => handleClickOutside(e))
            return () => {

                document.removeEventListener("click", handleClickOutside);
            }
        }, [])


        useEffect(() => {
            if (isOpen) {
                checkDirection();
            }

            const handleScroll = () => {
                if (isOpen) checkDirection();
            }

            const handleResize = () => {
                if (isOpen) checkDirection()
            }

            window.addEventListener("scroll", handleScroll)
            window.addEventListener("resize", handleResize)

            return () => {

                window.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleResize);
            }
        }, [isOpen]);

        const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            if (!disabled) {
                setIsOpen((prev) => !prev)
            }
        }

        const handleOptionClick = (value: string) => {
            setSelectedValue(value)
            setIsOpen(false)
            if (props.onChange) {
                props.onChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)
            }
        }

        return (
            <div className={`${styles.container} ${disabled && styles.container_disabled}`} ref={ref} >
                {label && <label className={labelSelect({ direction, radius, size })}>{label}</label>}
                <div className={select({ size, variant, radius, disabled, error })} ref={selectRef} role="select">
                    <button className={buttonSelect({ size, variant, radius, error, disabled })} onClick={toggleDropdown} style={{ width: `${placeholder?.length * 13}px` }}>
                        {selectedValue
                            ? options.find((opt) => opt.value === selectedValue)?.label
                            : <span className={styles.placeholder}>{placeholder}</span>}
                        {isOpen ? <div className={containerIcon({ variant })}><ChevronUp className={styles.icon} /></div> : <div className={containerIcon({ variant })}><ChevronDown className={styles.icon} /></div>}
                    </button>
                    {isOpen && (
                        <ul className={dropdown({ size, direction, radius, variant, isOpen })} ref={listRef} >
                            {options?.map((option) => (
                                <li
                                    key={option.value}
                                    className={`${styles.option} ${selectedValue === option.value && styles.option_select}`}
                                    onClick={() => handleOptionClick(option.value)}
                                >
                                    {option.label}
                                    {selectedValue === option.value && <Check className={styles.icon} />}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {error && errorMessage && <span className={errorLabel({ size })}>{errorMessage}</span>}
            </div>
        )
    }
)
