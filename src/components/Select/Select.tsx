import React, { useState, forwardRef, useEffect, useCallback, RefObject, useContext } from "react";
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
	selectWrapper,
} from "./select.variants";
import { SelectProps } from "./select.types";
import { SelectOptionItem } from "./SelectOptionItem";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { JoinContext } from "../Join/Join";
import { usePopover } from "../../_internal/hooks/usePopover";
import { HelperText } from "../../_internal/components/HelperText/HelperText";

// Utility to merge refs
const useMergeRefs = <T,>(...refs: (React.Ref<T> | undefined)[]) => {
	return (node: T) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(node);
			} else if (ref != null) {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
};

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
			onBlur,
			name,
			helperText,
			className,
			color = "primary",
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
			highlightedIndex,
			handleKeyDown,
		} = usePopover();

		// Merge external ref with triggerRef so RHF can focus the button and Popover can position itself
		const mergedRef = useMergeRefs(triggerRef, ref);

		const joinContext = useContext(JoinContext);
		let sizeValue = size;
		let radiusValue = radius;
		let disabledValue = disabled;

		if (joinContext) {
			sizeValue = joinContext.size || size;
			radiusValue = joinContext.radius || radius;
			disabledValue = joinContext.disabled || disabled;
		}

		const selectedOption = options.find((opt) => opt.value === selectedValue);

		useEffect(() => {
			// If controlled value changes, update internal state
			if (value !== undefined) {
				setSelectedValue(value);
			}
		}, [value]);

		const performOptionSelection = useCallback(
			(val: string | undefined) => {
				const isControlled = value !== undefined;
				if (!isControlled) {
					setSelectedValue(val);
				}
				setIsOpen(false);
				onChange?.(val);
			},
			[onChange, value, setIsOpen]
		);

		const handleButtonClick = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				if (!disabledValue) {
					setIsOpen((prev) => !prev);
				}
			},
			[disabledValue, setIsOpen]
		);

		const handleOptionClick = useCallback(
			(val: string) => {
				performOptionSelection(val);
			},
			[performOptionSelection]
		);

		return (
			<div
				className={clsx(selectWrapper({ variant, disabled: disabledValue, color }), className)}
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
						disabled: disabledValue,
						invalid,
						color,
					})}
				>
					<button
						name={name}
						onBlur={onBlur}
						ref={mergedRef}
						className={selectBtnVariants({
							size: sizeValue,
							variant,
							radius: radiusValue,
							invalid,
							disabled: disabledValue,
							joinposition: props!.joinposition,
							color,
						})}
						onClick={handleButtonClick}
						onKeyDown={handleKeyDown}
						disabled={disabledValue}
						type="button" // Prevent form submission
					>
						{selectedOption ? (
							<div
								className={selectedViewVariants({ size: sizeValue, disabled: disabledValue, variant })}
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

						<div className={selectIconVariants({ variant, size: sizeValue, disabled: disabledValue, invalid, color })}>
							{isOpen ? (
								<ChevronUp className={styles["select-icon-svg"]} />
							) : (
								<ChevronDown className={styles["select-icon-svg"]} />
							)}
						</div>
					</button>
					{helperText && <HelperText text={helperText} size={sizeValue} />}
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
									color,
								}),
								"scrollBar",
								{
									[styles["select-dropdown-open"]]: isOpen,
								}
							)}
							ref={contentRef as RefObject<HTMLUListElement>}
							onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLUListElement>)}
						>
							{options?.map((option, index) => (
								<SelectOptionItem
									key={option.value}
									option={option}
									selectedValue={selectedValue}
									size={sizeValue}
									isActive={highlightedIndex === index}
									onClick={handleOptionClick}
									highlightedIndex={highlightedIndex}
									color={color}
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
