
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

export interface ICardHeader {
    title: string
    description?: string
    icon?: React.ReactNode
}

export interface ICardActions {
    icon?: React.ReactNode
    text?: string
    onClick?: () => void
}

export interface ICardImage {
    src: string
    alt?: string
    heightPorcent?: number
}

export interface CardProps extends Omit<ButtonHTMLAttributes<HTMLDivElement>, "disabled" | "color">, VariantProps<typeof card> {
    image?: ICardImage
    header?: ICardHeader
    actions?: ICardActions[]
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = "solid",
            size = "medium",
            radius = "small",
            header,
            image,
            actions,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={card({ variant, size, radius, className })}
                {...props}
            >
                {image &&
                    <div className={styles[`lambda-card-header-image-container`]} style={{ height: image.heightPorcent ? `${image.heightPorcent}%` : 'auto' }}>
                        <img className={styles[`lambda-card-header-image`]} src={image.src} alt={image.src || header?.title} />
                    </div>
                }
                {header &&
                    <header className={styles[`lambda-card-header`]}>
                        <div className={styles[`lambda-card-header-content`]}>
                            {header.icon && <span className={styles[`lambda-card-header-icon`]}>{header.icon}</span>}
                            <div className={styles[`lambda-card-header-text`]}>
                                <h1 className={styles[`lambda-card-header-title`]}>{header.title}</h1>
                                <p className={styles[`lambda-card-header-description`]}>{header.description}</p>
                            </div>
                        </div>
                    </header>}
                {props.children && <div className={styles[`lambda-card-body`]}>{props.children}</div>}
                {actions && actions.length > 0 &&
                    <footer className={styles[`lambda-card-footer`]}>
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                className={styles[`lambda-card-action`]}
                                onClick={action.onClick}
                            >
                                {action.icon && <span className={styles[`lambda-card-action-icon`]}>{action.icon}</span>}
                                {action.text && <span className={styles[`lambda-card-action-text`]}>{action.text}</span>}
                            </button>
                        ))}
                    </footer>
                }
            </div>
        )
    }
)