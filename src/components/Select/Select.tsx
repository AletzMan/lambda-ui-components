import React, { useState, forwardRef, useRef, useEffect, useCallback } from "react";
import styles from "./select.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

import {
    buttonSelect,
    dropdown,
    labelSelect,
    select,
    selectIcon,
    selectedView
} from "./select.variants";
import { SelectProps } from "./select.types";
import { useClickOutside } from "./hooks/useClickOutside";
import { useDropdownPlacement } from "./hooks/useDropdownPlacement";
import { useSelectAccessibility } from "./hooks/useSelectAccessibility";
import { SelectOptionItem } from "./SelectOptionItem";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";


export const Select = forwardRef<HTMLButtonElement, SelectProps>(
    (
        {
            label,
            options,
            size = "medium",
            variant = "outline",
            radius = "small",
            disabled,
            invalid,
            required,
            errorMessage,
            value,
            defaultValue,
            placeholder = "Select an option",
            onChange,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState<string | null | undefined>(defaultValue ?? value);

        useEffect(() => {
            if (value !== undefined && value !== selectedValue) {
                setSelectedValue(value);
            }
        }, [value, selectedValue]);

        // --- Refs ---
        const containerRef = useRef<HTMLDivElement>(null);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const listRef = useRef<HTMLUListElement>(null);


        const performOptionSelection = useCallback((val: string | undefined) => {
            setSelectedValue(val);
            setIsOpen(false);
            onChange?.(val);
        }, [onChange]);

        // --- Handlers --- 
        const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (!disabled) {
                setIsOpen((prev) => !prev);
            }
        }, [disabled]);



        // Este handler simplemente llama a la lógica de selección unificada
        const handleOptionClick = useCallback((val: string) => {
            performOptionSelection(val);
        }, [performOptionSelection]); // Dependencia: performOptionSelection



        // Hook para cerrar al hacer click fuera
        useClickOutside(containerRef, () => setIsOpen(false)); // Cerrar si click fuera del container

        // Hook para determinar la dirección de apertura del dropdown
        const direction = useDropdownPlacement(buttonRef, listRef as React.RefObject<HTMLElement>, isOpen);

        // Hook para la accesibilidad (ARIA, teclado, opción activa)
        const {
            getButtonProps,
            getListboxProps,
            getOptionProps,
            getLabelProps,
            activeOptionId,
        } = useSelectAccessibility({
            isOpen,
            options,
            selectedValue,
            onOptionSelect: performOptionSelection,
            onClose: () => setIsOpen(false),
            buttonRef,
            listRef,
        });


        const selectedOption = options.find(opt => opt.value === selectedValue);

        return (
            <div
                className={clsx([styles["select-wrapper"]], { [styles["select-wrapper-disabled"]]: disabled })}
                ref={containerRef}
            >
                {label && (
                    <label
                        className={clsx(labelSelect({ direction, radius, size, required }), styles["select-label"])}
                        {...getLabelProps()}
                    >
                        {label}
                    </label>
                )}
                <div
                    className={select({ size, variant, radius, disabled, invalid })}
                >
                    <button
                        className={buttonSelect({ size, variant, radius, invalid, disabled })}
                        onClick={handleButtonClick}
                        disabled={disabled}
                        ref={ref || buttonRef}
                        {...getButtonProps()}
                    >
                        {selectedOption
                            ? (
                                <div className={selectedView({ size, disabled: disabled })}>
                                    {selectedOption.avatar && <img className={styles["select-view-avatar"]} src={selectedOption.avatar} alt="" />}
                                    <span>{selectedOption.label}</span>
                                </div>
                            ) : (
                                <span className={styles["select-placeholder"]}>{placeholder}</span>
                            )}

                        <div className={selectIcon({ variant, size, disabled, invalid })}>
                            {isOpen ? <ChevronUp className={styles["select-icon-svg"]} /> : <ChevronDown className={styles["select-icon-svg"]} />}
                        </div>
                    </button>
                    {isOpen && (
                        <ul
                            className={clsx(dropdown({ size, direction, radius, variant }), styles["scrollBar"])}
                            ref={listRef}
                            {...getListboxProps()}
                        >
                            {options?.map((option, index) => (
                                <SelectOptionItem
                                    key={option.value}
                                    option={option}
                                    activeOptionId={activeOptionId}
                                    selectedValue={selectedValue}
                                    size={size}
                                    onClick={handleOptionClick}
                                    {...getOptionProps(option, index)}
                                />
                            ))}
                        </ul>
                    )}
                </div>

                {invalid && errorMessage && (
                    <InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />
                )}
            </div>
        );
    }
);
