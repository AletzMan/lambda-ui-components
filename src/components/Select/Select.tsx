/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, forwardRef, useEffect, useCallback, RefObject } from "react";
import ReactDOM from "react-dom";
import styles from "./select.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

import {
	selectBtnVariants,
	selectDropdownVariants,
	labelSelectVariants,
	selectContainerVariants,
	selectIconVariants,
	selectedViewVariants,
} from "./select.variants";
import { SelectProps } from "./select.types";
import { SelectOptionItem } from "./SelectOptionItem";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";
import { useJoin } from "../Join/Join";
import { usePopover } from "../../_internal/hooks/usePopover";

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
		const {
			isOpen,
			setIsOpen,
			contentRef,
			triggerRef,
			menuPosition,
			handleKeyDown,
			selectedOptionIndex,
		} = usePopover();
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

		const selectedOption = options.find((opt) => opt.value === selectedValue);

		useEffect(() => {
			if (value !== undefined && value !== selectedValue) {
				setSelectedValue(value);
			}
		}, [value, selectedValue]);

		useEffect(() => {
			if (selectedOptionIndex !== null) {
				const selected = options[selectedOptionIndex];
				setSelectedValue(selected?.value);
			}
		}, [selectedOptionIndex]);

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
						aria-label="ComponentLabel"
						className={clsx(
							labelSelectVariants({
								direction: menuPosition.position,
								radius: radiusValue,
								size: sizeValue,
								required,
							}),
							styles["select-label"]
						)}
					>
						{label}
					</label>
				)}
				<div
					className={selectContainerVariants({
						size: sizeValue,
						variant,
						radius: radiusValue,
						disabled,
						invalid,
					})}
				>
					<button
						className={selectBtnVariants({
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
					>
						{selectedOption ? (
							<div
								className={selectedViewVariants({ size: sizeValue, disabled: disabled, variant })}
							>
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

						<div className={selectIconVariants({ variant, size: sizeValue, disabled, invalid })}>
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
								selectDropdownVariants({
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
							tabIndex={0}
							ref={contentRef as RefObject<HTMLUListElement>}
							onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLUListElement>)}
						>
							{options?.map((option) => (
								<SelectOptionItem
									key={option.value}
									option={option}
									selectedValue={selectedValue}
									size={sizeValue}
									onClick={handleOptionClick}
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
