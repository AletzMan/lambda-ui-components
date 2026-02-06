import { createContext, useContext, ReactNode, HTMLAttributes, useState, useCallback } from "react";
import {
	containerVariants,
	tableVariants,
	headerVariants,
	rowVariants,
	cellVariants,
	headerCellVariants,
	containerTableVariants,
} from "./table.variants";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

import styles from "./table.module.css";
import { Pagination } from "../Pagination/Pagination";
import clsx from "clsx";
import { useTranslation } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { SortConfig, TableProperties } from "./table.types";

const TableContext = createContext<TableProperties | undefined>(undefined);

const useTableContext = () => {
	const context = useContext(TableContext);
	if (!context) {
		throw new Error("useTableContext debe ser usado dentro de un TableProvider");
	}
	return context;
};

// Componente Raíz
const TableRoot = <T,>({
	size = "medium",
	variant = "bordered",
	highlightOnHover = false,
	children,
	data,
	pagination,
	onSortColumn,
	...props
}: {
	children: ReactNode;
	data: T[];
	onSortColumn?: (column: string, direction: "asc" | "desc", type: SortConfig["type"]) => void;
	highlightOnHover?: boolean;
	pagination?: {
		page?: number;
		totalPages?: number;
		rowsPerPage?: number;
		totalRows?: number;
		onPageChange?: (page: number) => void;
	};
} & HTMLAttributes<HTMLTableElement> & {
	size?: "tiny" | "small" | "medium" | "large";
	variant?: "soft" | "underlined" | "bordered" | "striped" | "bordered-transparent" | null | undefined;
}) => {
	const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
	const { t } = useTranslation();

	const handleSort = useCallback(
		(key: string, type: string) => {
			const prevDirection = sortConfig.direction;
			onSortColumn?.(key, prevDirection === "asc" ? "desc" : "asc", type as SortConfig["type"]);
			setSortConfig({
				key,
				direction: prevDirection === "asc" ? "desc" : "asc",
				type: type as SortConfig["type"],
			});
		},
		[sortConfig]
	);

	const handlePageChange = (page: number) => {
		pagination?.onPageChange?.(page);
	};

	return (
		<TableContext.Provider value={{ size, variant, sortConfig, handleSort, highlightOnHover }}>
			<div className={containerVariants({ variant })}>
				<div className={clsx(containerTableVariants({ variant }), "scrollBar")}>
					<table className={tableVariants({ size, variant })} {...props}>
						{children}
					</table>
				</div>
				{pagination && (
					<div className={styles["lambda-table-pagination"]}>
						<div className={styles["lambda-table-pagination-text"]}>
							{t("table.rows", {
								from: ((pagination?.page || 1) - 1) * (pagination?.rowsPerPage || 10) + 1,
								to: (pagination?.page || 1) * (pagination?.rowsPerPage || 10),
								total: pagination.totalRows,
							})}
						</div>
						<Pagination
							className={styles["lambda-table-pagination-pagination"]}
							currentPage={pagination.page || 1}
							totalPages={pagination.totalPages || 1}
							maxVisiblePages={2}
							showFirstLastButtons
							showPrevNextButtons
							onPageChange={handlePageChange}
							size={size === "tiny" ? "tiny" : "small"}
							variant={
								variant === "soft"
									? "soft"
									: variant === "underlined"
										? "solid"
										: variant === "bordered" || variant === "bordered-transparent"
											? "bordered"
											: variant === "striped"
												? "bordered"
												: "soft"
							}
						/>
					</div>
				)}
			</div>
		</TableContext.Provider>
	);
};

// Componentes Hijos (presentacionales)
const TableHeader = ({
	children,
	...props
}: HTMLAttributes<HTMLTableSectionElement> & { children: ReactNode }) => {
	const { size, variant } = useTableContext();
	return (
		<thead className={headerVariants({ size, variant })} {...props}>
			{children}
		</thead>
	);
};

const TableBody = ({
	children,
	...props
}: HTMLAttributes<HTMLTableSectionElement> & { children: ReactNode }) => {
	return <tbody {...props}>{children}</tbody>;
};

const TableRow = ({
	children,
	...props
}: HTMLAttributes<HTMLTableRowElement> & { children: ReactNode }) => {
	const { size, variant, highlightOnHover } = useTableContext();
	return (
		<tr
			className={rowVariants({ size, variant, highlightOnHover })}
			data-highlight-hover={highlightOnHover}
			{...props}
		>
			{children}
		</tr>
	);
};

const TableCell = ({
	children,
	align = "left",
	...props
}: HTMLAttributes<HTMLTableCellElement> & {
	children: ReactNode;
	align?: "left" | "center" | "right";
}) => {
	const { size, variant } = useTableContext();
	return (
		<td className={cellVariants({ size, variant, align })} {...props}>
			<div>{children}</div>
		</td>
	);
};

const TableColumnHeader = ({
	children,
	sortKey,
	type = "string",
	width,
	isSortable = false,
	...props
}: HTMLAttributes<HTMLTableCellElement> & {
	children: ReactNode;
	sortKey: string;
	type?: "string" | "number" | "date" | "boolean";
	width?: string;
	isSortable?: boolean;
}) => {
	const { size, variant, sortConfig, handleSort } = useTableContext();
	const isSorted = sortConfig.key === sortKey;

	return (
		<th
			className={headerCellVariants({ size, variant })}
			onClick={isSortable ? () => handleSort(sortKey, type) : undefined}
			{...props}
			style={{ width }}
		>
			<div
				className={clsx(
					styles["lambda-header-group"],
					isSortable && styles["lambda-header-group-sortable"]
				)}
			>
				{children}
				{isSorted && (
					<button className={styles["lambda-header-button"]}>
						{sortConfig.direction === "asc" ? <ArrowUpWideNarrow /> : <ArrowDownWideNarrow />}
					</button>
				)}
			</div>
		</th>
	);
};

// 2. Agrupación y exportación
export const Table = Object.assign(TableRoot, {
	Header: TableHeader,
	ColumnHeader: TableColumnHeader,
	Body: TableBody,
	Row: TableRow,
	Cell: TableCell,
});
