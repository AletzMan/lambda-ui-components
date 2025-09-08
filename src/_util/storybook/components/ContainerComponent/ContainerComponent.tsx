import { Divider } from "../../../../main";
import styles from "./container.module.css";

interface ContainerComponentProps {
	title: string;
	subtitle?: string;
	color?: string;
	children: React.ReactNode;
}

const colors = {
	default: "var(--secondary-text-color)",
	primary: "var(--primary-text-color)",
	danger: "var(--danger-text-color)",
	success: "var(--success-text-color)",
	warning: "var(--warning-text-color)",
	info: "var(--info-text-color)",
};

export default function ContainerComponent({
	title,
	subtitle,
	color,
	children,
}: ContainerComponentProps) {
	const colorValue = colors[color as keyof typeof colors] || colors.default;
	console.log(colorValue);
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.subtitleContainer}>
				{subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
				{color && (
					<span className={styles.color} style={{ color: colorValue }}>
						{color}
					</span>
				)}
			</div>
			<Divider color="secondary" />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
