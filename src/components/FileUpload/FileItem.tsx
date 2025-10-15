import { MouseEvent } from "react";
import clsx from "clsx";
import { FileItemVariants, fileItem } from "./file-upload.variants";
import styles from "./file-upload.module.css";
import { FileImage, Trash2 } from "lucide-react";
import { SelectedFileData } from "./file-upload-types";
import { formatBytes, getIconOfFile } from "../../_util/helpers";
import { Tooltip } from "../ToolTip/ToolTip";

interface FileItemProps extends FileItemVariants {
	fileData: SelectedFileData;
	onRemove: (id: string) => void;
	viewFileSize: boolean;
	type: "dropzone" | "button";
	multiple?: boolean;
	displayMode?: "list" | "thumbnail";
}

export const FileItem = ({
	fileData,
	onRemove,
	size,
	invalid,
	viewFileSize,
	type,
	multiple,
	displayMode,
}: FileItemProps) => {
	const isImage = fileData.file.type.startsWith("image/");

	const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onRemove(fileData.id);
	};

	const getFileIcon = () => {
		if (isImage) {
			return fileData.previewUrl ? (
				<img
					src={fileData.previewUrl}
					alt={`Preview of ${fileData.file.name}`}
					className={styles["lambda-fileup-file-item-preview"]}
				/>
			) : (
				<FileImage className={styles["lambda-fileup-file-item-icon"]} />
			);
		}
		return getIconOfFile(fileData.file);
	};

	return (
		<>
			{type === "button" || displayMode === "list" || (type === "dropzone" && !multiple) ? (
				<li
					key={fileData.id}
					className={clsx(fileItem({ size, invalid, isImage, type, displayMode }))}
				>
					{/* Icono o previsualización */}
					<div className={styles["lambda-fileup-file-item-icon-container"]}>{getFileIcon()}</div>

					{/* Información del archivo */}
					<div className={styles["lambda-fileup-file-item-info"]}>
						<span className={styles["lambda-fileup-file-item-name"]}>{fileData.file.name}</span>
						{viewFileSize && (
							<span className={styles["lambda-fileup-file-item-size"]}>
								{formatBytes(fileData.file.size)}
							</span>
						)}
					</div>

					<button
						type="button"
						onClick={handleRemoveClick}
						className={styles["lambda-fileup-file-item-remove-button"]}
						aria-label={`Remover archivo ${fileData.file.name}`}
					>
						<Trash2 className={styles["lambda-fileup-file-item-remove-icon"]} />
					</button>
				</li>
			) : (
				(type === "dropzone" && !multiple) ||
				(displayMode === "thumbnail" && (
					<li
						key={fileData.id}
						className={clsx(fileItem({ size, invalid, isImage, type, displayMode }))}
					>
						<Tooltip content={fileData.file.name} color="neutral">
							<div className={styles["lambda-fileup-file-item-container"]}>
								<header className={styles["lambda-fileup-file-item-container-header"]}>
									<span className={styles["lambda-fileup-file-item-container-name"]}>
										{fileData.file.name}
									</span>
									<button
										type="button"
										onClick={handleRemoveClick}
										className={clsx(
											styles["lambda-fileup-file-item-remove-button"],
											styles["lambda-fileup-file-item-remove-button-thumbnail"]
										)}
										aria-label={`Remover archivo ${fileData.file.name}`}
									>
										<Trash2 className={styles["lambda-fileup-file-item-remove-icon"]} />
									</button>
								</header>
								<picture className={styles["lambda-fileup-file-item-picture"]}>
									{isImage ? (
										<img
											src={fileData.previewUrl}
											alt={`Preview of ${fileData.file.name}`}
											className={styles["lambda-fileup-file-item-thumbnail"]}
										/>
									) : (
										<div className={styles["lambda-fileup-file-item-preview"]}>{getFileIcon()}</div>
									)}
								</picture>
								<footer className={styles["lambda-fileup-file-item-container-footer"]}>
									{viewFileSize && (
										<span className={styles["lambda-fileup-file-item-size"]}>
											{formatBytes(fileData.file.size)}
										</span>
									)}
								</footer>
							</div>
						</Tooltip>
					</li>
				))
			)}
		</>
	);
};
