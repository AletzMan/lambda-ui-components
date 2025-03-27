/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    PropsWithChildren,
    FC,
} from "react"
import styles from "./radiogroup.module.css"
import { cva } from "class-variance-authority";

const classRadioGroups = cva(styles.base, {
    variants: {
        orientation: {
            vertical: styles.base_vertical,
            horizontal: styles.base_horizontal
        },
        size: {
            small: styles.base_small,
            medium: styles.base_medium,
            large: styles.base_large,
        },
        type: {
            default: styles.tp_default,
            button: styles.tp_button
        },
        radius: {
            none: styles.rd_none,
            small: styles.rd_small,
            medium: styles.rd_medium,
            pill: styles.rd_pill,
        },
    },
    compoundVariants: [

    ],
    defaultVariants: {
        orientation: 'vertical',
        radius: "medium",
        size: "medium",
        type: "default"
    },
})


type RadioGroupContextType = {
    name: string
    selectedValue: string | undefined
    onChange: (value: string) => void
    size: "small" | "medium" | "large"
    color: "primary" | "secondary" | "danger" | "success" | "warning"
    type: "default" | "button"
    radius: 'none' | 'small' | 'medium' | 'pill'
    variant: "bordered" | "flat"
    disabled: boolean
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null)

interface RadioGroupProps {
    name?: string
    value?: string
    onChange?: (value: string) => void
    defaultValue?: string
    size?: "small" | "medium" | "large"
    color?: "primary" | "secondary" | "danger" | "success" | "warning"
    type?: "default" | "button"
    radius?: 'none' | 'small' | 'medium' | 'pill'
    variant?: "bordered" | "flat"

    orientation?: "vertical" | "horizontal"
    disabled?: boolean
}

export const RadioGroup: FC<PropsWithChildren<RadioGroupProps>> = ({
    name = `radio-group-${Math.random().toString(36).substr(2, 9)}`,
    value,
    onChange,
    defaultValue,
    size = "medium",
    color = "primary",
    type = "default",
    variant = "bordered",  // Default variant
    disabled = false,
    radius = "medium",
    orientation = "vertical",
    children,
}) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
        defaultValue
    )

    const handleChange = useCallback(
        (newValue: string) => {
            if (onChange) {
                onChange(newValue)
            }
            setSelectedValue(newValue)
        },
        [onChange]
    )

    const contextValue = useMemo(
        () => ({
            name,
            selectedValue: value ?? selectedValue,
            onChange: handleChange,
            size,
            color,
            type,
            radius,
            variant,
            disabled,
        }),
        [name, value, selectedValue, handleChange, size, color, type, variant, radius, disabled]
    )




    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div role="radiogroup" className={classRadioGroups({ orientation, size, type, radius })}>{children}</div>
        </RadioGroupContext.Provider>
    )
}

export const useRadioGroup = () => {
    const context = useContext(RadioGroupContext)
    if (!context) {
        throw new Error("useRadioGroup must be used within a RadioGroup")
    }
    return context
}
