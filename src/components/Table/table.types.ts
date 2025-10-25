import { TableVariants } from "./table.variants";

// Definición de tipos
export interface SortConfig {
	key: string | null;
	direction: "asc" | "desc";
	type?: "string" | "number" | "date" | "boolean";
}

export interface TableProperties {
	size?: "tiny" | "small" | "medium" | "large";
	variant?: "soft" | "underlined" | "bordered" | "striped" | null | undefined;
	sortConfig: SortConfig;
	handleSort: (key: string, type: string) => void;
	pagination?: {
		page?: number;
		totalPages?: number;
	};
}

export interface TableProps extends Omit<React.HTMLAttributes<HTMLTableElement>, "size"> {
	/**
	 * Controla el tamaño visual de la tabla.
	 */
	size?: TableVariants["size"];
	/**
	 * Define el estilo visual de la tabla, como la apariencia de las filas y las celdas.
	 */
	variant?: TableVariants["variant"];

	onSortColumn?: (column: string, direction: "asc" | "desc", type: SortConfig["type"]) => void;
	/**
	 * Configura la paginación de la tabla.
	 */
	pagination?: {
		/**
		 * Define la página actual.
		 */
		page?: number;
		/**
		 * Define el número total de páginas.
		 */
		totalPages?: number;
		/**
		 * Define el número de filas por página.
		 */
		rowsPerPage?: number;
		/**
		 * Define el número total de filas.
		 */
		totalRows?: number;
		/**
		 * Define la función de callback que se ejecuta cuando se cambia la página.
		 */
		onPageChange?: (page: number) => void;
	};
}
