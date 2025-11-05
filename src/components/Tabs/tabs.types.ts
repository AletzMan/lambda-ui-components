import { HTMLAttributes } from "react";
import { TabVariants } from "./tabs.variants";

export type TabItem = {
	id: string;
	label: string;
	icon?: React.ReactNode;
	content?: React.ReactNode;
};

export interface TabItemProps {
	title: string;
	icon?: React.ReactNode;
	disabled?: boolean;
}

export interface TabProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "color" | "value" | "FormEvent"> {
	/*
	 * Establece el estilo de la pestaña @default "underline"
	 */
	variant?: TabVariants["variant"];
	/*
	 * Establece el tamaño de la pestaña @default "medium"
	 */
	size?: TabVariants["size"];
	/*
	 * Establece el color de la pestaña @default "primary"
	 */
	color?: TabVariants["color"];
	/*
	 * Establece el radio de la pestaña @default "small"
	 */
	radius?: TabVariants["radius"];
	/*
	 * Establece si la pestaña esta deshabilitada @default false
	 */
	disabled?: boolean;
	/*
	 * Establece el valor de la pestaña @default 0
	 */
	value?: number;
	/*
	 * Funcion que se ejecuta cuando el valor de la pestaña, devolviendo el index de la pestaña seleccionada
	 */
	onChange?: (value: number) => void;
	/*
	 * Define el contenido de la pestaña
	 */
	children?: React.ReactNode;
}
