// types.ts
import type { ReactNode } from "react";

export interface CodeTab {
  label: string;
  language: string;
  code: string;
}

export interface CodeBlockProps {
  code?: string;
  language?: string;
  showLineNumbers?: boolean;
  tabs?: CodeTab[];
  className?: string;
  children?: ReactNode;
}
