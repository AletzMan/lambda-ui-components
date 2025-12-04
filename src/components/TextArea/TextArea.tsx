import { forwardRef, FocusEvent, useId } from "react";
import styles from "./textArea.module.css";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import clsx from "clsx";
import { CircleX } from "lucide-react";
import { HelperText } from "../../_internal/components/HelperText/HelperText";
import { labelStringVariants, textareaVariants } from "./textarea.variants";
import { TextAreaProps } from "./textarea.types";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			className,
			variant = "outline",
			size = "medium",
			radius,
			invalid = false,
			disabled = false,
			label,
			errorMessage,
			onFocus,
			onBlur,
			helperText,
			required = false,
			...props
		},
		ref
	) => {

		const textareaId = useId();
		const errorId = errorMessage && invalid ? `${textareaId}-error` : undefined;
		const helperId = helperText && !invalid ? `${textareaId}-helper` : undefined;

		const describedByIds = [errorId, helperId].filter(Boolean).join(" ");

		const handleOnFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
			if (onFocus) {
				onFocus(e);
			}
		};

		const handleOnBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
			if (onBlur) {
				onBlur(e);
			}
		};

		return (
			<div
				className={clsx(styles["lambda-textarea-wrapper"], {
					[styles["lambda-textarea-wrapper-disabled"]]: disabled,
				})}
			>
				{label && (
					<label
						className={clsx(labelStringVariants({ disabled, radius, size }), {
							[styles["lambda-textarea-label-required"]]: required,
						})}
						htmlFor={textareaId}
					>
						{label}
					</label>
				)}
				<textarea
					className={clsx(
						"scrollBar",
						textareaVariants({
							variant,
							radius,
							className,
							size,
							invalid,
							disabled,
						})
					)}
					ref={ref}
					id={textareaId}
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
					aria-invalid={invalid || undefined}
					aria-describedby={describedByIds || undefined}
					disabled={disabled || undefined}
					{...props}
				/>
				{invalid && (
					<CircleX
						className={clsx(styles["lambda-textarea-invalid-icon"], {
							[styles["lambda-textarea-invalid-icon-whitlabel"]]: label,
						})}
					/>
				)}
				{helperText && !invalid && (
					<HelperText id={helperId} text={helperText} size={size} disabled={disabled} />
				)}
				{invalid && errorMessage && (
					<InvalidMessage id={errorId} errorMessage={errorMessage} invalid={invalid} size={size} />
				)}
			</div>
		);
	}
);
