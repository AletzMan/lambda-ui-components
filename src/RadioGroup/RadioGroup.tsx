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

const classRadioGroups = cva(styles["radio-group"], {
    variants: {
        orientation: {
            vertical: styles["radio-group-vertical"],
            horizontal: styles["radio-group-horizontal"]
        },
        size: {
            small: styles["radio-group-small"],
            medium: styles["radio-group-medium"],
            large: styles["radio-group-large"],
        },
        type: {
            radio: styles["radio-group-radio"],
            button: styles["radio-group-button"]
        },
        variant: {
            bordered: styles["radio-group-bordered"],
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
        variant: "bordered"
    },
})


type RadioGroupContextType = {
    name: string
    selectedValue: string | undefined
    onChange: (value: string) => void
    size: "small" | "medium" | "large"
    color: "primary" | "secondary" | "danger" | "success" | "warning" | "info"
    type: "radio" | "button"
    radius: 'none' | 'small' | 'medium' | 'pill'
    variant: "bordered" | "flat" | "outline"
    disabled: boolean
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null)

interface RadioGroupProps {
    name?: string
    selectedOption?: string
    onChange?: (value: string) => void
    defaultValue?: string
    size?: "small" | "medium" | "large"
    color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info"
    type?: "radio" | "button"
    radius?: 'none' | 'small' | 'medium' | 'pill'
    variant?: "bordered" | "flat" | "outline"
    orientation?: "vertical" | "horizontal"
    disabled?: boolean
}

export const RadioGroup: FC<PropsWithChildren<RadioGroupProps>> = ({
    name = `radio-group-${Math.random().toString(36).slice(2, 9)}`,
    selectedOption,
    onChange,
    defaultValue,
    size = "medium",
    color = "primary",
    type = "radio",
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
            selectedValue: selectedOption ?? selectedValue,
            onChange: handleChange,
            size,
            color,
            type,
            radius,
            variant,
            disabled,
        }),
        [name, selectedOption, selectedValue, handleChange, size, color, type, variant, radius, disabled]
    )




    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div role="radiogroup" className={classRadioGroups({ orientation, size, type, radius, variant })}>{children}</div>
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
