import styles from "./splitter.module.css";
import { cva } from "class-variance-authority";

export const splitterVariants = cva(styles["lambda-splitter"], {
  variants: {
    direction: {
      horizontal: styles["lambda-splitter-horizontal"],
      vertical: styles["lambda-splitter-vertical"],
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});
