
// src/components/Select/hooks/useSelectAccessibility.ts

import { useState, useRef, useEffect, RefObject, useCallback } from 'react';
import { IListCollection } from '../select.types'; // Importar el tipo de opciones

interface UseSelectAccessibilityArgs {
    isOpen: boolean;
    options: IListCollection[];
    selectedValue?: string | null; // Valor actual seleccionado
    onOptionSelect: (value: string) => void; // Callback cuando se selecciona una opción
    onClose: () => void; // Callback para cerrar el dropdown
    buttonRef: RefObject<HTMLButtonElement | null>; // Ref al botón que abre el select
    listRef: RefObject<HTMLUListElement | null>; // Ref a la lista desplegable (ul)
    // Puedes añadir más refs si manejas foco a nivel de item
}

/**
 * Hook para añadir comportamiento de accesibilidad (ARIA, teclado) a un Select custom.
 * @param args Argumentos para configurar el hook.
 * @returns {object} Propiedades y handlers para aplicar a los elementos del DOM.
 */
export function useSelectAccessibility({
    isOpen,
    options,
    selectedValue,
    onOptionSelect,
    onClose,
    buttonRef,
    listRef,
}: UseSelectAccessibilityArgs) {
    // ID de la opción actualmente 'activa' o resaltada (para ARIA)
    // Esto no significa que la opción tenga foco, solo que está marcada como interactuable por teclado
    const [activeOptionId, setActiveOptionId] = useState<string | null>(null);

    // ID base para generar IDs únicos para la lista y los items
    const baseId = useRef(`select-${Math.random().toString(36).slice(2, 9)}`); // Generar un ID base estable

    // IDs para elementos clave
    const listboxId = `${baseId.current}-listbox`;
    const labelId = `${baseId.current}-label`; // Asumo que el label también necesita un ID


    // Encontrar el índice de la opción seleccionada o la primera si no hay nada seleccionado
    const selectedIndex = options.findIndex(option => option.value === selectedValue);
    const initialActiveIndex = selectedIndex !== -1 ? selectedIndex : (options.length > 0 ? 0 : -1);

    // Efecto para establecer la opción activa inicial cuando se abre el desplegable
    useEffect(() => {
        if (isOpen && initialActiveIndex !== -1) {
            setActiveOptionId(`${baseId.current}-option-${options[initialActiveIndex].value}`);
            // O podrías usar el índice si es más fácil de gestionar internamente:
            // setActiveOptionId(`${baseId.current}-option-${initialActiveIndex}`);
            // Pero ARIA recomienda usar IDs basadas en valor si es posible.
        } else if (!isOpen) {
            // Limpiar la opción activa cuando se cierra el desplegable
            setActiveOptionId(null);
        }
    }, [isOpen, initialActiveIndex, options]); // Dependencia 'options' si la lista puede cambiar mientras está abierto

    // --- Manejo de Eventos de Teclado ---
    // Este es el núcleo de la accesibilidad para teclado.
    // Este handler se añadirá al botón principal (role="combobox")
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        // Solo manejar eventos de teclado si el desplegable está abierto
        if (!isOpen) return;

        let nextIndex = -1;
        const currentActiveIndex = activeOptionId
            ? options.findIndex(option => `${baseId.current}-option-${option.value}` === activeOptionId)
            : initialActiveIndex; // Si no hay activo, usar el inicial (seleccionado o primero)


        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault(); // Evitar scroll de página
                nextIndex = currentActiveIndex < options.length - 1 ? currentActiveIndex + 1 : options.length - 1;
                break;
            case 'ArrowUp':
                event.preventDefault(); // Evitar scroll de página
                nextIndex = currentActiveIndex > 0 ? currentActiveIndex - 1 : 0;
                break;
            case 'Enter':
            case ' ': // Espacio
                event.preventDefault();
                if (activeOptionId) {
                    const activeOption = options.find(option => `${baseId.current}-option-${option.value}` === activeOptionId);
                    if (activeOption) {
                        onOptionSelect(activeOption.value); // Seleccionar la opción activa
                        onClose(); // Cerrar el desplegable
                    }
                }
                break;
            case 'Escape':
                event.preventDefault();
                onClose(); // Cerrar el desplegable
                // Opcional: Mover el foco de vuelta al botón principal
                buttonRef.current?.focus();
                break;
            case 'Home':
                event.preventDefault();
                nextIndex = 0; // Ir al primer item
                break;
            case 'End':
                event.preventDefault();
                nextIndex = options.length - 1; // Ir al último item
                break;
            // Faltan: manejo de letras para ir a opciones que empiezan con esa letra,
            // manejo de otras teclas si aplica.
            default:
                // Podrías añadir lógica para buscar opciones al escribir letras
                return; // No manejar otras teclas
        }

        // Actualizar la opción activa después de Arrow Up/Down/Home/End
        if (nextIndex !== -1 && options[nextIndex]) {
            setActiveOptionId(`${baseId.current}-option-${options[nextIndex].value}`);
            // Opcional: Hacer scroll si el item activo no está visible en la lista
            // listRef.current?.querySelector(`#${activeOptionId}`)?.scrollIntoViewIfNeeded(); // No estándar, usar scrollIntoView
            const activeElement = listRef.current?.querySelector(`#${activeOptionId}`);
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest' });
            }
        }

    }, [isOpen, options, activeOptionId, initialActiveIndex, onOptionSelect, onClose, buttonRef, listRef]); // Dependencias


    // --- Propiedades ARIA a aplicar ---

    // Propiedades para el botón principal (role="combobox")
    const getButtonProps = () => ({
        id: `${baseId.current}-button`, // ID para la label y aria-controls
        role: 'combobox', // Rol ARIA
        'aria-haspopup': 'listbox' as boolean | "true" | "false" | "listbox" | "dialog" | "grid" | "menu" | "tree" | undefined, // Indica que despliega una lista
        'aria-expanded': isOpen, // Estado abierto/cerrado
        'aria-controls': isOpen ? listboxId : undefined, // Asocia con el ID de la lista cuando está abierta
        /*'aria-activedescendant': isOpen ? activeOptionId : undefined, */
        'aria-labelledby': labelId, // Asocia con el ID de la etiqueta
        // Faltan: aria-describedby si hay errorMessage o helperText
        onKeyDown: handleKeyDown, // Manejar eventos de teclado
        // TabIndex podría ser 0 por defecto en un botón, pero confirmarlo.
    });

    // Propiedades para el div/span que muestra el valor seleccionado
    const getSelectedViewProps = () => {
        // Puedes añadir más ARIA si es necesario, pero usualmente el role=combobox en el botón es suficiente
        return {};
    };


    // Propiedades para la lista desplegable (role="listbox")
    const getListboxProps = () => ({
        id: listboxId, // ID asociado por aria-controls
        role: 'listbox', // Rol ARIA
        // Opcional: aria-labelledby si quieres que la lista esté etiquetada
        // Opcional: tabindex="-1" si quieres que la lista pueda recibir foco (menos común con aria-activedescendant)
    });

    // Propiedades para cada item de la lista (role="option")
    // Recibe el index del item y si está seleccionado o activo
    const getOptionProps = (option: IListCollection, _index: number) => ({
        id: `${baseId.current}-option-${option.value}`, // ID único para cada opción
        role: 'option', // Rol ARIA
        'aria-selected': selectedValue === option.value, // Indica si está seleccionado
        // aria-disabled={option.disabled} // Si las opciones individuales pueden estar deshabilitadas
        // Otros atributos de datos si son necesarios
        // onKeyDown: ... si manejas foco a nivel de item
        // onClick: ... (manejado por el componente item)
    });

    // Propiedades para la etiqueta (label)
    const getLabelProps = () => ({
        id: labelId, // ID asociado por aria-labelledby en el botón
        htmlFor: `${baseId.current}-button`, // Asocia la label con el botón
    });


    return {
        getButtonProps,
        getSelectedViewProps,
        getListboxProps,
        getOptionProps,
        getLabelProps,
        activeOptionId,
    };
}