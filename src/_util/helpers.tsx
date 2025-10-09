import {
	File,
	FileArchive,
	FileAudio,
	FileIcon,
	FileSpreadsheet,
	FileTextIcon,
	FileVideo,
} from "lucide-react";
import { APKIcon, PDFIcon } from "../_assets/icons";
import { TreeNode } from "../components/TreeView/treeview.types";
import { JSX } from "react";

export const formatBytes = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const getIconOfFile = (file: File) => {
	if (file.type.startsWith("application/pdf")) {
		return <PDFIcon />;
	} else if (
		file.type.startsWith("application/msword") ||
		file.type.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
	) {
		return <FileTextIcon />;
	} else if (
		file.type.startsWith("application/vnd.ms-excel") ||
		file.type.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	) {
		return <FileSpreadsheet />;
	} else if (file.type.startsWith("video/")) {
		return <FileVideo />;
	} else if (file.type.startsWith("audio/")) {
		return <FileAudio />;
	} else if (
		file.type.startsWith("application/zip") ||
		file.type.startsWith("application/x-zip-compressed") ||
		file.type.startsWith("application/x-7z-compressed") ||
		file.type.startsWith("application/vnd-rar-compressed") ||
		file.type.startsWith("application/x-rar-compressed") ||
		file.type.startsWith("application/gzip") ||
		file.type.startsWith("application/x-tar")
	) {
		return <FileArchive />;
	} else if (file.type.startsWith("application/vnd.android.package-archive")) {
		return <APKIcon />;
	}
	return <FileIcon />;
};

export const getIconFileTreeItem = (node: TreeNode): JSX.Element => {
	const extension = node.label.split(".")[1];
	if (extension === "pdf") {
		return <PDFIcon />;
	} else {
		return <File />;
	}
};
