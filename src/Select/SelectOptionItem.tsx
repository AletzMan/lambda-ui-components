// src/components/Select/SelectOptionItem.tsx

import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react'; // Asumiendo que CheckIcon viene de lucide-react
import { IListCollection, SelectProps } from './select.types'; // Importar tipos
import { selectedView } from './select.variants'; // Importar CVA si se usa aquí

import styles from './select.module.css'; // Importar estilos

interface SelectOptionItemProps {
    option: IListCollection; // Datos de la opción
    selectedValue?: string | null; // Valor seleccionado actualmente en el Select
    size?: SelectProps['size']; // Pasar el tamaño del Select para estilos
    // Props de accesibilidad gestionadas por useSelectAccessibility y pasadas desde Select
    id?: string; // ID generado para este item por el hook de accesibilidad (viene de getOptionProps)
    role?: string; // Rol ARIA ("option") (viene de getOptionProps)
    'aria-selected'?: boolean; // Estado ARIA seleccionado (viene de getOptionProps)
    activeOptionId?: string | null; // <-- ¡Aceptar la prop activeOptionId!

    onClick: (value: string) => void; // Handler click de la opción
}

export const SelectOptionItem: React.FC<SelectOptionItemProps> = ({
    option,
    selectedValue,
    size,
    // Props de accesibilidad
    id, // Usar el id de este item
    role,
    'aria-selected': ariaSelected,
    activeOptionId, // <-- Usar la prop activeOptionId
    onClick,
}) => {

    const isSelected = selectedValue === option.value;
    // Determinar si este item es el activo/resaltado por teclado
    const isActive = activeOptionId === id; // <-- Comparar activeOptionId con el id de este item


    const handleClick = () => {
        onClick(option.value); // Llama al handler del padre
    };


    return (
        <li
            id={id} // Aplicar el ID
            role={role} // Aplicar el rol ARIA
            aria-selected={ariaSelected} // Aplicar el estado ARIA
            // Opcional: aria-disabled={option.disabled}
            className={clsx(
                styles["select-option"],
                isSelected && styles["select-option-selected"], // Clase si está seleccionado
                isActive && styles["select-option-active"] // <-- ¡Aplicar clase si es el item activo por teclado!
            )}
            onClick={handleClick} // Manejar click
        // Opcional: onKeyDown, onMouseMove si el hook de accesibilidad lo maneja aquí
        // tabIndex={isActive ? 0 : -1} // Considerar si es necesario con aria-activedescendant en el botón
        >
            {/* Contenido de la opción */}
            <div className={clsx(styles["select-option-wrapper"], selectedView({ size }))}>
                {option.avatar && <img className={styles["select-view-avatar"]} src={option?.avatar} alt="" />}
                <div className={styles["select-option-text-content"]}>
                    <div>{option.label}</div>
                    {option.description && <p className={styles["select-view-description"]}>{option.description}</p>}
                </div>
            </div>

            {/* Ícono de checkmark si está seleccionado */}
            {isSelected && <Check className={styles["select-icon-svg"]} />}
        </li>
    );
};