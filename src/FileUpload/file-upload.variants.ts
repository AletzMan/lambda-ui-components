import { cva, VariantProps } from "class-variance-authority";
import styles from "./file-upload.module.css";


export const fileUploadWrapper = cva(styles["lambda-file-upload-wrapper"], {
    variants: {
        type: {
            dropzone: styles["lambda-file-upload-wrapper-dropzone"],
            button: styles["lambda-file-upload-wrapper-button"],
        },
        size: {
            small: styles["lambda-file-upload-wrapper-small"],
            medium: styles["lambda-file-upload-wrapper-medium"],
            large: styles["lambda-file-upload-wrapper-large"],
        },
        disabled: { true: styles["lambda-file-upload-wrapper-disabled"], false: "" },
        invalid: { true: styles["lambda-file-upload-wrapper-invalid"], false: "" },
    },
    defaultVariants: {
        type: "dropzone",
        size: "medium",
        disabled: false,
        invalid: false,
    }
});


export const dropZone = cva(styles["lambda-file-upload-drop-zone"], {
    variants: {
        size: {
            small: styles["lambda-file-upload-drop-zone-small"],
            medium: styles["lambda-file-upload-drop-zone-medium"],
            large: styles["lambda-file-upload-drop-zone-large"],
        },
        radius: {
            none: styles["lambda-file-upload-drop-zone-radius-none"],
            small: styles["lambda-file-upload-drop-zone-radius-small"],
            medium: styles["lambda-file-upload-drop-zone-radius-medium"],
            large: styles["lambda-file-upload-drop-zone-radius-large"],
            pill: styles["lambda-file-upload-drop-zone-radius-pill"],
        },
        disabled: { true: styles["lambda-file-upload-drop-zone-disabled"], false: "" },
        invalid: { true: styles["lambda-file-upload-drop-zone-invalid"], false: "" },
        isDragging: { true: styles["lambda-file-upload-drop-zone-dragging"], false: "" },
    },
    defaultVariants: {
        size: "medium", radius: "small",
        disabled: false, invalid: false, isDragging: false,
    },
});


export const buttonFileUpload = cva(styles["lambda-file-upload-button-file-upload"], {
    variants: {
        size: {
            small: styles["lambda-file-upload-button-file-upload-small"],
            medium: styles["lambda-file-upload-button-file-upload-medium"],
            large: styles["lambda-file-upload-button-file-upload-large"],
        },
        radius: {
            none: styles["lambda-file-upload-button-file-upload-radius-none"],
            small: styles["lambda-file-upload-button-file-upload-radius-small"],
            medium: styles["lambda-file-upload-button-file-upload-radius-medium"],
            large: styles["lambda-file-upload-button-file-upload-radius-large"],
            pill: styles["lambda-file-upload-button-file-upload-radius-pill"],
        },
        disabled: { true: styles["lambda-file-upload-button-file-upload-disabled"], false: "" },
        invalid: { true: styles["lambda-file-upload-button-file-upload-invalid"], false: "" },
    },
    defaultVariants: {
        size: "medium", radius: "small",
        disabled: false, invalid: false,
    }
});


export const labelFileUpload = cva(styles["lambda-file-upload-label"], {
    variants: {
        size: {
            small: styles["lambda-file-upload-label-small"], medium: styles["lambda-file-upload-label-medium"], large: styles["lambda-file-upload-label-large"],
        },
        disabled: { true: styles["lambda-file-upload-label-disabled"], false: "" },
        required: { true: styles["lambda-file-upload-label-required"], false: "" }
    },
    defaultVariants: {
        size: "medium", disabled: false, required: false,
    },
});


export const fileList = cva(styles["lambda-file-upload-file-list"], {
    variants: {
        size: {
            small: styles["lambda-file-upload-file-list-small"], medium: styles["lambda-file-upload-file-list-medium"], large: styles["lambda-file-upload-file-list-large"],
        },
        invalid: { true: styles["lambda-file-upload-file-list-invalid"], false: "" },
    },
    defaultVariants: {
        size: "medium", invalid: false,
    },
});


export const fileItem = cva(styles["lambda-file-upload-file-item"], {
    variants: {
        size: {
            small: styles["lambda-file-upload-file-item-small"], medium: styles["lambda-file-upload-file-item-medium"], large: styles["lambda-file-upload-file-item-large"],
        },
        invalid: { true: styles["lambda-file-upload-file-item-invalid"], false: "" },
        isImage: { true: styles["lambda-file-upload-file-item-is-image"], false: "" }
    },
    defaultVariants: {
        size: "medium", invalid: false, isImage: false,
    },
});

export const buttonFilePreview = cva(styles["lambda-file-upload-button-file-preview"], {
    variants: {
        size: {
            small: styles["lambda-file-upload-button-file-preview-small"],
            medium: styles["lambda-file-upload-button-file-preview-medium"],
            large: styles["lambda-file-upload-button-file-preview-large"],
        },
    },
    defaultVariants: {
        size: "medium",
    }
});


export type FileUploadVariants = VariantProps<typeof fileUploadWrapper>;
export type DropZoneVariants = VariantProps<typeof dropZone>;
export type ButtonFileUploadVariants = VariantProps<typeof buttonFileUpload>;
export type LabelVariants = VariantProps<typeof labelFileUpload>;
export type FileListVariants = VariantProps<typeof fileList>;
export type FileItemVariants = VariantProps<typeof fileItem>;
export type ButtonFilePreviewVariants = VariantProps<typeof buttonFilePreview>;