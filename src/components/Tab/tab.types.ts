import { HTMLAttributes } from "react";

export type TabVariant = "underline" | "soft" | "box" | "border";
export type TabSize = "tiny" | "small" | "medium" | "large";
export type TabColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info";
export type TabRadius = "none" | "tiny" | "small" | "medium" | "large" | "full";
export type TabItem = {
	id: string;
	label: string;
	icon?: React.ReactNode;
	content?: React.ReactNode;
};

export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	/*
	 * Array de elementos que se renderizan como pestañas
	 */
	items?: TabItem[];
	/*
	 * Establece el estilo de la pestaña @default "underline"
	 */
	variant?: TabVariant;
	/*
	 * Establece el tamaño de la pestaña @default "medium"
	 */
	size?: TabSize;
	/*
	 * Establece el color de la pestaña @default "primary"
	 */
	color?: TabColor;
	/*
	 * Establece el radio de la pestaña @default "small"
	 */
	radius?: TabRadius;
	/*
	 * Establece si la pestaña esta deshabilitada @default false
	 */
	disabled?: boolean;
	/*
	 * Establece el valor de la pestaña @default ""
	 */
	value?: string;
	/*
	 * Funcion que se ejecuta cuando el valor de la pestaña cambia
	 */
	onChange?: (value: string) => void;
	/*
	 * Define el contenido de la pestaña
	 */
	children?: React.ReactNode;
}
