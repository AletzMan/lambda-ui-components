export type SplitterDirection = "horizontal" | "vertical";

export interface SplitterProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Dirección del splitter (horizontal=columnas, vertical=filas)
	 */
	direction?: SplitterDirection;
	/**
	 * Mínimo tamaño del primer panel (px)
	 */
	/**
	 * Mínimo tamaño del primer panel (px o porcentaje, ej: 100 o "30%")
	 */
	min?: number | string;
	/**
	 * Máximo tamaño del primer panel (px o porcentaje, ej: 600 o "70%")
	 */
	max?: number | string;
	/**
	 * Tamaño inicial del primer panel (px o porcentaje, ej: 200 o "50%")
	 */
	initial?: number | string;
	/**
	 * Clases adicionales
	 */
	className?: string;
	/**
	 * Los hijos deben ser dos elementos (los paneles)
	 */
	children: React.ReactNode[] | React.ReactNode;
}
