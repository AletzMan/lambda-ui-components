import { ButtonProps } from "../Button/button.types";

export type ButtonThemeAnimation = "fade" | "rotate" | "scale" | "flip" | "slide" | "none"; // slide: el icono sale a la derecha y el nuevo entra desde la izquierda (o viceversa)


export interface ButtonThemeProps extends ButtonProps {
	/**
	 * Tipo de animación al cambiar el icono del tema
	 */
	animation?: ButtonThemeAnimation;
	/**
	 * Otros props que quieras pasar al botón base
	 */
	[key: string]: any;
}
