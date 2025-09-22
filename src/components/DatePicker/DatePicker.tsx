import { useRef, useState, useEffect } from "react";
import styles from "./datepicker.module.css";
import {
	datepickerCellVariants,
	datepickerDayLabelVariants,
	datepickerDropdownVariants,
	datepickerVariants,
	datepickerWrapperVariants,
} from "./datepicker.variants";
import { DatePickerProps } from "./datepicker.types";
import clsx from "clsx";
import {
	CalendarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import {
	useTranslation,
	useUIConfig,
} from "../../_internal/hooks/translation/LambdaConfigProvider";
import { Tooltip } from "../ToolTip/ToolTip";
import InputGroup from "../InputGroup/InputGroup";
import { Input } from "../Input/Input";
import { createPortal } from "react-dom";

function getDaysInMonth(year: number, month: number) {
	return new Date(year, month + 1, 0).getDate();
}

function isSameDay(a: Date, b: Date) {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function isToday(date: Date) {
	const today = new Date();
	return isSameDay(today, date);
}

export const DatePicker = ({
	value,
	onChange,
	minDate,
	maxDate,
	disabled,
	size,
	type,
	radius,
	variant,
	isDateDisabled,
}: DatePickerProps) => {
	const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
	const [isOpen, setIsOpen] = useState(false);
	const [calendarPosition, setCalendarPosition] = useState<{
		left: number;
		top: number;
		direction: "down" | "up";
	}>({ left: 0, top: 0, direction: "down" });
	const refInput = useRef<HTMLInputElement>(null);
	const refDropdown = useRef<HTMLDivElement>(null);
	const { radiusField } = useUIConfig();
	const radiusValue = radius || radiusField;

	const { t } = useTranslation();

	const selectedDate = value ? new Date(value) : undefined;

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const daysInMonth = getDaysInMonth(year, month);
	const firstDayOfWeek = new Date(year, month, 1).getDay();
	const lastDayOfWeek = 6 - new Date(year, month, daysInMonth).getDay();
	const daysInPrevMonth = getDaysInMonth(year, month - 1);
	const lastDaysInPrevMonth = Array.from({ length: daysInPrevMonth }, (_, i) => i + 1)
		.reverse()
		.map((day) => new Date(year, month - 1, day))
		.filter((_day, index) => index < firstDayOfWeek)
		.reverse();

	// Construir la matriz de días para el grid
	const days: ({ date: Date; type: "prev" | "current" | "next" } | null)[] = [];
	for (let i = 0; i < firstDayOfWeek; i++) {
		days.push({ date: lastDaysInPrevMonth[i], type: "prev" });
	}
	for (let d = 1; d <= daysInMonth; d++) {
		days.push({ date: new Date(year, month, d), type: "current" });
	}
	for (let i = 0; i < lastDayOfWeek; i++) {
		days.push({ date: new Date(year, month + 1, i + 1), type: "next" });
	}

	// Navegación
	const handlePrevMonth = () => {
		setCurrentDate((prev) => {
			const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
			return prevMonth;
		});
	};
	const handleNextMonth = () => {
		setCurrentDate((prev) => {
			const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
			return nextMonth;
		});
	};

	const handlePrevYear = () => {
		setCurrentDate((prev) => {
			const prevYear = new Date(prev.getFullYear() - 1, prev.getMonth(), 1);
			return prevYear;
		});
	};

	const handleNextYear = () => {
		setCurrentDate((prev) => {
			const nextYear = new Date(prev.getFullYear() + 1, prev.getMonth(), 1);
			return nextYear;
		});
	};

	// Helpers para deshabilitar días
	const isOutOfRange = (date: Date) => {
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		if (isDateDisabled && isDateDisabled(date)) return true;
		return false;
	};

	const Calendar = () => {
		return (
			<div className={datepickerVariants({ size, radius, variant, type })}>
				<header className={styles["lambda-datepicker-header"]}>
					<Tooltip content={t("date-picker.prev-year")} color="neutral">
						<Button
							type="button"
							variant="text"
							color="neutral"
							size={type === "dropdown" ? "tiny" : "small"}
							onClick={handlePrevYear}
							aria-label={t("date-picker.prev-year")}
							disabled={disabled}
							icon={<ChevronsLeftIcon />}
							className={clsx(styles["lambda-datepicker-nav-button"])}
						/>
					</Tooltip>
					<Tooltip content={t("date-picker.prev-month")} color="neutral">
						<Button
							type="button"
							variant="text"
							color="neutral"
							size={type === "dropdown" ? "tiny" : "small"}
							onClick={handlePrevMonth}
							aria-label={t("date-picker.prev-month")}
							disabled={disabled}
							icon={<ChevronLeftIcon />}
							className={clsx(styles["lambda-datepicker-nav-button"])}
						/>
					</Tooltip>
					<Button
						className={styles["lambda-datepicker-title"]}
						variant="text"
						color="neutral"
						size={type === "dropdown" ? "tiny" : "medium"}
						label={`${currentDate.toLocaleString(t("date-picker.code"), {
							month: "long",
							timeZone: "America/Mexico_City",
						})} ${year}`}
					/>
					<Tooltip content={t("date-picker.next-month")} color="neutral">
						<Button
							type="button"
							variant="text"
							color="neutral"
							size={type === "dropdown" ? "tiny" : "small"}
							onClick={handleNextMonth}
							aria-label={t("date-picker.next-month")}
							disabled={disabled}
							icon={<ChevronRightIcon />}
							className={clsx(styles["lambda-datepicker-nav-button"])}
						/>
					</Tooltip>
					<Tooltip content={t("date-picker.next-year")} color="neutral">
						<Button
							type="button"
							variant="text"
							color="neutral"
							size={type === "dropdown" ? "tiny" : "small"}
							onClick={handleNextYear}
							aria-label={t("date-picker.next-year")}
							disabled={disabled}
							icon={<ChevronsRightIcon />}
							className={clsx(styles["lambda-datepicker-nav-button"])}
						/>
					</Tooltip>
				</header>
				<Divider spacing={7} />
				<div className={styles["lambda-datepicker-days"]}>
					{t("date-picker.days")
						.split(",")
						.map((day, i) => (
							<span key={i} className={datepickerDayLabelVariants({ type, size })}>
								{day}
							</span>
						))}
				</div>
				<div className={styles["lambda-datepicker-grid"]}>
					{days.map((date, idx) => {
						if (date?.type === "prev" || date?.type === "next") {
							return (
								<span key={idx} className={datepickerCellVariants({ type, size, month: false })}>
									{date?.date.getDate()}
								</span>
							);
						}
						const selected = selectedDate && isSameDay(date!.date, selectedDate);
						const today = isToday(date!.date);
						const outOfRange = isOutOfRange(date!.date) || disabled;
						return (
							<button
								key={idx}
								type="button"
								className={clsx(
									datepickerCellVariants({
										type,
										size,
										variant,
										selected,
										today,
										month: true,
										disabled: outOfRange,
									})
								)}
								onClick={() => !outOfRange && onChange?.(date!.date)}
								disabled={outOfRange}
								aria-label={date!.date.toLocaleDateString()}
							>
								{date!.date.getDate()}
							</button>
						);
					})}
				</div>
			</div>
		);
	};

	const handleOpenCalendar = () => {
		if (!refInput.current) return;
		const rect = refInput.current.getBoundingClientRect();
		const calendarHeight = 218; // Ajusta según tu diseño real
		const offset = 5; // Margen entre input y calendario
		const spaceBelow = window.innerHeight - rect.bottom;
		const spaceAbove = rect.top;
		let direction: "down" | "up" = "down";
		let top = rect.bottom + offset;
		if (spaceBelow < calendarHeight && spaceAbove > calendarHeight) {
			direction = "up";
			top = rect.top - calendarHeight;
		}
		setCalendarPosition({ left: rect.left - 10, top, direction });
		setIsOpen(true);
	};

	// --- cierre automático y listeners ---
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				refDropdown.current &&
				!refDropdown.current.contains(event.target as Node) &&
				refInput.current &&
				!refInput.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		const handleScroll = () => setIsOpen(false);
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};
		const handleResize = () => setIsOpen(false);
		const handleBlur = () => setIsOpen(false);

		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("scroll", handleScroll, true);
		document.addEventListener("keydown", handleKeyDown);
		window.addEventListener("resize", handleResize);
		window.addEventListener("blur", handleBlur);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("scroll", handleScroll, true);
			document.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("blur", handleBlur);
		};
	}, [isOpen]);

	return (
		<div className={datepickerWrapperVariants({ size, type })}>
			<InputGroup
				size={size}
				radius={radiusValue}
				variant={variant === "solid" ? "outline" : variant}
				suffixElement={
					<Button
						variant="text"
						color="neutral"
						icon={<CalendarIcon />}
						onClick={handleOpenCalendar}
					/>
				}
			>
				<Input ref={refInput} value={value?.toISOString().split("T")[0]} />
			</InputGroup>
			{isOpen &&
				createPortal(
					<div
						ref={refDropdown}
						className={datepickerDropdownVariants({ type, direction: calendarPosition.direction })}
						style={{
							left: calendarPosition.left,
							top: calendarPosition.top,
							zIndex: 9999,
						}}
					>
						<Calendar />
					</div>,
					document.body
				)}
		</div>
	);
};
