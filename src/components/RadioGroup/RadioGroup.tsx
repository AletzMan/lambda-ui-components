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
    useId,
} from "react";
import { RadioGroupVariants, RadioGroups } from "./radiogrouo.variants";
import { RadioGroupProps } from "./radiogroup.types";


export type RadioGroupContextType = {
    name: string;
    selectedValue: string | undefined;
    onChange: (value: string) => void;
    size: RadioGroupVariants["size"];
    color: RadioGroupVariants["color"];
    type: RadioGroupVariants["type"];
    radius: RadioGroupVariants["radius"];
    variant: RadioGroupVariants["variant"];
    disabled: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);


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
    const defaultNameId = useId();
    const effectiveName = name ?? `radio-group-${defaultNameId}`;

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
            name: effectiveName,
            selectedValue: selectedOption ?? selectedValue,
            onChange: handleChange,
            size,
            color,
            type,
            radius,
            variant,
            disabled,
        }),
        [effectiveName, selectedOption, selectedValue, handleChange, size, color, type, variant, radius, disabled]
    );




    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div role="radiogroup" ref={refGroup} className={RadioGroups({ orientation, size, type, radius, variant, color })}>{children}</div>
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
