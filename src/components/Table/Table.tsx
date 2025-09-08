import {
	createContext,
	useContext,
	ReactNode,
	HTMLAttributes,
	useState,
	useMemo,
	useCallback,
} from "react";
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
import { Select } from "../Select/Select";
import { useConfig } from "../../_internal/hooks/translation/ConfigProvider";

// Definición de tipos
interface SortConfig {
	key: string | null;
	direction: "asc" | "desc";
	type?: "string" | "number" | "date" | "boolean";
}

interface TableProperties {
	size?: "tiny" | "small" | "medium" | "large";
	variant?: "soft" | "underlined" | "bordered" | "striped";
	sortConfig: SortConfig;
	handleSort: (key: string, type: string) => void;
	pagination?: {
		page?: number;
		totalPages?: number;
	};
}

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
	variant = "soft",
	children,
	data,
	renderRow,
	pagination = { page: 1, totalPages: 1 },
	...props
}: {
	children: ReactNode;
	data: T[];
	renderRow: (item: T) => ReactNode;
	pagination?: {
		page?: number;
		totalPages?: number;
	};
} & HTMLAttributes<HTMLTableElement> & {
		size?: "tiny" | "small" | "medium" | "large";
		variant?: "soft" | "underlined" | "bordered" | "striped";
	}) => {
	const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
	const [maxRows, setMaxRows] = useState(10);
	const { t } = useConfig();

	const sortedData = useMemo(() => {
		if (!sortConfig.key || !data) {
			return data;
		}
		const sortableData = [...data];
		sortableData.sort((a, b) => {
			const aValue = a[sortConfig.key as keyof T];
			const bValue = b[sortConfig.key as keyof T];
			let compare = 0;

			if (sortConfig.type === "string" || typeof aValue === "string") {
				compare = String(aValue).localeCompare(String(bValue));
			} else if (sortConfig.type === "number" || typeof aValue === "number") {
				compare = Number(aValue) - Number(bValue);
			} else if (sortConfig.type === "date") {
				compare = new Date(aValue as string).getTime() - new Date(bValue as string).getTime();
			} else if (sortConfig.type === "boolean") {
				compare = aValue === bValue ? 0 : aValue ? 1 : -1;
			}

			return sortConfig.direction === "asc" ? compare : -compare;
		});
		return sortableData;
	}, [data, sortConfig]);

	const handleSort = useCallback((key: string, type: string) => {
		setSortConfig((prevConfig) => ({
			key,
			direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
			type: type as SortConfig["type"],
		}));
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(sortedData.length / (maxRows && maxRows > 0 ? maxRows : 10));

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<TableContext.Provider value={{ size, variant, sortConfig, handleSort }}>
			<div className={containerVariants({ variant })}>
				<Select
					className={styles["lambda-table-pagination-select"]}
					value={maxRows.toString()}
					size="tiny"
					onChange={(e) => {
						setMaxRows(Number(e));
						setCurrentPage(1);
					}}
					options={[
						{
							value: "5",
							label: t("table.page", { count: 5 }),
						},
						{
							value: "10",
							label: t("table.page", { count: 10 }),
						},
						{
							value: "20",
							label: t("table.page", { count: 20 }),
						},
						{
							value: "50",
							label: t("table.page", { count: 50 }),
						},
					]}
				/>
				<div className={clsx(containerTableVariants({ variant }), "scrollBar")}>
					<table className={tableVariants({ size, variant })} {...props}>
						{children}
						<TableBody>
							{sortedData
								.map(renderRow)
								.slice(
									(currentPage - 1) * (maxRows && maxRows > 0 ? maxRows : 1),
									currentPage * (maxRows && maxRows > 0 ? maxRows : 10)
								)}
						</TableBody>
					</table>
				</div>
				{pagination && (
					<div className={styles["lambda-table-pagination"]}>
						<div className={styles["lambda-table-pagination-text"]}>
							{t("table.rows", {
								from: (currentPage - 1) * maxRows + 1,
								to: currentPage * maxRows,
								total: sortedData.length,
							})}
						</div>
						<Pagination
							className={styles["lambda-table-pagination-pagination"]}
							currentPage={currentPage}
							totalPages={totalPages}
							maxVisiblePages={1}
							onPageChange={handlePageChange}
							size="small"
							variant={
								variant === "soft"
									? "soft"
									: variant === "underlined"
									? "solid"
									: variant === "bordered"
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
	const { size, variant } = useTableContext();
	return (
		<tr className={rowVariants({ size, variant })} {...props}>
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
			{children}
		</td>
	);
};

const TableColumnHeader = ({
	children,
	sortKey,
	type = "string",
	width,
	...props
}: HTMLAttributes<HTMLTableCellElement> & {
	children: ReactNode;
	sortKey: string;
	type?: "string" | "number" | "date" | "boolean";
	width?: string;
}) => {
	const { size, variant, sortConfig, handleSort } = useTableContext();
	const isSorted = sortConfig.key === sortKey;

	return (
		<th
			className={headerCellVariants({ size, variant })}
			onClick={() => handleSort(sortKey, type)}
			{...props}
			style={{ width }}
		>
			<div className={styles["lambda-header-group"]}>
				{children}
				{isSorted && (
					<button className={styles["lambda-header-button"]}>
						{sortConfig.direction === "asc" ? <ArrowDownWideNarrow /> : <ArrowUpWideNarrow />}
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
