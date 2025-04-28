// src/components/Select/SelectOptionItem.tsx

import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { IListCollection, SelectProps } from './select.types';
import { selectedView, textContent } from './select.variants';

import styles from './select.module.css';

interface SelectOptionItemProps {
    option: IListCollection;
    selectedValue?: string | null;
    size?: SelectProps['size'];
    id?: string;
    role?: string;
    'aria-selected'?: boolean;
    activeOptionId?: string | null;

    onClick: (value: string) => void; // Handler click de la opción
}

export const SelectOptionItem: React.FC<SelectOptionItemProps> = ({
    option,
    selectedValue,
    size,
    id,
    role,
    'aria-selected': ariaSelected,
    activeOptionId,
    onClick,
}) => {

    const isSelected = selectedValue === option.value;
    const isActive = activeOptionId === id;


    const handleClick = () => {
        onClick(option.value);
    };


    return (
        <li
            id={id}
            role={role}
            aria-selected={ariaSelected}
            className={clsx(
                styles["select-option"],
                isSelected && styles["select-option-selected"],
                isActive && styles["select-option-active"]
            )}
            onClick={handleClick}
        >
            <div className={clsx(selectedView({ size }))}>
                {option.avatar && <img className={styles["select-view-avatar"]} src={option?.avatar} alt="" />}
                <div className={clsx(textContent({ size }))}>
                    <div>{option.label}</div>
                    {option.description && <p className={styles["select-view-description"]}>{option.description}</p>}
                </div>
            </div>
            {isSelected && <Check className={styles["select-icon-svg"]} />}
        </li>
    );
};