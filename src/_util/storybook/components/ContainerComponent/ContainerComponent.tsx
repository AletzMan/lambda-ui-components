import { Divider } from "lambda-ui-components";
import styles from "./container.module.css";

interface ContainerComponentProps {
	title: string;
	subtitle?: string;
	color?: string;
	optional?: string;
	children: React.ReactNode;
}

const colors = {
	nuetral: "var(--neutral-border-color)",
	primary: "var(--primary-disabled-color)",
	danger: "var(--danger-disabled-color)",
	success: "var(--success-disabled-color)",
	warning: "var(--warning-disabled-color)",
	info: "var(--info-disabled-color)",
};

export default function ContainerComponent({
	title,
	subtitle,
	color,
	optional,
	children,
}: ContainerComponentProps) {
	const colorValue = colors[color as keyof typeof colors] || colors.nuetral;
	const optionalValue = colors[optional as keyof typeof colors] || colors.nuetral;



	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerContainer}>
					<h1 className={styles.title}>{title}</h1>
					<div className={styles.subtitleContainer}>
						{subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
						{color && (
							<span className={styles.color} style={{ color: colorValue }}>
								{color}
							</span>
						)}
						{optional && (
							<span className={styles.optional} style={{ color: optionalValue }}>
								{optional}
							</span>
						)}
					</div>
				</div>
			</header>
			<Divider color="neutral" />
			<div className={`${styles.content} scrollBar`}>{children}</div>
		</div>
	);
}
