/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    PropsWithChildren,
    FC,
    useEffect,
    useRef,
} from "react";
import styles from "./radiogroup.module.css";
import { cva } from "class-variance-authority";

const classRadioGroups = cva(styles["radio-group"], {
    variants: {
        orientation: {
            vertical: styles["radio-group-vertical"],
            horizontal: styles["radio-group-horizontal"]
        },
        size: {
            tiny: styles["radio-group-tiny"],
            small: styles["radio-group-small"],
            medium: styles["radio-group-medium"],
            large: styles["radio-group-large"],
        },
        color: {
            primary: styles["radio-group-primary"],
            secondary: styles["radio-group-secondary"],
            danger: styles["radio-group-danger"],
            success: styles["radio-group-success"],
            warning: styles["radio-group-warning"],
            info: styles["radio-group-info"],
        },
        type: {
            radio: styles["radio-group-radio"],
            button: styles["radio-group-button"]
        },
        variant: {
            solid: styles["radio-group-solid"],
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
        variant: "solid"
    },
});


type RadioGroupContextType = {
    name: string
    selectedValue: string | undefined
    onChange: (value: string) => void
    size: "tiny" | "small" | "medium" | "large"
    color: "primary" | "secondary" | "danger" | "success" | "warning" | "info"
    type: "radio" | "button"
    radius: 'none' | 'small' | 'medium' | 'pill'
    variant: "solid" | "flat" | "outline"
    disabled: boolean
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

interface RadioGroupProps {
    name?: string
    selectedOption?: string
    onChange?: (value: string) => void
    defaultValue?: string
    size?: "tiny" | "small" | "medium" | "large"
    color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info"
    type?: "radio" | "button"
    radius?: 'none' | 'small' | 'medium' | 'pill'
    variant?: "solid" | "flat" | "outline"
    orientation?: "vertical" | "horizontal"
    gap?: string,
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
    variant = "solid",  // Default variant
    disabled = false,
    radius = "medium",
    orientation = "vertical",
    gap = "8px",
    children,
}) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
    const refGroup = useRef<HTMLDivElement | null>(null);

    const handleChange = useCallback(
        (newValue: string) => {
            if (onChange) {
                onChange(newValue);
            }
            setSelectedValue(newValue);
        },
        [onChange]
    );

    useEffect(() => {
        const conainer = refGroup.current;
        if (conainer && type === "radio") {
            conainer.style.setProperty("--gap-radio-size", gap);
        }
    }, [gap, type]);

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
    );




    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div role="radiogroup" ref={refGroup} className={classRadioGroups({ orientation, size, type, radius, variant, color })}>{children}</div>
        </RadioGroupContext.Provider>
    );
};

export const useRadioGroup = () => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error("useRadioGroup must be used within a RadioGroup");
    }
    return context;
};
