export interface BadgeProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "disabled" | "checked" | "color"> {
	/**
	 * Define el estilo visual del badge, como la apariencia del carril y el pulgar.
	 */
	variant?: "outline" | "solid" | "flat" | "dashed" | "subtle" | undefined;
	/**
	 * Controla el tamaño visual del badge.
	 */
	size?: "tiny" | "small" | "medium" | "large" | undefined;
	/**
	 * Establece el esquema de color para el badge, típicamente afectando el color cuando está activado.
	 */
	color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | undefined;
	/**
	 * Define la forma del badge (por ejemplo, con extremos redondeados o cuadrados).
	 */
	radius?: "none" | "tiny" | "small" | "medium" | "large" | "full" | undefined;
	/**
	 * Define el texto que se muestra en el badge.
	 */
	text?: string;
	/**
	 * Define el número que se muestra en el badge, si no se define no se muestra.
	 */
	count?: number;
	/**
	 * Define la funcionalidad de cierre del badge, si no se define no se muestra (no se muestra el icono de cierre).
	 */
	onClose?: () => void;
}
