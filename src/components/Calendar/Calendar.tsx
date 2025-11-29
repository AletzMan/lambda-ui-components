import { useRef, useState, useEffect } from "react";
import styles from "./calendar.module.css";
import {
	calendarCellVariants,
	calendarDayLabelVariants,
	calendarGridVariants,
	calendarVariants,
	calendarWrapperVariants,
} from "./calendar.variants";
import { CalendarProps } from "./calendar.types";
import clsx from "clsx";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	Circle,
} from "lucide-react";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { useTranslation } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { Tooltip } from "../ToolTip/ToolTip";

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

export const Calendar = ({
	value,
	onChange,
	minDate,
	maxDate,
	disabled,
	events,
	radius = "small",
	variant = "solid",
	isDateDisabled,
}: CalendarProps) => {
	const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
	const [isOpen, setIsOpen] = useState(false);
	const refInput = useRef<HTMLInputElement>(null);
	const refDropdown = useRef<HTMLDivElement>(null);

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
		<div className={calendarWrapperVariants({ variant })}>
			<div className={calendarVariants({ radius, variant })}>
				<header className={styles["lambda-calendar-header"]}>
					<Tooltip content={t("date-picker.prev-year")} color="neutral">
						<Button
							type="button"
							variant="text"
							color="neutral"
							size="small"
							onClick={handlePrevYear}
							aria-label={t("date-picker.prev-year")}
							disabled={disabled}
							icon={<ChevronsLeftIcon />}
							className={clsx(styles["lambda-calendar-nav-button"])}
						/>
					</Tooltip>
					<Tooltip content={t("date-picker.prev-month")} color="neutral">
						<Button
							type="button"
							variant="text"
							color="neutral"
							size="small"
							onClick={handlePrevMonth}
							aria-label={t("date-picker.prev-month")}
							disabled={disabled}
							icon={<ChevronLeftIcon />}
							className={clsx(styles["lambda-calendar-nav-button"])}
						/>
					</Tooltip>
					<Button
						className={styles["lambda-calendar-title"]}
						variant="text"
						color="neutral"
						size="medium"
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
							size="small"
							onClick={handleNextMonth}
							aria-label={t("date-picker.next-month")}
							disabled={disabled}
							icon={<ChevronRightIcon />}
							className={clsx(styles["lambda-calendar-nav-button"])}
						/>
					</Tooltip>
					<Tooltip content={t("date-picker.next-year")} color="neutral">
						<Button
							type="button"
							variant="text"
							color="neutral"
							size="small"
							onClick={handleNextYear}
							aria-label={t("date-picker.next-year")}
							disabled={disabled}
							icon={<ChevronsRightIcon />}
							className={clsx(styles["lambda-calendar-nav-button"])}
						/>
					</Tooltip>
				</header>
				<Divider spacing={7} />
				<div className={styles["lambda-calendar-days"]}>
					{t("date-picker.days")
						.split(",")
						.map((day, i) => (
							<span key={i} className={calendarDayLabelVariants({ variant })}>
								{day}
							</span>
						))}
				</div>
				<div className={calendarGridVariants({ variant })}>
					{days.map((date, idx) => {
						if (date?.type === "prev" || date?.type === "next") {
							return (
								<span key={idx} className={calendarCellVariants({ variant, month: false })}>
									<span className={styles["lambda-calendar-cell-date"]}>
										{date?.date.getDate()}
									</span>
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
									calendarCellVariants({
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
								<span className={styles["lambda-calendar-cell-date"]}>{date!.date.getDate()}</span>
								<ul className={styles["lambda-calendar-cell-events"]}>
									{events
										?.find((event) => isSameDay(event.date, date!.date))
										?.label.map((s, i) => (
											<li
												key={i}
												className={styles["lambda-calendar-cell-event"]}
											>
												<Circle
													fill={
														events?.find((event) => isSameDay(event.date, date!.date))?.status[
															i
														] === "success"
															? "var(--success-base-color)"
															: events?.find((event) => isSameDay(event.date, date!.date))?.status[
																i
															] === "warning"
																? "var(--warning-base-color)"
																: "var(--danger-base-color)"
													}
													stroke="transparent"
													size={10}
												/>
												<span>{s}</span>
											</li>
										))}
								</ul>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
