import { forwardRef, InputHTMLAttributes } from "react";
import { useRadioGroup } from "../RadioGroup/RadioGroup";
import { iconView, labelName, radioprop, RadioVariants, view, wrapper } from "./radio.variants";
import clsx from "clsx";



export interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "disabled" | "checked" | "color" | "type" | "value"> {
    size?: RadioVariants["size"];
    variant?: RadioVariants["variant"];
    color?: RadioVariants["color"];
    type?: RadioVariants["type"];
    positionLabel?: RadioVariants["positionLabel"];
    disabled?: RadioVariants["disabled"];
    label?: string;
    value: string | number | ReadonlyArray<string>;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            className,
            size,
            variant,
            label = "Label",
            disabled,
            type,
            positionLabel = "right",
            color,
            ...props
        },
        ref
    ) => {

        const {
            selectedValue,
            onChange,
            size: groupSize,
            color: groupColor,
            variant: groupVariant,
            type: groupType,
            disabled: groupDisabled,
            name,
        } = useRadioGroup();

        const isChecked = selectedValue === props.value;
        const isDisabled = disabled || groupDisabled;

        // Calcular valores efectivos combinando prop local y valor del grupo
        const effectiveSize = size || groupSize;
        const effectiveColor = color || groupColor;
        const effectiveVariant = variant || groupVariant;
        const effectiveType = type || groupType;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        };

        return (
            <label className={wrapper({
                positionLabel,
                color: effectiveColor,
                disabled: isDisabled,
                size: effectiveSize,
                type: effectiveType,
                variant: effectiveVariant
            })}>
                <input
                    ref={ref}
                    type="radio"
                    name={name}
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={isDisabled}
                    className={clsx(radioprop({
                        size: effectiveSize,
                        variant: effectiveVariant,
                        color: effectiveColor,
                        disabled: isDisabled,
                    }), className)}
                    {...props}
                />

                <div className={view({
                    variant: effectiveVariant,
                    size: effectiveSize,
                    color: effectiveColor,
                    disabled: isDisabled,
                    type: effectiveType,
                    checked: isChecked
                })}>
                    <span className={iconView({
                        size: effectiveSize,
                        color: effectiveColor,
                        disabled: isDisabled,
                        checked: isChecked,
                        type: effectiveType
                    })} />
                </div>

                {label && (
                    <span className={labelName({
                        size: effectiveSize,
                        disabled: isDisabled,
                        type: effectiveType
                    })}>
                        {label}
                    </span>
                )}
            </label>
        );
    }
);