import { cva, VariantProps } from "class-variance-authority";
import styles from "./file-upload.module.css";

export const fileUploadLayout = cva(styles["lambda-fileup-button-layout-container"], {
	variants: {
		radius: {
			none: styles["lambda-fileup-button-layout-container-none"],
			tiny: styles["lambda-fileup-button-layout-container-tiny"],
			small: styles["lambda-fileup-button-layout-container-small"],
			medium: styles["lambda-fileup-button-layout-container-medium"],
			large: styles["lambda-fileup-button-layout-container-large"],
		},
		disabled: { true: styles["lambda-fileup-button-layout-container-disabled"], false: "" },
		invalid: { true: styles["lambda-fileup-button-layout-container-invalid"], false: "" },
	},
	defaultVariants: {
		radius: "small",
		disabled: false,
		invalid: false,
	},
});

export const fileUploadWrapper = cva(styles["lambda-fileup-wrapper"], {
	variants: {
		type: {
			dropzone: styles["lambda-fileup-wrapper-dropzone"],
			button: styles["lambda-fileup-wrapper-button"],
		},
		size: {
			small: styles["lambda-fileup-wrapper-small"],
			medium: styles["lambda-fileup-wrapper-medium"],
			large: styles["lambda-fileup-wrapper-large"],
		},
		disabled: { true: styles["lambda-fileup-wrapper-disabled"], false: "" },
		invalid: { true: styles["lambda-fileup-wrapper-invalid"], false: "" },
	},
	defaultVariants: {
		type: "dropzone",
		size: "medium",
		disabled: false,
		invalid: false,
	},
});

export const dropZone = cva(styles["lambda-fileup-drop-zone"], {
	variants: {
		size: {
			small: styles["lambda-fileup-drop-zone-small"],
			medium: styles["lambda-fileup-drop-zone-medium"],
			large: styles["lambda-fileup-drop-zone-large"],
		},
		radius: {
			none: styles["lambda-fileup-drop-zone-radius-none"],
			tiny: styles["lambda-fileup-drop-zone-radius-tiny"],
			small: styles["lambda-fileup-drop-zone-radius-small"],
			medium: styles["lambda-fileup-drop-zone-radius-medium"],
			large: styles["lambda-fileup-drop-zone-radius-large"],
		},
		disabled: { true: styles["lambda-fileup-drop-zone-disabled"], false: "" },
		invalid: { true: styles["lambda-fileup-drop-zone-invalid"], false: "" },
		isDragging: { true: styles["lambda-fileup-drop-zone-dragging"], false: "" },
	},
	defaultVariants: {
		size: "medium",
		radius: "small",
		disabled: false,
		invalid: false,
		isDragging: false,
	},
});

export const buttonFileUpload = cva(styles["lambda-fileup-button-file-upload"], {
	variants: {
		size: {
			small: styles["lambda-fileup-button-upload-small"],
			medium: styles["lambda-fileup-button-upload-medium"],
			large: styles["lambda-fileup-button-upload-large"],
		},
		radius: {
			none: styles["lambda-fileup-button-upload-radius-none"],
			tiny: styles["lambda-fileup-button-upload-radius-tiny"],
			small: styles["lambda-fileup-button-upload-radius-small"],
			medium: styles["lambda-fileup-button-upload-radius-medium"],
			large: styles["lambda-fileup-button-upload-radius-large"],
		},
		disabled: { true: styles["lambda-fileup-button-upload-disabled"], false: "" },
		invalid: { true: styles["lambda-fileup-button-upload-invalid"], false: "" },
	},
	defaultVariants: {
		size: "medium",
		radius: "small",
		disabled: false,
		invalid: false,
	},
});

export const labelFileUpload = cva(styles["lambda-fileup-label"], {
	variants: {
		size: {
			small: styles["lambda-fileup-label-small"],
			medium: styles["lambda-fileup-label-medium"],
			large: styles["lambda-fileup-label-large"],
		},
		disabled: { true: styles["lambda-fileup-label-disabled"], false: "" },
		required: { true: styles["lambda-fileup-label-required"], false: "" },
	},
	defaultVariants: {
		size: "medium",
		disabled: false,
		required: false,
	},
});

export const fileList = cva(styles["lambda-fileup-file-list"], {
	variants: {
		size: {
			small: styles["lambda-fileup-file-list-small"],
			medium: styles["lambda-fileup-file-list-medium"],
			large: styles["lambda-fileup-file-list-large"],
		},
		displayMode: {
			list: styles["lambda-fileup-file-list-list"],
			thumbnail: styles["lambda-fileup-file-list-thumbnail"],
		},
		type: {
			dropzone: styles["lambda-fileup-file-list-dropzone"],
			button: styles["lambda-fileup-file-list-button"],
		},
		invalid: { true: styles["lambda-fileup-file-list-invalid"], false: "" },
	},
	defaultVariants: {
		size: "medium",
		type: "dropzone",
		invalid: false,
		displayMode: "list",
	},
});

export const fileItem = cva(styles["lambda-fileup-file-item"], {
	variants: {
		size: {
			small: styles["lambda-fileup-file-item-small"],
			medium: styles["lambda-fileup-file-item-medium"],
			large: styles["lambda-fileup-file-item-large"],
		},
		type: {
			dropzone: styles["lambda-fileup-file-item-dropzone"],
			button: styles["lambda-fileup-file-item-button"],
		},
		displayMode: {
			list: styles["lambda-fileup-file-item-list"],
			thumbnail: styles["lambda-fileup-file-item-thumbnail"],
		},
		invalid: { true: styles["lambda-fileup-file-item-invalid"], false: "" },
		isImage: { true: styles["lambda-fileup-file-item-is-image"], false: "" },
	},
	defaultVariants: {
		size: "medium",
		displayMode: "list",
		invalid: false,
		isImage: false,
		type: "dropzone",
	},
});

export const buttonFilePreview = cva(styles["lambda-fileup-button-file-preview"], {
	variants: {
		size: {
			small: styles["lambda-fileup-button-file-preview-small"],
			medium: styles["lambda-fileup-button-file-preview-medium"],
			large: styles["lambda-fileup-button-file-preview-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export const fileUploadEmptyVariants = cva(styles["lambda-fileup-file-empty"], {
	variants: {
		size: {
			small: styles["lambda-fileup-file-empty-small"],
			medium: styles["lambda-fileup-file-empty-medium"],
			large: styles["lambda-fileup-file-empty-large"],
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

export type FileUploadVariants = VariantProps<typeof fileUploadWrapper>;
export type DropZoneVariants = VariantProps<typeof dropZone>;
export type ButtonFileUploadVariants = VariantProps<typeof buttonFileUpload>;
export type LabelVariants = VariantProps<typeof labelFileUpload>;
export type FileListVariants = VariantProps<typeof fileList>;
export type FileItemVariants = VariantProps<typeof fileItem>;
export type ButtonFilePreviewVariants = VariantProps<typeof buttonFilePreview>;
