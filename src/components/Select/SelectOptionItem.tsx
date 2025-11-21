// src/components/Select/SelectOptionItem.tsx

import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { IListCollection, SelectProps } from "./select.types";
import { selectedViewVariants, selectOptionVariants, textContentVariants } from "./select.variants";

import styles from "./select.module.css";

interface SelectOptionItemProps {
	option: IListCollection;
	selectedValue?: string | null;
	size?: SelectProps["size"];
	id?: string;
	role?: string;
	"aria-selected"?: boolean;
	isActive?: boolean;
	highlightedIndex?: number;

	onClick: (value: string) => void; // Handler click de la opción
}

export const SelectOptionItem: React.FC<SelectOptionItemProps> = ({
	option,
	selectedValue,
	size,
	id,
	role,
	"aria-selected": ariaSelected,
	isActive,
	onClick,
	highlightedIndex,
}) => {
	const isSelected = selectedValue === option.value;

	const handleClick = () => {
		onClick(option.value);
	};

	return (
		<li
			id={id}
			role={role}
			aria-selected={ariaSelected}
			className={clsx(selectOptionVariants({ size, selected: isSelected, active: isActive }))}
			onClick={handleClick}
			tabIndex={highlightedIndex}
			data-navigable="true"
		>
			<div className={clsx(selectedViewVariants({ size, selected: isSelected }))}>
				{option.avatar && (
					<img className={styles["select-view-avatar"]} src={option?.avatar} alt="" />
				)}
				<div className={clsx(textContentVariants({ size }))}>
					<div className={styles["select-view-label"]}>{option.label}</div>
					{option.description && (
						<p className={styles["select-view-description"]}>{option.description}</p>
					)}
				</div>
			</div>
			{isSelected && <Check className={styles["select-icon-check"]} />}
		</li>
	);
};
