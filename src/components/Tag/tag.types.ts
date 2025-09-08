export interface TagProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "disabled" | "checked" | "color"> {
	/**
	 * Define el estilo visual del tag, como la apariencia del carril y el pulgar.
	 */
	variant?: "outline" | "solid" | "soft" | "dashed" | "subtle" | undefined;
	/**
	 * Controla el tamaño visual del tag.
	 */
	size?: "tiny" | "small" | "medium" | "large" | undefined;
	/**
	 * Establece el esquema de color para el tag, típicamente afectando el color cuando está activado.
	 */
	color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | undefined;
	/**
	 * Define la forma del tag (por ejemplo, con extremos redondeados o cuadrados).
	 */
	radius?: "none" | "tiny" | "small" | "medium" | "large" | "full" | undefined;
	/**
	 * Define el texto que se muestra en el tag.
	 */
	text?: string;
	/**
	 * Define el icono que se muestra en el tag.
	 */
	icon?: React.ReactNode;
	/**
	 * Define la funcionalidad de cierre del tag, si no se define no se muestra (no se muestra el icono de cierre).
	 */
	onClose?: () => void;
}
