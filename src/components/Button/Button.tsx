import { ReactNode, forwardRef, isValidElement } from "react";
import styles from "./button.module.css";
import { Loader } from "lucide-react";
import clsx from "clsx";
import { useInputGroup } from "../InputGroup/InputGroup";
import { button } from "./button.variants";
import { ButtonProps } from "./button.types";
import { useUIConfig } from "../../_internal/hooks/translation/LambdaConfigProvider";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			color,
			size,
			radius,
			block,
			isCircle,
			icon,
			label,
			iconPosition,
			loadingText,
			loading,
			...props
		},
		ref
	) => {
		const { radiusField } = useUIConfig();
		const radiusValue = radius || radiusField;
		let contextSize, contextDisabled;
		try {
			const context = useInputGroup();
			contextSize = context.size;
			contextDisabled = context.disabled;
		} catch (_e) {
			contextSize = size;
			contextDisabled = props.disabled;
		}

		const content =
			props.children ||
			(label && (
				<span className={styles["lambda-btn-label"]}>
					{loading && loadingText ? loadingText : label}
				</span>
			));

		return (
			<button
				ref={ref}
				aria-label={props["aria-label"]}
				aria-busy={loading ? true : undefined}
				className={clsx(
					button({
						variant,
						size: contextSize,
						color,
						disabled: contextDisabled,
						radius: radiusValue,
						loading,
						iconPosition,
						block,
						isCircle,
						className,
					}),
					{
						[styles["lambda-btn-only-icon"]]: !(isValidElement<ReactNode>(props.children) || label),
					}
				)}
				disabled={contextDisabled || undefined}
				{...props}
			>
				{(icon || loading) && (
					<span
						className={clsx(styles["lambda-btn-icon"], {
							[styles["lambda-btn-icon-only"]]: !label,
						})}
					>
						{loading ? <Loader className={styles["lambda-btn-icon-loading"]} /> : icon}
					</span>
				)}
				{content}
			</button>
		);
	}
);
