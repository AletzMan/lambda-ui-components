import { Divider } from "../../../../main";
import styles from "./container.module.css";

interface ContainerComponentProps {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}

export default function ContainerComponent({ title, subtitle, children }: ContainerComponentProps) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<h2 className={styles.subtitle}>{subtitle}</h2>
			<Divider color="default" />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
