/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ButtonHTMLAttributes, forwardRef } from "react"
import styles from "./card.module.css"
import { cva, VariantProps } from "class-variance-authority"

const card = cva(styles[`lambda-card`], {
    variants: {
        variant: {
            classic: styles[`lambda-card-classic`],
            solid: styles[`lambda-card-solid`],
            outline: styles[`lambda-card-outline`],
            dashed: styles[`lambda-card-dashed`],
            ghost: styles[`lambda-card-ghost`],
            text: styles[`lambda-card-text`],
        },
        size: {
            tiny: styles[`lambda-card-tiny`],
            small: styles[`lambda-card-small`],
            medium: styles[`lambda-card-medium`],
            large: styles[`lambda-card-large`],
        },
        radius: {
            none: styles[`lambda-card-radius-none`],
            small: styles[`lambda-card-radius-small`],
            medium: styles[`lambda-card-radius-medium`],
            large: styles[`lambda-card-radius-large`],
            pill: styles[`lambda-card-radius-pill`],
            circle: styles[`lambda-card-radius-circle`],
        }
    },
    defaultVariants: {
        variant: "solid",
        size: "medium",
        radius: 'medium',
    },
})

export interface CardProps extends Omit<ButtonHTMLAttributes<HTMLDivElement>, "disabled" | "color">, VariantProps<typeof card> {
    header?: React.ReactNode
    footer?: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = "solid",
            size = "medium",
            radius = "small",
            header,
            footer,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={card({ variant, size, radius })}
                {...props}
            >
                {header && <header className={styles[`lambda-card-header`]}>{header}</header>}
                {props.children && <div className={styles[`lambda-card-body`]}>{props.children}</div>}
                {footer && <footer className={styles[`lambda-card-footer`]}>{footer}</footer>}
            </div>
        )
    }
)