import { useRef, useState, Ref } from "react";
import styles from "./datepicker.module.css";
import {
	datepickerCalendarVariants,
	datepickerCellVariants,
	datepickerDayLabelVariants,
	datepickerInlineSectionVariants,
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
	RotateCcwIcon,
} from "lucide-react";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import {
	useTranslation,
	useUIConfig,
} from "../../_internal/hooks/translation/LambdaConfigProvider";
import { Tooltip } from "../ToolTip/ToolTip";
import { Join } from "../Join/Join";
import { Input } from "../Input/Input";
import { createPortal } from "react-dom";
import { Dialog } from "../Dialog/Dialog";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { usePopover } from "../../_internal/hooks/translation/usePopover/usePopover";

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
	label,
	displayFormat,
	type,
	radius,
	variant,
	errorMessage,
	invalid = false,
	isDateDisabled,
}: DatePickerProps) => {
	const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
	const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
	const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

	const refTempDate = useRef<Date | undefined>(value);
	const refTempYear = useRef<string>("");

	const { isOpen, setIsOpen, menuPosition, triggerRef, contentRef } = usePopover({ y: 3 });
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
		refTempYear.current = "prev";
		setCurrentDate((prev) => {
			const prevYear = new Date(prev.getFullYear() - 1, prev.getMonth(), 1);
			return prevYear;
		});
	};

	const handleNextYear = () => {
		refTempYear.current = "next";
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

	const handleReset = () => {
		setCurrentDate(new Date());
		onChange?.(undefined);
		setIsMonthPickerOpen(false);
		setIsYearPickerOpen(false);
		refTempYear.current = "";
	};

	const handleCloseMonthPicker = (month: number) => {
		setIsMonthPickerOpen(false);
		setCurrentDate((prev) => {
			const nextMonth = new Date(prev.getFullYear(), month, 1);
			return nextMonth;
		});
	};

	const handleCloseYearPicker = (year: number) => {
		setIsYearPickerOpen(false);
		setCurrentDate((prev) => {
			const nextYear = new Date(year, prev.getMonth(), 1);
			return nextYear;
		});
	};

	const handlePrevYears = () => {
		refTempYear.current = "prev";
		setCurrentDate((prev) => {
			const prevYear = new Date(prev.getFullYear() - 15, prev.getMonth(), 1);
			return prevYear;
		});
	};

	const handleNextYears = () => {
		refTempYear.current = "next";
		setCurrentDate((prev) => {
			const nextYear = new Date(prev.getFullYear() + 15, prev.getMonth(), 1);
			return nextYear;
		});
	};

	const Calendar = () => {
		return (
			<div className={datepickerVariants({ size, radius: radiusValue, variant, type, invalid })}>
				<header className={styles["lambda-datepicker-header"]}>
					<Tooltip content={t("date-picker.prev-year")} color="neutral">
						<Button
							type="button"
							variant="text"
							color="neutral"
							title="Previous Year"
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
							title="Previous Month"
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
						title="Select Month"
						size="medium"
						label={`${currentDate.toLocaleString(t("date-picker.code"), {
							month: "long",
						})} ${year}`}
						onClick={() => setIsMonthPickerOpen(true)}
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
							title="Next Month"
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
							title="Next Year"
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
				{type === "dropdown" && (
					<>
						<Divider spacing={7} />
						<footer className={styles["lambda-datepicker-footer"]}>
							<Tooltip content={t("date-picker.reset")} color="neutral">
								<Button
									type="button"
									variant="text"
									color="neutral"
									size="tiny"
									onClick={handleReset}
									aria-label={t("date-picker.close")}
									icon={<RotateCcwIcon />}
									className={clsx(styles["lambda-datepicker-nav-button"])}
								/>
							</Tooltip>
						</footer>
					</>
				)}
				{isMonthPickerOpen && (
					<div className={styles["lambda-datepicker-picker-section"]}>
						<div className={styles["lambda-datepicker-picker-section-header"]}>
							<Button
								type="button"
								variant="text"
								color="neutral"
								size="small"
								onClick={handlePrevYear}
								aria-label={t("date-picker.close")}
								title="Previous Year"
								icon={<ChevronLeftIcon />}
								className={clsx(styles["lambda-datepicker-nav-button"])}
							/>
							<button
								onClick={() => setIsYearPickerOpen(true)}
								aria-label={year.toString()}
								className={styles["lambda-datepicker-picker-section-header-year"]}
							>
								{year}
							</button>
							<Button
								type="button"
								variant="text"
								color="neutral"
								size="small"
								onClick={handleNextYear}
								aria-label={t("date-picker.close")}
								title="Next Year"
								icon={<ChevronRightIcon />}
								className={clsx(styles["lambda-datepicker-nav-button"])}
							/>
						</div>

						<div className={styles["lambda-datepicker-picker-section-months"]}>
							{t("date-picker.months")
								.split(",")
								.map((monthBtn, i) => (
									<button
										key={i}
										type="button"
										onClick={() => handleCloseMonthPicker(i)}
										aria-label={monthBtn}
										title={monthBtn}
										className={clsx(styles["lambda-datepicker-picker-section-month"], {
											[styles["lambda-datepicker-picker-section-month-soft"]]: variant === "soft",
											[styles["lambda-datepicker-picker-section-month-selected"]]:
												month.toString() === i.toString(),
										})}
									>
										{monthBtn}
									</button>
								))}
						</div>
						{isYearPickerOpen && (
							<div className={styles["lambda-datepicker-picker-section"]}>
								<div className={styles["lambda-datepicker-picker-section-header"]}>
									<div className={styles["lambda-datepicker-picker-section-header"]}>
										<Button
											type="button"
											variant="text"
											color="neutral"
											size="small"
											onClick={handlePrevYears}
											aria-label={t("date-picker.close")}
											title="Previous Years"
											icon={<ChevronsLeftIcon />}
											className={clsx(styles["lambda-datepicker-nav-button"])}
										/>
										<span
											aria-label={year.toString()}
											title={year.toString()}
											style={{ cursor: "default", pointerEvents: "none" }}
											className={styles["lambda-datepicker-picker-section-header-year"]}
										>
											{year}
										</span>
										<Button
											type="button"
											variant="text"
											color="neutral"
											size="small"
											onClick={handleNextYears}
											aria-label={t("date-picker.close")}
											title="Next Years"
											icon={<ChevronsRightIcon />}
											className={clsx(styles["lambda-datepicker-nav-button"])}
										/>
									</div>
								</div>
								<div className={styles["lambda-datepicker-picker-section-years"]}>
									{Array.from({ length: 15 }, (_, i) => year - i)
										.reverse()
										.map((yearBtn) => (
											<button
												key={yearBtn}
												onClick={() => handleCloseYearPicker(yearBtn)}
												aria-label={yearBtn.toString()}
												title={yearBtn.toString()}
												className={clsx(styles["lambda-datepicker-picker-section-year"], {
													[styles["lambda-datepicker-picker-section-year-soft"]]:
														variant === "soft",
													[styles["lambda-datepicker-picker-section-year-selected"]]:
														yearBtn.toString() === year.toString(),
												})}
											>
												{yearBtn}
											</button>
										))}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		);
	};

	const handleCloseCalendar = (action: "accept" | "cancel") => {
		if (action === "accept") {
			onChange?.(value);
		} else {
			onChange?.(refTempDate.current);
			if (refTempDate.current) {
				setCurrentDate(refTempDate!.current!);
			}
		}
		setIsOpen(false);
	};

	return (
		<div className={datepickerWrapperVariants({ size, type })}>
			{type === "inline" && (
				<div className={datepickerInlineSectionVariants({ radius: radiusValue, invalid, variant })}>
					<header>
						<CalendarIcon />
						<Divider orientation="vertical" spacing={7} />
						<div>
							<span>
								{value?.toLocaleDateString(t("date-picker.code"), {
									weekday: "long",
								}) || ""}
							</span>
							<span>
								{value?.toLocaleDateString(t("date-picker.code"), {
									day: "numeric",
									month: "long",
									year: "numeric",
								}) ||
									label ||
									t("date-picker.header")}
							</span>
						</div>
						<Tooltip content={t("date-picker.reset")} color="neutral">
							<Button
								type="button"
								variant="text"
								color="neutral"
								size="small"
								onClick={handleReset}
								aria-label={t("date-picker.close")}
								icon={<RotateCcwIcon />}
								className={clsx(styles["lambda-datepicker-nav-button"])}
							/>
						</Tooltip>
					</header>
					<Calendar />
					{invalid && <InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />}
				</div>
			)}
			{(type === "dropdown" || type === "modal") && (
				<Join size={size} radius={radiusValue} ref={triggerRef as Ref<HTMLDivElement>}>
					<Input
						value={value?.toLocaleDateString(t("date-picker.code"), {
							dateStyle: displayFormat,
						})}
						label={label}
						readOnly
					/>
					<Button
						variant="subtle"
						color="neutral"
						icon={<CalendarIcon />}
						onClick={() => setIsOpen(true)}
					/>
				</Join>
			)}
			{type === "modal" && (
				<Dialog
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					children={<Calendar />}
					showCloseButton={false}
					isDraggable
					isModal
					footer={
						<div
							style={{
								display: "flex",
								width: "100%",
								justifyContent: "space-between",
							}}
						>
							<Tooltip content={t("date-picker.reset")} color="neutral">
								<Button
									type="button"
									variant="text"
									color="neutral"
									size="small"
									onClick={handleReset}
									aria-label={t("date-picker.close")}
									icon={<RotateCcwIcon />}
									className={clsx(styles["lambda-datepicker-nav-button"])}
								/>
							</Tooltip>
							<div
								style={{
									display: "flex",
									gap: "var(--gap-md)",
									justifySelf: "flex-end",
								}}
							>
								<Button
									variant="soft"
									color="neutral"
									size="small"
									label={t("date-picker.cancel")}
									onClick={() => handleCloseCalendar("cancel")}
								/>
								<Button
									variant="soft"
									color="neutral"
									size="small"
									label={t("date-picker.confirm")}
									onClick={() => handleCloseCalendar("accept")}
								/>
							</div>
						</div>
					}
				/>
			)}
			{isOpen &&
				type === "dropdown" &&
				createPortal(
					<div
						ref={contentRef as Ref<HTMLDivElement>}
						className={datepickerCalendarVariants({ type, direction: menuPosition.position })}
						style={{
							left: menuPosition.left,
							top: menuPosition.top,
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
