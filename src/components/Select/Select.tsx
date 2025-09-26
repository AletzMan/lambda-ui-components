/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, forwardRef, useRef, useEffect, useCallback, RefObject } from "react";
import ReactDOM from "react-dom";
import styles from "./select.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

import {
	buttonSelect,
	dropdown,
	labelSelect,
	select,
	selectIcon,
	selectedView,
} from "./select.variants";
import { SelectProps } from "./select.types";
import { useClickOutside } from "./hooks/useClickOutside";
import { useDropdownPlacement } from "./hooks/useDropdownPlacement";
import { useSelectAccessibility } from "./hooks/useSelectAccessibility";
import { SelectOptionItem } from "./SelectOptionItem";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { useJoin } from "../Join/Join";

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
	(
		{
			label,
			options,
			size = "medium",
			variant = "outline",
			radius,
			disabled,
			invalid,
			required,
			errorMessage,
			value,
			defaultValue,
			placeholder = "Select an option",
			onChange,
			className,
		},
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false);
		const [selectedValue, setSelectedValue] = useState<string | null | undefined>(
			defaultValue ?? value
		);
		const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
		const { radiusField } = useUIConfig();
		const { radius: joinRadius, size: joinSize } = useJoin();
		const radiusValue = joinRadius || radius || radiusField;
		const sizeValue = joinSize || size;

		const containerRef = useRef<HTMLDivElement>(null);
		const buttonRef = useRef<HTMLButtonElement>(null);
		const listRef = useRef<HTMLUListElement>(null);

		useClickOutside([containerRef, listRef], () => setIsOpen(false));

		const { direction } = useDropdownPlacement(
			buttonRef,
			listRef as RefObject<HTMLUListElement>,
			isOpen
		);

		// Controla el scroll del body
		useEffect(() => {
			if (isOpen) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "auto";
			}
			return () => {
				document.body.style.overflow = "auto";
			};
		}, [isOpen]);

		// Calcula la posición del dropdown
		useEffect(() => {
			if (isOpen && containerRef.current && listRef.current) {
				const buttonRect = containerRef.current.getBoundingClientRect();
				const listHeight = listRef.current.getBoundingClientRect().height;

				setTimeout(() => {
					let topPosition = 0;
					if (direction === "up") {
						topPosition = buttonRect.top - listHeight;
					} else if (direction === "down") {
						topPosition = buttonRect.bottom + window.scrollY;
					}
					setDropdownPosition({
						top: topPosition,
						left: buttonRect.left + window.scrollX,
						width: buttonRect.width,
					});
				}, 10);
			}
		}, [isOpen, direction, listRef.current]);

		useEffect(() => {
			if (value !== undefined && value !== selectedValue) {
				setSelectedValue(value);
			}
		}, [value, selectedValue]);

		const performOptionSelection = useCallback(
			(val: string | undefined) => {
				setSelectedValue(val);
				setIsOpen(false);
				onChange?.(val);
			},
			[onChange]
		);

		const handleButtonClick = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				if (!disabled) {
					setIsOpen((prev) => !prev);
				}
			},
			[disabled]
		);

		const handleOptionClick = useCallback(
			(val: string) => {
				performOptionSelection(val);
			},
			[performOptionSelection]
		);

		const { getButtonProps, getListboxProps, getOptionProps, getLabelProps, activeOptionId } =
			useSelectAccessibility({
				isOpen,
				options,
				selectedValue,
				onOptionSelect: performOptionSelection,
				onClose: () => setIsOpen(false),
				buttonRef,
				listRef,
			});

		const selectedOption = options.find((opt) => opt.value === selectedValue);

		return (
			<div
				className={clsx(
					[styles["select-wrapper"]],
					{ [styles["select-wrapper-disabled"]]: disabled },
					className
				)}
				ref={containerRef}
			>
				{label && (
					<label
						className={clsx(
							labelSelect({ direction, radius: radiusValue, size: sizeValue, required }),
							styles["select-label"]
						)}
						{...getLabelProps()}
					>
						{label}
					</label>
				)}
				<div
					className={select({ size: sizeValue, variant, radius: radiusValue, disabled, invalid })}
				>
					<button
						className={buttonSelect({
							size: sizeValue,
							variant,
							radius: radiusValue,
							invalid,
							disabled,
						})}
						onClick={handleButtonClick}
						disabled={disabled}
						ref={ref || buttonRef}
						{...getButtonProps()}
					>
						{selectedOption ? (
							<div className={selectedView({ size: sizeValue, disabled: disabled, variant })}>
								{selectedOption.avatar && (
									<img
										className={styles["select-view-avatar"]}
										src={selectedOption.avatar}
										alt=""
									/>
								)}
								<span className={styles["select-selected"]}>{selectedOption.label}</span>
							</div>
						) : (
							<span className={styles["select-placeholder"]}>{placeholder}</span>
						)}

						<div className={selectIcon({ variant, size: sizeValue, disabled, invalid })}>
							{isOpen ? (
								<ChevronUp className={styles["select-icon-svg"]} />
							) : (
								<ChevronDown className={styles["select-icon-svg"]} />
							)}
						</div>
					</button>
				</div>

				{isOpen &&
					ReactDOM.createPortal(
						<ul
							style={{
								top: dropdownPosition.top,
								left: dropdownPosition.left,
								width: dropdownPosition.width,
							}}
							className={clsx(
								dropdown({ size: sizeValue, direction, radius: radiusValue, variant }),
								"scrollBar",
								{
									[styles["select-dropdown-open"]]: isOpen,
								}
							)}
							ref={listRef}
							onWheel={(e) => e.stopPropagation()}
							{...getListboxProps()}
						>
							{options?.map((option, index) => (
								<SelectOptionItem
									key={option.value}
									option={option}
									activeOptionId={activeOptionId}
									selectedValue={selectedValue}
									size={sizeValue}
									onClick={handleOptionClick}
									{...getOptionProps(option, index)}
								/>
							))}
						</ul>,
						document.body
					)}

				{invalid && errorMessage && (
					<InvalidMessage errorMessage={errorMessage} invalid={invalid} size={sizeValue} />
				)}
			</div>
		);
	}
);
