import React, { useCallback, useMemo, forwardRef } from "react";
import clsx from "clsx";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import {
	paginationWrapper,
	paginationListContainer,
	paginationButton,
} from "./pagination.variants";
import styles from "./pagination.module.css";
import { PaginationButtonProps, PaginationProps } from "./pagination.types";
import { useConfig } from "../../_internal/hooks/translation/ConfigProvider";

const PaginationButton = ({
	isActive,
	disabled,
	children,
	size,
	variant,
	isNavigation,
	radius,
	pageNumber,
	onClick,
	...rest
}: PaginationButtonProps) => {
	const isEllipsisButton = children === "...";

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			if (!disabled && !isEllipsisButton && onClick) {
				onClick(event);
			}
		},
		[disabled, isEllipsisButton, onClick]
	);

	return (
		<button
			type="button"
			className={clsx(
				styles["lambda-pagination-button"],
				paginationButton({
					size,
					variant,
					radius,
					isActive,
					disabled: disabled || isEllipsisButton,
					isNavigation,
				})
			)}
			onClick={handleClick}
			disabled={disabled || isEllipsisButton}
			aria-current={isActive ? "page" : undefined}
			{...rest}
		>
			{children}
		</button>
	);
};

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
	(
		{
			currentPage,
			totalPages,
			onPageChange,
			maxVisiblePages = 5,
			showFirstLastButtons = true,
			showPrevNextButtons = true,
			disabled = false,
			size = "medium",
			variant = "outline",
			ariaLabel = "Page navigation",
			className,
			...rest
		},
		ref
	) => {
		const { radius } = useConfig();
		// --- Lógica para calcular los números de página visibles ---
		const pageNumbers = useMemo(() => {
			const pages: (number | string)[] = [];

			if (totalPages <= maxVisiblePages) {
				// Si el total de páginas es menor o igual al máximo visible, mostrar todas
				for (let i = 1; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				// Si hay más páginas que el máximo visible, calcular el rango
				const halfVisible = Math.floor(maxVisiblePages / 2);
				let startPage = Math.max(1, currentPage - halfVisible);
				let endPage = Math.min(totalPages, currentPage + halfVisible);

				// Ajustar el rango si está cerca del principio o del final
				if (endPage - startPage + 1 < maxVisiblePages) {
					if (startPage === 1) {
						endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
					} else if (endPage === totalPages) {
						startPage = Math.max(1, endPage - maxVisiblePages + 1);
					}
				}

				// Siempre mostrar la primera página y ellipsis si es necesario
				if (startPage > 1) {
					pages.push(1);
					if (startPage > 2) {
						pages.push("...");
					}
				}

				// Mostrar el rango de páginas calculado
				for (let i = startPage; i <= endPage; i++) {
					pages.push(i);
				}

				// Siempre mostrar la última página y ellipsis si es necesario
				if (endPage < totalPages) {
					if (endPage < totalPages - 1) {
						pages.push("...");
					}
					pages.push(totalPages);
				}
			}

			return pages;
		}, [currentPage, totalPages, maxVisiblePages]);

		// Handler genérico para cambiar de página
		const handleGoToPage = useCallback(
			(pageNumber: number) => {
				if (
					pageNumber >= 1 &&
					pageNumber <= totalPages &&
					pageNumber !== currentPage &&
					onPageChange &&
					!disabled
				) {
					onPageChange(pageNumber);
				}
			},
			[currentPage, totalPages, onPageChange, disabled]
		);

		// Handler para ir a la página anterior
		const handlePrevPage = useCallback(() => {
			handleGoToPage(currentPage - 1);
		}, [currentPage, handleGoToPage]);

		// Handler para ir a la página siguiente
		const handleNextPage = useCallback(() => {
			handleGoToPage(currentPage + 1);
		}, [currentPage, handleGoToPage]);

		// Handler para ir a la primera página
		const handleFirstPage = useCallback(() => {
			handleGoToPage(1);
		}, [handleGoToPage]);

		// Handler para ir a la última página
		const handleLastPage = useCallback(() => {
			handleGoToPage(totalPages);
		}, [totalPages, handleGoToPage]);

		const isFirstPage = currentPage === 1;
		const isLastPage = currentPage === totalPages;
		const areNavButtonsDisabled = disabled || totalPages <= 1;

		return (
			<nav
				ref={ref}
				className={clsx(
					styles["lambda-pagination-wrapper"],
					paginationWrapper({ disabled }),
					className
				)}
				aria-label={ariaLabel}
				{...rest}
			>
				{/* Contenedor de la lista de botones */}
				<div className={paginationListContainer({ size })}>
					{/* Botón Ir a Primera Página (opcional) */}
					{showFirstLastButtons && (
						<PaginationButton
							size={size}
							variant={variant}
							radius={radius}
							disabled={areNavButtonsDisabled || isFirstPage}
							isNavigation
							aria-label="Go to first page"
							onClick={handleFirstPage}
						>
							{/* Icono ChevronsLeft */}
							<ChevronsLeftIcon className={styles["lambda-pagination-button-icon"]} />
						</PaginationButton>
					)}

					{/* Botón Ir a Página Anterior (opcional) */}
					{showPrevNextButtons && (
						<PaginationButton
							size={size}
							variant={variant}
							radius={radius}
							disabled={areNavButtonsDisabled || isFirstPage}
							isNavigation
							aria-label="Go to previous page"
							onClick={handlePrevPage}
						>
							{/* Icono ChevronLeft */}
							<ChevronLeftIcon className={styles["lambda-pagination-button-icon"]} />
						</PaginationButton>
					)}

					{/* Botones de Números de Página (y "...") */}
					{pageNumbers.map((page, index) => (
						<PaginationButton
							key={index}
							pageNumber={typeof page === "number" ? page : null}
							isActive={typeof page === "number" && page === currentPage}
							disabled={typeof page !== "number" || disabled}
							size={size}
							variant={variant}
							radius={radius}
							aria-label={typeof page === "number" ? `Página ${page}` : undefined}
							onClick={typeof page === "number" ? () => handleGoToPage(page) : undefined}
						>
							{page}
						</PaginationButton>
					))}

					{/* Botón Ir a Página Siguiente (opcional) */}
					{showPrevNextButtons && (
						<PaginationButton
							size={size}
							variant={variant}
							radius={radius}
							disabled={areNavButtonsDisabled || isLastPage}
							isNavigation
							aria-label="Go to next page"
							onClick={handleNextPage}
						>
							{/* Icono ChevronRight */}
							<ChevronRightIcon className={styles["lambda-pagination-button-icon"]} />
						</PaginationButton>
					)}

					{/* Botón Ir a Última Página (opcional) */}
					{showFirstLastButtons && (
						<PaginationButton
							size={size}
							variant={variant}
							radius={radius}
							disabled={areNavButtonsDisabled || isLastPage}
							isNavigation
							aria-label="Go to last page"
							onClick={handleLastPage}
						>
							{/* Icono ChevronsRight */}
							<ChevronsRightIcon className={styles["lambda-pagination-button-icon"]} />
						</PaginationButton>
					)}
				</div>
			</nav>
		);
	}
);
