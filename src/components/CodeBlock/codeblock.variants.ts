import { cva, VariantProps } from "class-variance-authority";
import styles from "./codeblock.module.css";

export const codeBlock = cva(styles.codeblock, {
  variants: {
    theme: {
      dark: styles["codeblock-dark"],
      light: styles["codeblock-light"],
    },
    lineNumbers: {
      true: styles["codeblock-line-numbers"],
      false: "",
    },
    tabStyle: {
      default: styles["tabs"],
      minimal: styles["tabs-minimal"],
    },
  },
  defaultVariants: {
    theme: "dark",
    lineNumbers: false,
    tabStyle: "default",
  },
});

export type CodeBlockVariants = VariantProps<typeof codeBlock>;
