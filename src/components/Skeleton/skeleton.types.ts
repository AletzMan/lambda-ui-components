import { HTMLMotionProps } from "framer-motion";

export type SkeletonShape = "rect" | "circle";

export type SkeletonAnimationType = "fade" | "wave";

export interface SkeletonProps extends HTMLMotionProps<"div"> {
	/**
	 * Forma del skeleton: rectángulo o círculo
	 */
	shape?: SkeletonShape;
	/**
	 * Si es true y shape es rect, el skeleton tendrá bordes redondeados
	 */
	rounded?: boolean;
	/**
	 * Ancho del skeleton (puede ser string o número)
	 */
	width?: string | number;
	/**
	 * Alto del skeleton (puede ser string o número)
	 */
	height?: string | number;
	/**
	 * Tipo de animación: 'fade' (por defecto) o 'wave' (CSS)
	 */
	animationType?: SkeletonAnimationType;
}

