import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { PaginationButtonVariants } from "./pagination.variants";

export type PaginationButtonVariant = PaginationButtonVariants["variant"];
export type PaginationButtonSize = PaginationButtonVariants["size"];
export type PaginationButtonRadius = PaginationButtonVariants["radius"];

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
	/**
	 * La página actual activa.
	 */
	currentPage: number;

	/**
	 * El número total de páginas.
	 */
	totalPages: number;

	/**
	 * Callback que se llama cuando el usuario cambia de página.
	 * @param pageNumber El número de la nueva página seleccionada.
	 */
	onPageChange: (pageNumber: number) => void;

	/**
	 * Número máximo de botones de página visibles (excluyendo los botones de primera/última página y '...').
	 * Si el total de páginas es menor o igual a este número, se muestran todas las páginas.
	 * Por defecto es 5.
	 */
	maxVisiblePages?: number;

	/**
	 * Mostrar botones para ir a la primera y última página.
	 * Por defecto es true.
	 */
	showFirstLastButtons?: boolean;

	/**
	 * Mostrar botones para ir a la página anterior y siguiente.
	 * Por defecto es true.
	 */
	showPrevNextButtons?: boolean;

	/**
	 * Deshabilitar toda la paginación.
	 * Por defecto es false.
	 */
	disabled?: boolean;

	/**
	 * Tamaño de los botones de paginación.
	 * @default "medium"
	 */
	size?: PaginationButtonSize; // Usar el tipo de variante de tamaño

	/**
	 * Variante visual de los botones de paginación.
	 * @default "outline"
	 */
	variant?: PaginationButtonVariant; // Usar el tipo de variante visual
	/**
	 * Etiqueta ARIA para la navegación de paginación.
	 * Por defecto es "Navegación de página".
	 */
	ariaLabel?: string;
}

// Props para un botón individual de paginación (interno)
export interface PaginationButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		PaginationButtonVariants {
	/**
	 * El número de página asociado a este botón.
	 * Puede ser null para los botones '...' o navegación (anterior/siguiente/primera/última).
	 */
	pageNumber?: number | null;

	/**
	 * Si este botón representa la página actual.
	 */
	isActive?: boolean;

	/**
	 * El contenido del botón (número, ícono, '...').
	 */
	children: React.ReactNode;

	/**
	 * Si el botón está deshabilitado.
	 * Puede ser inherente por disabled general o por límites de página.
	 */
	disabled?: boolean;
}
