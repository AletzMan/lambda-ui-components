/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, forwardRef, useEffect, useCallback, RefObject } from "react";
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
import { useSelectAccessibility } from "./hooks/useSelectAccessibility";
import { SelectOptionItem } from "./SelectOptionItem";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { useJoin } from "../Join/Join";
import { usePopover } from "../../_internal/hooks/translation/usePopover/usePopover";

export const Select = forwardRef<HTMLDivElement, SelectProps>(
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
			...props
		},
		ref
	) => {
		const [selectedValue, setSelectedValue] = useState<string | null | undefined>(
			defaultValue ?? value
		);
		const { isOpen, setIsOpen, contentRef, triggerRef, menuPosition } = usePopover();
		const { radiusField } = useUIConfig();
		let sizeValue, radiusValue;

		try {
			const { radius: joinRadius, size: joinSize } = useJoin();
			radiusValue = joinRadius || radius;
			sizeValue = joinSize;
		} catch (error) {
			radiusValue = radius || radiusField;
			sizeValue = size;
		}

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
				buttonRef: triggerRef as RefObject<HTMLButtonElement>,
				listRef: contentRef as RefObject<HTMLUListElement>,
			});

		const selectedOption = options.find((opt) => opt.value === selectedValue);

		return (
			<div
				className={clsx(
					[styles["select-wrapper"]],
					{ [styles["select-wrapper-disabled"]]: disabled },
					className
				)}
				ref={ref || (triggerRef as RefObject<HTMLDivElement>)}
				{...props}
			>
				{label && (
					<label
						className={clsx(
							labelSelect({
								direction: menuPosition.position,
								radius: radiusValue,
								size: sizeValue,
								required,
							}),
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
							joinposition: props!.joinposition,
						})}
						onClick={handleButtonClick}
						disabled={disabled}
						ref={triggerRef as RefObject<HTMLButtonElement>}
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
								top: menuPosition.top,
								left: menuPosition.left,
								width: menuPosition.width,
							}}
							className={clsx(
								dropdown({
									size: sizeValue,
									direction: menuPosition.position,
									radius: radiusValue,
									variant,
								}),
								"scrollBar",
								{
									[styles["select-dropdown-open"]]: isOpen,
								}
							)}
							ref={contentRef as RefObject<HTMLUListElement>}
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
