import { useState } from "react";
import styles from "./datepicker.module.css";
import { datepickerVariants } from "./datepicker.variants";
import { DatePickerProps } from "./datepicker.types";
import clsx from "clsx";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";

const WEEK_DAYS = ["D", "L", "M", "M", "J", "V", "S"];

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
	radius = "small",
	variant = "solid",
	header,
	isDateDisabled,
}: DatePickerProps) => {
	const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());

	const selectedDate = value ? new Date(value) : undefined;

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const daysInMonth = getDaysInMonth(year, month);
	const firstDayOfWeek = new Date(year, month, 1).getDay();

	// Construir la matriz de días para el grid
	const days: (Date | null)[] = [];
	for (let i = 0; i < firstDayOfWeek; i++) {
		days.push(null);
	}
	for (let d = 1; d <= daysInMonth; d++) {
		days.push(new Date(year, month, d));
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

	return (
		<div className={datepickerVariants({ size, radius, variant, type })}>
			<div className={styles["lambda-datepicker-header"]}>
				<Button
					type="button"
					variant="text"
					color="primary"
					size="tiny"
					onClick={handlePrevYear}
					aria-label="Año anterior"
					disabled={disabled}
					icon={<ChevronsLeftIcon />}
				/>
				<Button
					type="button"
					variant="text"
					color="primary"
					size="tiny"
					onClick={handlePrevMonth}
					aria-label="Mes anterior"
					disabled={disabled}
					icon={<ChevronLeftIcon />}
				/>
				<span className={styles["lambda-datepicker-title"]}>
					{header ||
						`${currentDate.toLocaleString("en-US", {
							month: "long",
							timeZone: "America/Mexico_City",
						})} ${year}`}
				</span>
				<Button
					type="button"
					variant="soft"
					color="primary"
					size="tiny"
					onClick={handleNextMonth}
					aria-label="Mes siguiente"
					disabled={disabled}
					icon={<ChevronRightIcon />}
				/>
				<Button
					type="button"
					variant="soft"
					color="primary"
					size="tiny"
					onClick={handleNextYear}
					aria-label="Año siguiente"
					disabled={disabled}
					icon={<ChevronsRightIcon />}
				/>
			</div>
			<Divider />
			<div className={styles["lambda-datepicker-days"]}>
				{WEEK_DAYS.map((day, i) => (
					<span key={i} className={styles["lambda-datepicker-day-label"]}>
						{day}
					</span>
				))}
			</div>
			<div className={styles["lambda-datepicker-grid"]}>
				{days.map((date, idx) => {
					if (!date) {
						return <span key={idx} />;
					}
					const selected = selectedDate && isSameDay(date, selectedDate);
					const today = isToday(date);
					const outOfRange = isOutOfRange(date) || disabled;
					return (
						<button
							key={idx}
							type="button"
							className={clsx(
								styles["lambda-datepicker-cell"],
								selected && styles["lambda-datepicker-cell-selected"],
								today && styles["lambda-datepicker-cell-today"],
								outOfRange && styles["lambda-datepicker-cell-disabled"]
							)}
							onClick={() => !outOfRange && onChange?.(date)}
							disabled={outOfRange}
							aria-label={date.toLocaleDateString()}
						>
							{date.getDate()}
						</button>
					);
				})}
			</div>
		</div>
	);
};
