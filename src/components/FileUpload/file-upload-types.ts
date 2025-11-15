import { InputHTMLAttributes } from "react";
import { FileUploadVariants } from "./file-upload.variants";

export interface SelectedFileData {
	/**
	 * The native `File` object selected by the user.
	 */
	file: File;

	/**
	 * A unique identifier for this file entry.
	 * Useful for removing or managing individual files when multiple selection is enabled.
	 */
	id: string;

	/**
	 * Optional temporary preview URL generated for the file (e.g., object URL for images).
	 * When the file type supports previewing, this value can be used to display a thumbnail.
	 */
	previewUrl?: string;
}


export interface FileUploadProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		| "size"
		| "disabled"
		| "onChange"
		| "value"
		| "multiple"
		| "accept"
		| "required"
		| "aria-invalid"
		| "aria-describedby"
		| "aria-labelledby"
	> {
	/**
	 * Determines the main appearance and interaction pattern of the component.
	 * - `dropzone`: Renders an area where users can drag and drop files.
	 * - `button`: Renders a button that opens the file selection dialog on click.
	 * @default 'dropzone'
	 */
	type?: "dropzone" | "button";

	/**
	 * Controls the visual size of the component, affecting the dropzone area
	 * or the dimensions of the button.
	 */
	size?: FileUploadVariants["size"];

	/**
	 * Disables the component, preventing file selection and drag-and-drop interactions.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Indicates that the component is in an invalid or error state.
	 * Commonly used to display error styling around the dropzone or button.
	 * @default false
	 */
	invalid?: boolean;

	/**
	 * Allows selecting multiple files at once.
	 * When set to `false`, only a single file can be selected.
	 * @default false
	 */
	multiple?: boolean;

	/**
	 * Specifies which file types can be selected (e.g., `"image/*"`, `".pdf"`, `"image/png,image/jpeg"`).
	 * Uses the standard HTML `accept` attribute format.
	 */
	accept?: string;

	/**
	 * Marks the file selection as required.
	 * This does not perform validation by itself, but can be used for styling
	 * or integrated with form libraries for validation logic.
	 * @default false
	 */
	required?: boolean;

	/**
	 * Label text associated with the component.
	 * When provided, a `<label>` element will typically be rendered.
	 */
	label?: string;

	/**
	 * Error message displayed when `invalid` is true or when file selection fails validation.
	 * Usually shown below the component.
	 */
	errorMessage?: string;

	/**
	 * Secondary descriptive text shown below the component.
	 * Useful for instructions or validation hints.
	 */
	helperText?: string;

	/**
	 * Maximum allowed file size in bytes.
	 * Files that exceed this limit will be rejected and passed to `onFilesRejected`.
	 */
	maxSize?: number;
	/**
	 * Array of currently selected files.
	 * Each file is represented by a native `File` object.
	 */
	files?: File[];

	/**
	 * Callback fired when one or more files are selected via the file dialog
	 * or dropped into the dropzone area.
	 * Receives an array of selected `File` objects.
	 */
	onChangeFiles?: (files: File[]) => void;

	/**
	 * Callback fired when a draggable item enters the dropzone area.
	 * Receives the native drag event.
	 */
	onDragOver?: (event: React.DragEvent<HTMLElement>) => void;

	/**
	 * Callback fired when a draggable item leaves the dropzone area.
	 * Receives the native drag event.
	 */
	onDragLeave?: (event: React.DragEvent<HTMLElement>) => void;

	/**
	 * Callback fired when files are dropped into the dropzone area.
	 */
	onDrop?: (event: React.DragEvent<HTMLElement>) => void;

	/**
	 * Name attribute for the underlying native input element.
	 */
	name?: string;

	/**
	 * Callback fired when one or more selected files fail validation
	 * (e.g., unsupported file type or file size exceeds `maxSize`).
	 * Receives an array of rejected `File` objects.
	 */
	onFilesRejected?: (files: File[]) => void;

	/**
	 * Displays the file size next to each selected file.
	 * @default false
	 */
	viewFileSize?: boolean;

	/**
	 * Controls how selected files are displayed:
	 * - `list`: Shows files in a vertical list with name and size.
	 * - `thumbnail`: Shows files with preview thumbnails when available.
	 * @default 'list'
	 */
	displayMode?: "list" | "thumbnail";
}

