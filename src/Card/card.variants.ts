import styles from "./card.module.css"
import { cva } from "class-variance-authority"

export const card = cva(styles[`lambda-card`], {
    variants: {
        variant: {
            outline: styles[`lambda-card-outline`],
            borderless: styles[`lambda-card-borderless`],
        },
        size: {
            small: styles[`lambda-card-small`],
            medium: styles[`lambda-card-medium`],
            large: styles[`lambda-card-large`],
        },
        radius: {
            none: styles[`lambda-card-radius-none`],
            small: styles[`lambda-card-radius-small`],
            medium: styles[`lambda-card-radius-medium`],
            large: styles[`lambda-card-radius-large`],
        }
    },
    defaultVariants: {
        variant: "outline",
        size: "medium",
        radius: 'medium',
    },
})