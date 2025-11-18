import { useRef, useState, Ref, forwardRef } from "react";
import styles from "./datepicker.module.css";
import {
	datepickerCalendarVariants,
	datepickerCellVariants,
	datepickerContainerVariants,
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
import { usePopover } from "../../_internal/hooks/usePopover";
import { AnimatePresence, motion } from "framer-motion";
import { HelperText } from "../../_internal/components/HelperText/HelperText";

const isClient = typeof window !== "undefined";

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

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
	(
		{
			value,
			onChange,
			minDate,
			maxDate,
			disabled,
			size,
			label,
			displayFormat,
			type = "dropdown",
			radius,
			variant = "solid",
			errorMessage,
			helperText,
			invalid = false,
			isDateDisabled,
			...props
		},
		ref
	) => {
		const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
		const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
		const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
		const [direction, setDirection] = useState(0);
		const [calendarTransitionType, setCalendarTransitionType] = useState<"slide" | "fade" | "none">(
			"slide"
		);
		const year = currentDate.getFullYear();
		const [prevYear, setPrevYear] = useState(year);

		const refTempDate = useRef<Date | undefined>(value);
		const refTempYear = useRef<string>("");

		const { isOpen, setIsOpen, menuPosition, triggerRef, contentRef, handleKeyDown } = usePopover({
			y: 3,
		});
		const { radiusField } = useUIConfig();
		const radiusValue = radius || radiusField;

		const { t } = useTranslation();

		const selectedDate = value ? new Date(value) : undefined;

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
		const handlePrevMonth = (e: React.MouseEvent) => {
			e.preventDefault();
			setDirection(-1);
			setCalendarTransitionType("slide");
			setCurrentDate((prev) => {
				const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
				return prevMonth;
			});
		};
		const handleNextMonth = (e: React.MouseEvent) => {
			e.preventDefault();
			setDirection(1);
			setCalendarTransitionType("slide");
			setCurrentDate((prev) => {
				const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
				return nextMonth;
			});
		};

		const handlePrevYear = (e: React.MouseEvent) => {
			e.preventDefault();
			setDirection(-1);
			setPrevYear(year);
			setCalendarTransitionType("slide");
			refTempYear.current = "prev";
			setCurrentDate((prev) => {
				const prevYear = new Date(prev.getFullYear() - 1, prev.getMonth(), 1);
				return prevYear;
			});
		};

		const handleNextYear = (e: React.MouseEvent) => {
			e.preventDefault();
			setDirection(1);
			setPrevYear(year);
			setCalendarTransitionType("slide");
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

		const handleReset = (e: React.MouseEvent) => {
			e.preventDefault();
			setCurrentDate(value ? new Date(value) : new Date());
			refTempDate.current = value;
			setIsMonthPickerOpen(false);
			setIsYearPickerOpen(false);
			refTempYear.current = "";
			setCalendarTransitionType("none");
			onChange?.(undefined);
		};

		const handleCloseMonthPicker = (e: React.MouseEvent, month: number) => {
			e.preventDefault();
			setIsMonthPickerOpen(false);
			setCurrentDate((prev) => {
				const nextMonth = new Date(prev.getFullYear(), month, 1);
				return nextMonth;
			});
		};

		const handleCloseYearPicker = (e: React.MouseEvent, year: number) => {
			e.preventDefault();
			setIsYearPickerOpen(false);
			setCurrentDate((prev) => {
				const nextYear = new Date(year, prev.getMonth(), 1);
				return nextYear;
			});
		};

		const handlePrevYears = (e: React.MouseEvent) => {
			e.preventDefault();
			refTempYear.current = "prev";
			setCurrentDate((prev) => {
				const prevYear = new Date(prev.getFullYear() - 15, prev.getMonth(), 1);
				return prevYear;
			});
		};

		const handleNextYears = (e: React.MouseEvent) => {
			e.preventDefault();
			refTempYear.current = "next";
			setCurrentDate((prev) => {
				const nextYear = new Date(prev.getFullYear() + 15, prev.getMonth(), 1);
				return nextYear;
			});
		};

		const Calendar = () => {
			return (
				<div
					ref={ref}
					{...props}
					className={datepickerVariants({ size, radius: radiusValue, variant, type, invalid })}
				>
					<header className={styles["lambda-datepicker-header"]}>
						<Tooltip content={t("date-picker.prev-year")} color="neutral">
							<Button
								type="button"
								variant="text"
								color="neutral"
								title="Previous Year"
								size="tiny"
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
								size="tiny"
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
							size="tiny"
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
								size="tiny"
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
								size="tiny"
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
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={`${month}-${year}-${calendarTransitionType}`}
							variants={
								calendarTransitionType === "slide"
									? {
											enter: (dir: number) => ({
												x: dir > 0 ? 100 : -100,
												opacity: 0,
												position: "absolute",
											}),
											center: {
												x: 0,
												opacity: 1,
												position: "relative",
											},
											exit: (dir: number) => ({
												x: dir > 0 ? -100 : 100,
												opacity: 0,
												position: "absolute",
											}),
									  }
									: calendarTransitionType === "fade"
									? {
											enter: { opacity: 0 },
											center: { opacity: 1 },
											exit: { opacity: 0 },
									  }
									: {
											enter: { opacity: 1 },
											center: { opacity: 1 },
											exit: { opacity: 1 },
									  }
							}
							initial="enter"
							animate="center"
							exit="exit"
							custom={direction}
							transition={{
								x: { type: "spring", stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 },
							}}
							style={{ width: "100%" }}
						>
							<div className={styles["lambda-datepicker-grid"]}>
								{days.map((date, idx) => {
									if (date?.type === "prev" || date?.type === "next") {
										return (
											<span
												key={idx}
												className={datepickerCellVariants({ type, size, month: false })}
											>
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
											onClick={() => {
												setCalendarTransitionType("none");
												if (!outOfRange) onChange?.(date!.date);
											}}
											disabled={outOfRange}
										>
											{date!.date.getDate()}
										</button>
									);
								})}
							</div>
						</motion.div>
					</AnimatePresence>
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
									<YearDigitsAnimated year={year} prevYear={prevYear} />
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
											onClick={(e) => handleCloseMonthPicker(e, i)}
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
												className={styles["lambda-datepicker-picker-section-header-year"]}
												style={{ cursor: "default", pointerEvents: "none" }}
											>
												<YearDigitsAnimated year={year} prevYear={prevYear} />
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
													onClick={(e) => handleCloseYearPicker(e, yearBtn)}
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

		const handleCloseCalendar = (e: React.MouseEvent, action: "accept" | "cancel") => {
			e.preventDefault();
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
			<div className={datepickerWrapperVariants({ size, type, hasLabel: label !== undefined })}>
				{type === "inline" && (
					<div
						className={datepickerInlineSectionVariants({ radius: radiusValue, invalid, variant })}
					>
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
						{invalid && (
							<InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />
						)}
					</div>
				)}
				{(type === "dropdown" || type === "modal") && (
					<div className={datepickerContainerVariants({ invalid })}>
						<Join size={size} radius={radiusValue} ref={triggerRef as Ref<HTMLDivElement>}>
							<Input
								value={value?.toLocaleDateString(t("date-picker.code"), {
									dateStyle: displayFormat,
								})}
								variant={variant === "solid" ? "outline" : variant}
								placeholder={t("date-picker.placeholder")}
								label={label}
								readOnly
							/>
							<Button
								variant={variant === "solid" ? "outline" : variant}
								color="neutral"
								icon={<CalendarIcon />}
								onClick={(e) => {
									e.preventDefault();
									setIsOpen(true);
								}}
							/>
						</Join>
					</div>
				)}
				{errorMessage && invalid && (
					<InvalidMessage errorMessage={errorMessage} invalid={invalid} size={size} />
				)}
				{helperText && <HelperText text={helperText} />}
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
										onClick={(e) => handleCloseCalendar(e, "cancel")}
									/>
									<Button
										variant="soft"
										color="neutral"
										size="small"
										label={t("date-picker.confirm")}
										onClick={(e) => handleCloseCalendar(e, "accept")}
									/>
								</div>
							</div>
						}
					/>
				)}
				{isClient &&
					createPortal(
						<AnimatePresence mode="wait">
							{isOpen && type === "dropdown" && (
								<motion.div
									initial={
										menuPosition.position === "above"
											? { opacity: 0, y: 16, zIndex: -1 } // arriba → viene de abajo
											: { opacity: 0, y: -16, zIndex: -1 } // abajo → viene de arriba
									}
									animate={{
										opacity: 1,
										y: 0,
										zIndex: 9999,
									}}
									exit={
										menuPosition.position === "above"
											? { opacity: 0, y: 16, zIndex: -1 } // arriba → sigue subiendo
											: { opacity: 0, y: -16, zIndex: -1 } // abajo → sigue bajando
									}
									transition={{ type: "spring", stiffness: 300, damping: 24 }}
									ref={contentRef as Ref<HTMLDivElement>}
									className={datepickerCalendarVariants({ type, direction: menuPosition.position })}
									style={{
										left: menuPosition.left,
										top: menuPosition.top,
										zIndex: 9999,
									}}
									tabIndex={0}
									onKeyDown={handleKeyDown}
								>
									<Calendar />
								</motion.div>
							)}
						</AnimatePresence>,
						document.body
					)}
			</div>
		);
	}
);

const YearDigitsAnimated = ({ year, prevYear }: { year: number; prevYear: number }) => {
	return (
		<span className={styles["lambda-datepicker-year-digits"]}>
			{year
				.toString()
				.padStart(4, "0")
				.split("")
				.map((digit, idx) => {
					const prevYearStr = prevYear.toString().padStart(4, "0");
					const prevDigit = prevYearStr[idx];
					let digitDirection = 0;
					let didChange = prevDigit !== undefined && prevDigit !== digit;
					if (didChange) {
						digitDirection = Number(digit) > Number(prevDigit) ? 1 : -1;
					}
					return (
						<span key={`digit-${idx}`} className={styles["lambda-datepicker-year-digit"]}>
							{didChange ? (
								<motion.span
									key={digit + year}
									custom={digitDirection}
									variants={{
										initial: (direction: number) => ({
											y: direction > 0 ? "100%" : "-100%",
											opacity: 0,
											position: "absolute",
											left: 0,
											right: 0,
										}),
										animate: {
											y: "0%",
											opacity: 1,
											position: "absolute",
											left: 0,
											right: 0,
											transition: { duration: 0.25 },
										},
										exit: (direction: number) => ({
											y: direction > 0 ? "-100%" : "100%",
											opacity: 0,
											position: "absolute",
											left: 0,
											right: 0,
											transition: { duration: 0.25 },
										}),
									}}
									initial="initial"
									animate="animate"
									exit="exit"
									style={{ position: "absolute", width: "100%" }}
								>
									{digit}
								</motion.span>
							) : (
								<span className={styles["lambda-datepicker-year-digit-inner"]}>{digit}</span>
							)}
						</span>
					);
				})}
		</span>
	);
};
