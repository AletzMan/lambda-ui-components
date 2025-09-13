import { TableVariants } from "./table.variants";

export interface TableProps extends Omit<React.HTMLAttributes<HTMLTableElement>, "size"> {
	/**
	 * Controla el tamaño visual de la tabla.
	 */
	size?: TableVariants["size"];
	/**
	 * Define el estilo visual de la tabla, como la apariencia de las filas y las celdas.
	 */
	variant?: TableVariants["variant"];
	/**
	 * Define el número de filas por página.
	 */
	rowsPerPage?: number;
	/**
	 * Configura la paginación de la tabla.
	 */
	pagination?: {
		page?: number;
		totalPages?: number;
	};
}
