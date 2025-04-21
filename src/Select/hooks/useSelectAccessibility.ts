import { useState, useRef, useEffect, RefObject, useCallback } from 'react';
import { IListCollection } from '../select.types';

interface UseSelectAccessibilityArgs {
    isOpen: boolean;
    options: IListCollection[];
    selectedValue?: string | null;
    onOptionSelect: (value: string) => void;
    onClose: () => void;
    buttonRef: RefObject<HTMLButtonElement | null>;
    listRef: RefObject<HTMLUListElement | null>;
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

    // Esto no significa que la opción tenga foco, solo que está marcada como interactuable por teclado
    const [activeOptionId, setActiveOptionId] = useState<string | null>(null);

    // ID base para generar IDs únicos para la lista y los items
    const baseId = useRef(`select-${Math.random().toString(36).slice(2, 9)}`); // Generar un ID base estable

    // IDs para elementos clave
    const listboxId = `${baseId.current}-listbox`;
    const labelId = `${baseId.current}-label`;


    // Encontrar el índice de la opción seleccionada o la primera si no hay nada seleccionado
    const selectedIndex = options.findIndex(option => option.value === selectedValue);
    const initialActiveIndex = selectedIndex !== -1 ? selectedIndex : (options.length > 0 ? 0 : -1);

    useEffect(() => {
        if (isOpen && initialActiveIndex !== -1) {
            setActiveOptionId(`${baseId.current}-option-${options[initialActiveIndex].value}`);
        } else if (!isOpen) {
            setActiveOptionId(null);
        }
    }, [isOpen, initialActiveIndex, options]);

    // --- Manejo de Eventos de Teclado --- 
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
                        onOptionSelect(activeOption.value);
                        onClose();
                    }
                }
                break;
            case 'Escape':
                event.preventDefault();
                onClose();
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
            default:
                return;
        }

        if (nextIndex !== -1 && options[nextIndex]) {
            setActiveOptionId(`${baseId.current}-option-${options[nextIndex].value}`);
            const activeElement = listRef.current?.querySelector(`#${activeOptionId}`);
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest' });
            }
        }

    }, [isOpen, options, activeOptionId, initialActiveIndex, onOptionSelect, onClose, buttonRef, listRef]);


    const getButtonProps = () => ({
        id: `${baseId.current}-button`,
        role: 'combobox',
        'aria-haspopup': 'listbox' as boolean | "true" | "false" | "listbox" | "dialog" | "grid" | "menu" | "tree" | undefined,
        'aria-expanded': isOpen,
        'aria-controls': isOpen ? listboxId : undefined,
        'aria-activedescendant': (isOpen ? activeOptionId : undefined) as string | undefined,
        'aria-labelledby': labelId,
        onKeyDown: handleKeyDown,
    });

    const getSelectedViewProps = () => {
        return {};
    };


    // Propiedades para la lista desplegable (role="listbox")
    const getListboxProps = () => ({
        id: listboxId,
        role: 'listbox',
    });

    // Propiedades para cada item de la lista (role="option")
    // Recibe el index del item y si está seleccionado o activo
    const getOptionProps = (option: IListCollection, _index: number) => ({
        id: `${baseId.current}-option-${option.value}`,
        role: 'option', // Rol ARIA
        'aria-selected': selectedValue === option.value,
    });

    // Propiedades para la etiqueta (label)
    const getLabelProps = () => ({
        id: labelId,
        htmlFor: `${baseId.current}-button`,
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