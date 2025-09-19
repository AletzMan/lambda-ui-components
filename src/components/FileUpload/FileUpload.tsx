/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, forwardRef, useRef, useCallback, useId, RefObject } from "react";
import clsx from "clsx";
import { UploadCloudIcon, XCircleIcon, ImageIcon } from "lucide-react";
import {
	fileUploadWrapper,
	dropZone,
	labelFileUpload,
	fileList,
	buttonFileUpload,
	buttonFilePreview,
	fileUploadLayout,
} from "./file-upload.variants";
import { useImagePreviews } from "./hooks/useImagePreviews";
import { FileItem } from "./FileItem";
import styles from "./file-upload.module.css";
import { FileUploadProps, SelectedFileData } from "./file-upload-types";
import { InvalidMessage } from "../../_internal/components/InvalidMessage/InvalidMessage";
import { HelperText } from "../../_internal/components/HelperText/HelperText";
import { formatBytes } from "../../_util/helpers";
import {
	useTranslation,
	useUIConfig,
} from "../../_internal/hooks/translation/LambdaConfigProvider";

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
	(
		{
			className,
			type = "dropzone",
			label,
			size = "medium",
			disabled = false,
			invalid = false,
			required = false,
			errorMessage,
			helperText,
			multiple = false,
			maxSize,
			accept,
			onChange,
			onFocus,
			onBlur,
			onDragOver: onDragOverProp,
			onDragLeave: onDragLeaveProp,
			onDrop: onDropProp,
			name,
			viewFileSize = false,
			onFilesRejected,
			...props
		},
		ref
	) => {
		// Estado interno para los archivos seleccionados (SelectedFileData[])
		const [internalSelectedFiles, setInternalSelectedFiles] = useState<SelectedFileData[]>([]);
		// Estado para efecto visual de arrastrar (solo para type="dropzone")
		const [isDragging, setIsDragging] = useState(false);
		// Estado para foco (para helperText/estilos)
		const [focused, setFocused] = useState(false);
		const { t } = useTranslation();
		const { radiusBox } = useUIConfig();

		// Refs para elementos DOM
		const fileInputRef = useRef<HTMLInputElement>(null);
		const dropZoneRef = useRef<HTMLDivElement>(null);
		const buttonRef = useRef<HTMLButtonElement>(null);

		// IDs para Accesibilidad: Generar IDs únicos para el componente y sus partes
		const componentId = useId();
		const labelId = label ? `lambda-file-upload-label-${componentId}` : undefined;
		const inputId = `lambda-file-upload-input-${componentId}`;
		const errorId = errorMessage && invalid ? `lambda-file-upload-error-${componentId}` : undefined;
		const helperId = helperText ? `lambda-file-upload-helper-${componentId}` : undefined;
		// Construir la cadena de IDs para aria-describedby (asocia input con mensajes)
		const describedByIds = [errorId, helperId].filter(Boolean).join(" ");

		// Callback Ref Interno: Pasa el ref del DOM tanto a nuestro ref local como al ref del padre
		const internalRefCallback = useCallback(
			(node: HTMLInputElement | null) => {
				fileInputRef.current = node;
				if (typeof ref === "function") {
					ref(node);
				} else if (ref) {
					(ref as RefObject<HTMLInputElement | null>).current = node;
				}
			},
			[ref]
		);

		// Hook para Previsualización: Recibe el estado de archivos seleccionados y añade previewUrl
		const selectedFilesData = useImagePreviews(internalSelectedFiles);

		// --- Lógica de validación de tipo de archivo contra la prop 'accept' ---
		// Helper para verificar si un archivo coincide con la cadena accept y validar el tamaño del archivo
		const isValidFileType = useCallback((file: File, acceptString: string): boolean => {
			if (!acceptString) return true;

			const acceptedTypes = acceptString.split(",").map((type) => type.trim().toLowerCase());
			const fileType = file.type.toLowerCase();
			const fileName = file.name.toLowerCase();
			const fileSize = file.size;
			// Obtener la extensión con punto. Si no hay punto, la extensión es vacía.
			const lastDotIndex = fileName.lastIndexOf(".");
			const fileExtension = lastDotIndex > -1 ? fileName.slice(lastDotIndex) : "";
			if (maxSize && fileSize > maxSize) {
				return false; // Si el tamaño excede el máximo, no es válido
			}

			return acceptedTypes.some((acceptedType) => {
				if (acceptedType.startsWith(".")) {
					return fileExtension === acceptedType;
				} else if (acceptedType.endsWith("/*")) {
					const mimeTypePrefix = acceptedType.slice(0, -1);
					return fileType.startsWith(mimeTypePrefix);
				} else {
					return fileType === acceptedType;
				}
			});
		}, []);

		// Handler para el cambio en el input nativo (click o arrastrar)
		const handleFileChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				const files = event.target.files;
				const filesArray: File[] = files ? Array.from(files) : [];

				const filesToProcess: File[] = [];
				const rejectedFiles: File[] = [];

				// --- FILTRAR ARCHIVOS INVALIDOS según la prop 'accept' ---
				filesArray.forEach((file) => {
					if (!accept || isValidFileType(file, accept)) {
						filesToProcess.push(file);
					} else {
						rejectedFiles.push(file);
					}
				});

				// Si se rechazaron archivos, notificar al padre (si la prop onFilesRejected existe)
				if (rejectedFiles.length > 0) {
					onFilesRejected?.(rejectedFiles);
				}

				let newSelectedFilesData: SelectedFileData[] = [];

				if (multiple) {
					// Si multiple=true, combinar los nuevos archivos ACEPTADOS con los ya seleccionados
					newSelectedFilesData = [...internalSelectedFiles];

					filesToProcess.forEach((file) => {
						const isDuplicate = newSelectedFilesData.some(
							(item) => item.file.name === file.name && item.file.size === file.size
						);
						if (!isDuplicate) {
							newSelectedFilesData.push({
								file: file,
								id: `${Date.now()}-${file.name}-${Math.random().toString(36).slice(2, 9)}`,
								previewUrl: undefined,
							});
						}
					});
				} else {
					// Si multiple=false, siempre reemplazar con el primer archivo ACEPTADO de la nueva selección
					if (filesToProcess.length > 0) {
						newSelectedFilesData = [
							{
								file: filesToProcess[0],
								id: `${Date.now()}-${filesToProcess[0].name}-${Math.random()
									.toString(36)
									.slice(2, 9)}`,
								previewUrl: undefined,
							},
						];
					} else {
						newSelectedFilesData = [];
					}
				}
				setInternalSelectedFiles(newSelectedFilesData);
				onChange?.(event);
				if (event.target) {
					event.target.value = "";
				}
			},
			[multiple, onChange, internalSelectedFiles, accept, isValidFileType, onFilesRejected]
		);

		// Handler para el click en el área interactiva (drop zone o botón)
		const handleInteractiveAreaClick = useCallback(() => {
			fileInputRef.current?.click();
		}, []);

		// Handlers para Drag and Drop (solo activos y aplicados si type="dropzone")
		const handleDragOver = useCallback(
			(event: React.DragEvent<HTMLElement>) => {
				if (type !== "dropzone" || disabled) return;
				event.preventDefault();
				event.stopPropagation();
				event.dataTransfer.dropEffect = "copy";
				setIsDragging(true);
				onDragOverProp?.(event);
			},
			[type, disabled, onDragOverProp]
		);

		const handleDragLeave = useCallback(
			(event: React.DragEvent<HTMLElement>) => {
				if (type !== "dropzone" || disabled) return;
				event.preventDefault();
				event.stopPropagation();
				// Comprueba si el ratón realmente salió del drop zone (evita flickering con elementos hijos)
				const relatedTarget = event.relatedTarget as Node | null;
				if (dropZoneRef.current && !dropZoneRef.current.contains(relatedTarget)) {
					setIsDragging(false);
				}
				onDragLeaveProp?.(event);
			},
			[type, disabled, onDragLeaveProp]
		);

		const handleDrop = useCallback(
			(event: React.DragEvent<HTMLElement>) => {
				if (type !== "dropzone" || disabled) return;
				event.preventDefault();
				event.stopPropagation();
				setIsDragging(false);
				const files = event.dataTransfer.files;
				// Crea un evento sintético para pasar a handleFileChange, simulando la selección del input nativo
				const syntheticChangeEvent = {
					target: { files: files, value: "" },
				} as React.ChangeEvent<HTMLInputElement>;
				handleFileChange(syntheticChangeEvent);
				onDropProp?.(event);
			},
			[type, disabled, handleFileChange, onDropProp]
		);

		// Handlers de Foco (para estilos y helper text)
		const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
			setFocused(true);
			onFocus?.(e as React.FocusEvent<HTMLInputElement>);
		};

		const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
			setFocused(false);
			onBlur?.(e as React.FocusEvent<HTMLInputElement>);
		};

		// Handler para remover item de la lista / o el único archivo
		const handleRemoveFile = useCallback(
			(idToRemove: string) => {
				// Filtra el array del estado para remover el archivo con el ID que coincide
				const newSelectedFilesData = internalSelectedFiles.filter((item) => item.id !== idToRemove);
				setInternalSelectedFiles(newSelectedFilesData);
				// ToDo (Opcional): llamar onChange para notificar al padre que un archivo fue removido
			},
			[internalSelectedFiles]
		);

		let interactiveContentJSX = null;
		const hasFiles = selectedFilesData.length > 0;
		const isSingleFile = selectedFilesData.length === 1 && !multiple;
		const isSingleImage = isSingleFile && selectedFilesData[0].file.type.startsWith("image/");
		const singleFileData = isSingleFile ? selectedFilesData[0] : undefined;

		if (type === "dropzone") {
			// Contenido del Drop Zone: Placeholder, Preview Grande, o Contador
			if (!hasFiles) {
				// Dropzone vacío: ícono + placeholder
				interactiveContentJSX = (
					<>
						<UploadCloudIcon className={styles["lambda-file-upload-drop-zone-icon"]} />
						<span className={styles["lambda-file-upload-drop-zone-placeholder"]}>
							{t("file-upload.drop-zone-placeholder")}
						</span>
						<span className={styles["lambda-file-upload-drop-zone-max-size"]}>
							{maxSize ? t("file-upload.max-size", { maxSize: formatBytes(maxSize) }) : ""}
						</span>
					</>
				);
			} else if (isSingleImage) {
				// Dropzone con una sola imagen: previsualización GRANDE
				interactiveContentJSX = (
					<div className={styles["lambda-file-upload-drop-zone-single-image-preview-container"]}>
						{singleFileData?.previewUrl ? (
							<img
								src={singleFileData.previewUrl}
								alt={`Preview of ${singleFileData.file.name}`}
								className={styles["lambda-file-upload-drop-zone-single-image-preview"]}
							/>
						) : (
							<ImageIcon
								className={styles["lambda-file-upload-drop-zone-single-image-preview-icon"]}
							/>
						)}
						<div className={styles["lambda-file-upload-drop-zone-single-image-preview-overlay"]}>
							{singleFileData?.file.name}
						</div>
					</div>
				);
			} else {
				// Dropzone con múltiples archivos o archivo individual no imagen: contador
				interactiveContentJSX = (
					<span className={styles["lambda-file-upload-drop-zone-file-count"]}>
						{selectedFilesData.length} file{selectedFilesData.length > 1 ? "s" : ""} selected
					</span>
				);
			}
		} else {
			// Contenido Principal para el Tipo Botón: Solo el botón
			interactiveContentJSX = (
				<button
					ref={buttonRef}
					className={clsx(buttonFileUpload({ size, radius: radiusBox, disabled, invalid }), {
						[styles["lambda-file-upload-button-file-upload-hasFiles"]]: hasFiles,
					})}
					onClick={handleInteractiveAreaClick}
					onFocus={handleFocus}
					onBlur={handleBlur}
					disabled={disabled}
					tabIndex={disabled ? -1 : 0}
					role="button"
					aria-controls={inputId}
					aria-disabled={disabled}
					aria-invalid={invalid}
				>
					{t("file-upload.button-text")}
				</button>
			);
		}

		return (
			<div
				className={clsx(
					styles["lambda-file-upload-wrapper"],
					fileUploadWrapper({ type, size, disabled, invalid }),
					className
				)}
			>
				{label && (
					<label
						id={labelId}
						htmlFor={inputId}
						className={labelFileUpload({ size, disabled, required })}
					>
						{label}
					</label>
				)}
				<input
					id={inputId}
					ref={internalRefCallback}
					type="file"
					multiple={multiple}
					accept={accept}
					disabled={disabled}
					required={required}
					name={name}
					onChange={handleFileChange}
					style={{ display: "none" }}
					className={styles["lambda-file-upload-hidden-native-input"]}
					aria-labelledby={labelId}
					aria-describedby={describedByIds || undefined}
					aria-invalid={invalid || undefined}
					{...props}
				/>

				{/* --- Renderizado del Área Interactiva y Contenido Adicional --- */}
				{type === "dropzone" ? (
					<div
						ref={dropZoneRef}
						className={clsx(
							styles["lambda-file-upload-drop-zone"],
							dropZone({ size, radius: radiusBox, disabled, invalid, isDragging })
						)}
						onClick={handleInteractiveAreaClick}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						onFocus={handleFocus}
						onBlur={handleBlur}
						tabIndex={disabled ? -1 : 0}
						role="button"
						aria-controls={inputId}
						aria-disabled={disabled}
						aria-invalid={invalid}
					>
						{/* Contenido dinámico del Drop Zone (placeholder/contador/preview grande) */}
						<div className={styles["lambda-file-upload-drop-zone-content"]}>
							{interactiveContentJSX}
						</div>

						{/* Lista de archivos seleccionados (visual) - solo en dropzone, solo si hay archivos */}
						{hasFiles && (
							<ul className={fileList({ size, invalid })} role="list">
								{selectedFilesData.map((fileData) => (
									<FileItem
										key={fileData.id}
										fileData={fileData}
										onRemove={handleRemoveFile}
										size={size}
										invalid={invalid}
										viewFileSize={viewFileSize}
									/>
								))}
							</ul>
						)}
					</div>
				) : (
					/* --- Tipo Button --- */
					// Contenedor principal para el botón y el contenido al lado/abajo
					<div className={clsx(fileUploadLayout({ radius: radiusBox, disabled, invalid }))}>
						{/* Contenedor para el botón y el contenido al lado (nombre/preview de archivo único o contador) */}
						{/* Este contenedor es flex-row para alinear horizontalmente el botón y el display */}
						<div className={clsx(styles["lambda-file-upload-button-container"])}>
							{interactiveContentJSX}
							{/* Contenido al lado del botón (nombre/preview de archivo único o contador) */}
							{/* Se muestra si hay archivos Y (es single O (es multiple Y tiene archivos)) */}
							{hasFiles && (!multiple || (multiple && hasFiles)) && (
								<div className={styles["lambda-file-upload-file-display-container"]}>
									{
										isSingleFile && isSingleImage ? (
											<>
												<div className={buttonFilePreview({ size })}>
													{singleFileData?.previewUrl ? (
														<img
															src={singleFileData.previewUrl}
															alt={`Preview of ${singleFileData.file.name}`}
															className={styles["lambda-file-upload-button-file-preview-image"]}
														/>
													) : (
														<ImageIcon
															className={styles["lambda-file-upload-button-file-preview-icon"]}
														/>
													)}
												</div>
												<span className={styles["lambda-file-upload-file-name-display"]}>
													{singleFileData?.file.name}
												</span>

												{/* Botón X para remover (solo si es archivo único) */}
												<button
													type="button"
													onClick={() => singleFileData && handleRemoveFile(singleFileData.id)}
													className={styles["lambda-file-upload-file-name-remove-button"]}
													aria-label={`Remover archivo ${singleFileData?.file.name}`}
												>
													<XCircleIcon
														className={styles["lambda-file-upload-file-name-remove-icon"]}
													/>
												</button>
											</>
										) : isSingleFile && !isSingleImage ? (
											<>
												<span className={styles["lambda-file-upload-file-name-display"]}>
													{singleFileData?.file.name}
												</span>
												<button
													type="button"
													onClick={() => singleFileData && handleRemoveFile(singleFileData.id)}
													className={styles["lambda-file-upload-file-name-remove-button"]}
													aria-label={`Remover archivo ${singleFileData?.file.name}`}
												>
													<XCircleIcon
														className={styles["lambda-file-upload-file-name-remove-icon"]}
													/>
												</button>
											</>
										) : multiple && hasFiles ? (
											<span className={styles["lambda-file-upload-file-name-display"]}>
												{selectedFilesData.length} file{selectedFilesData.length > 1 ? "s" : ""}{" "}
												selected
											</span>
										) : null /* No mostrar nada si no hay archivos */
									}
								</div>
							)}
						</div>

						{/* Renderiza la lista de archivos si es tipo 'button' Y es multiple Y hay archivos */}
						{type === "button" && hasFiles && multiple && (
							<ul
								className={clsx(
									styles["lambda-file-upload-file-list"],
									fileList({ size, invalid }),
									"scrollBar"
								)}
								role="list"
							>
								{selectedFilesData.map((fileData) => (
									<FileItem
										key={fileData.id}
										fileData={fileData}
										onRemove={handleRemoveFile}
										size={size}
										invalid={invalid}
										viewFileSize={viewFileSize}
									/>
								))}
							</ul>
						)}
					</div>
				)}

				{helperText && !invalid && (
					<HelperText
						id={helperId}
						text={helperText}
						size={size}
						disabled={disabled}
						focused={focused}
					/>
				)}
				{invalid && errorMessage && (
					<InvalidMessage id={errorId} errorMessage={errorMessage} invalid={invalid} size={size} />
				)}
				{type === "button" && viewFileSize && !multiple && (
					<div className={styles["lambda-file-upload-file-item-size"]}>
						{maxSize !== undefined && maxSize > 0 && (
							<span className={styles["lambda-file-upload-file-item-size-max"]}>
								Max: {formatBytes(maxSize)}
							</span>
						)}
						{singleFileData?.file.size && singleFileData?.file.size > 0 && (
							<span className={styles["lambda-file-upload-file-item-size-current"]}>
								{formatBytes(singleFileData?.file.size)}
							</span>
						)}
					</div>
				)}
			</div>
		);
	}
);
